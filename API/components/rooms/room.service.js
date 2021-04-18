const { db, error } = require('../../helper')
const question = require('../../helper/question')
const { Topic, User, RoomConfig, Room } = db
const topicService = require('../topics/topic.service')
const avatarController = require('../avatars/avatar.controller')
const config = require('../../config')
const _rooms = new Map();

exports.join = async ({ user_id, socket_id, topic_id }) => {
    const room_user = {
        user_id,
        socket_id
    };
    const room_config = await RoomConfig.findOne({});
    const room = await _randomRoom({ user_id, socket_id, topic_id, config_size_room: room_config.size })
    if (!room) {
        // CREATE NEW ROOM
        const [topic, user] = await Promise.all([
            !topic_id ?
                topicService.randomTopic().then(topic => topic._id.toString()) : Promise.resolve(theme_id),
            User.findById(user_id)
        ])
        room_user['avatar'] = avatarController.getImgUrl(user.avatar)
        room_user['rank'] = 1;
        room_user['username'] = user.username;
        const new_room = await Room.create({
            size: room_config.size || config.size,
            topic_id,
            status: 1,
            users: [room_user],
            eventHistory: [],
            factorX: room_config.factorX || config.factorX
        })
        const room_id = new_room._id;
        _rooms.set(room_id, {
            results: [],
            lastEvent: undefined,
            scores: Array.from(room_config.scores) || config.scores,
            final_rank_credits: Array.from(room_config.final_rank_credits) || config.final_rank_credits,
            dicUsers: {
                [user_id]: room_user
            },
            room_size: room_config.size || config.size
        })
        return new_room
    }
    return User.findById(user_id)
        .then((user) => {
            room_user['avatar'] = avatarController.getImgUrl(user.avatar);
            room_user['username'] = user.username;
            _rooms.get(room._id.toString()).dicUsers[user._id.toString()] = room_user
            return Room.findByIdAndUpdate(room._id, {
                $push: {
                    users: room_user
                }
            });
        })

}
const _randomRoom = ({
    topic_id,
    config_size_room,
}) => {
    const conditions = {
        ...topic_id ? { topic_id } : {},
        status: 1,
        _id: {
            $in: Array.from(_rooms.keys())
        },
        ["users." + (config_size_room - 1)]: { $exists: false }
    };
    return Room.countDocuments(conditions).then((count) => {
        return Room.findOne(conditions).skip(
            Math.floor(Math.random() * count)
        );
    });
};



const _addBots = async (room_id, timeAdd = 0) => {
    const room = await Room.findById(room_id);
    if ((room.users.length + _rooms.get(room_id).indexOfBots || 0) < room.size) {
        const nbBots = room.size - room.users.length;
        _rooms.get(room_id).indexOfBots = nbBots;
        const numberUser = room.users.length;
        const time = timeAdd ? timeAdd : (config.addBotIns / nbBots) * 1000;
        Array(nbBots).fill().map(async (bot, index) => {
            const last = index === nbBots - 1;
            const rank = numberUser + index + 1;
            setTimeout(async () => {
                const botIndex = room.users.length + index + 1;
                const botId = -botIndex;
                await Room.findByIdAndUpdate(
                    room_id,
                    {
                        $push: {
                            users: {
                                user_id: botId,
                                username: avatarController.randomUserName(),
                                rank: rank,
                                avatar: avatarController.getImgUrl(null)
                            }
                        }
                    });

                const newRoom = await _getRoom(room_id);
                const newBot = newRoom.users.find(user => user.user_id === botId);
                _rooms.get(room_id).dicUsers[newBot.user_id] = newBot;
                _rooms.get(room_id).broadcast(EVENTS.QUIZ_NEW_PLAYER, newBot);
                last && _startRoom({ room: newRoom });
            }, time * (index));
        });
    }
};

const _startRoom = async ({
    room,
    socketRoom,
    EVENTS
}) => {
    const room_id = room._id.toString();
    try {
        // ROOM IS NEW
        if (room.users.length === 1 && !!socketRoom) {
            _rooms.get(room_id).broadcast = (eventName, eventData) => {
                socketRoom(room_id).emit(eventName, eventData);
                const event = { time: new Date(), name: eventName, data: eventData };
                if (eventName === EVENTS.QUIZ_ANSWER_RESULT) {
                    _rooms.get(room_id).results.push(event);
                } else if (typeof eventData.duration === 'number') {
                    _rooms.get(room_id).lastEvent = event;
                }
            };

            _rooms.get(room_id).clean = () => {
                socketRoom(room_id).clients((error, socketIds) => {
                    !error && socketIds.forEach((socketId) => {
                        socketRoom(room_id).sockets[socketId].leave(room_id);
                    });
                });
            };

            _rooms.get(room_id).broadcast(EVENTS.QUIZ_START_LOADING_PLAYERS, {});
            setTimeout(async () => {
                await Room.findByIdAndUpdate(room_id, { status: 2 });
            }, config.addBotAfter * 1000);

            const topic = await topicService.getById(roon.topic_id)
            _rooms.get(room_id).questions = question._makeQuestion({}, topic.vocabularies)


            // const resultRoom = await Room.findByIdAndUpdate(room_id, {
            //     questions: _rooms.get(room_id).questions.map((question) => ({
            //         id: question.id,
            //         answers: question.answers.map((answer) => ({ track_id: answer.track_id })),
            //         user_answers: []
            //     }))
            // }, { new: true }).lean().exec();

        }
        // ROOM IS FULL
        if (room.users.length === room.size) {
            const startCounter = (duration = 0) => {
                return new Promise((resolve) => {
                    const counter = (timeLeft = duration) => {
                        timeLeft === 0 && resolve()
                        const countIns = timeLeft > 1 ? 1 : timeLeft;
                        setTimeout(() => {
                            counter(timeLeft - countIns);
                        }, countIns * 1000);
                    }
                    counter();
                });
            };

            // const valid = await _validateUsersOf(room_id);
            // if (!valid) {
            //     throw new Error('room of bots');
            // }

            _rooms.get(room_id).broadcast(EVENTS.QUIZ_END_LOADING_PLAYERS, { duration: config.roomEndLoadingIns });
            await startCounter(config.roomEndLoadingIns);

            _rooms.get(room_id).broadcast(EVENTS.QUIZ_START_COUNTDOWN, { duration: config.roomCountdownIns });
            await startCounter(config.roomCountdownIns);

            _rooms.get(room_id).broadcast(EVENTS.QUIZ_WAIT_ANIMATION, { duration: config.delayAnimation });
            await startCounter(config.delayAnimation);

            // const startQuestion = async (questions) => {
            //     if (questions.length === 0) {
            //         return;
            //     }

            //     const questionTotal = _rooms.get(room_id).questions.length;
            //     const question = questions[0];
            //     const remainQuestions = questions.slice(1);
            //     const start_at = new Date();

            //     mongoose.connection.db.command({
            //         update: Room.collection.name,
            //         updates: [
            //             {
            //                 q: { _id: room._id },
            //                 u: { $set: { 'questions.$[question].start_at': start_at } },
            //                 arrayFilters: [{ 'question.id': question.id }]
            //             }
            //         ]
            //     }).then(() => { });

            //     const autoAnswer = async (answer_id, user_id) => {
            //         console.log({
            //             answer_id,
            //             user_id
            //         })
            //         const result = await _answerQuestion({ room_id, question_id: question.id, answer_id, user_id });
            //         !!result && _rooms.get(room_id).broadcast(EVENTS.QUIZ_ANSWER_RESULT, result);
            //     };

            //     const answer_id = question.answers.findIndex((answer) => (answer.track_id === question.id));
            //     console.log('answer: ' + answer_id);

            //     room.users.filter(_isBot).forEach((bot) => {
            //         // const delay = Math.random() * (config.answerQuestionIns - config.botAnswerMinDelay) + config.botAnswerMinDelay;
            //         const delay = function (min, max) {
            //             return Math.floor(Math.random() * (max - min) + min);
            //         }(config.botAnswerMinDelay, config.botAnswerMaxDelay)
            //         const answer = question.answers[Math.floor(Math.random() * question.answers.length)];
            //         setTimeout(() => autoAnswer(answer.id, bot.user_id), delay * 1000);
            //     });

            //     const questionData = {
            //         duration: config.answerQuestionIns,
            //         questionIndex: questionTotal - remainQuestions.length,
            //         questionTotal,
            //         question,
            //         start_at: start_at.toISOString()
            //     };

            //     _rooms.get(room_id).broadcast(EVENTS.QUIZ_START_QUESTION, questionData);
            //     await startCounter(config.answerQuestionIns);
            //     room.users = room.users.filter((room_user) => {
            //         if (!_isBot(room_user) && !_rooms.get(room_id).dicUsers[room_user.user_id]) return;
            //         return true
            //     })
            //     await Promise.all(room.users.map(async (user) => await autoAnswer(-1, user.user_id)))


            //     _rooms.get(room_id).broadcast(EVENTS.QUIZ_PREPARE_QUESTION, { duration: config.prepareQuestionIns });

            //     await startCounter(config.prepareQuestionIns);

            //     if (questionData.questionIndex !== questionData.questionTotal) {
            //         _rooms.get(room_id).broadcast(EVENTS.QUIZ_WAIT_ANIMATION, { duration: config.delayAnimation });
            //         await startCounter(config.delayAnimation);
            //     }

            //     await startQuestion(remainQuestions);
            // };

            // await startQuestion(_rooms.get(room_id).questions);


            // const closedRoom = await _closeRoom(room_id);
            // _rooms.get(room_id).broadcast(EVENTS.QUIZ_CLOSED, {
            //     finalRanks: closedRoom.users,
            //     questions: _rooms.get(room_id).questions.map((question) => {
            //         return {
            //             ...question,
            //             ...(closedRoom.questions.find((room_question) => (room_question.id === question.id)))
            //         }
            //     })
            // });
            _rooms.get(room_id).clean();
            _rooms.delete(room_id);
        }
    } catch (error) {
        console.error(`room ${room_id}: ${error.message}`);
        _rooms.get(room_id).broadcast(EVENTS.QUIZ_JOIN_ERROR, { message: error.message });
    }
};

exports.startRoom = _startRoom;