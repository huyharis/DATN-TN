const { db } = require("../../helper");
const { History, User, Course } = db;
const topicService = require("../topics/topic.service");
const userService = require("../users/user.service");

exports.getById = (id) => History.findById(id);

//todo
exports.setHistory = async (body, { _id }) => {
  const { histories } = await User.findById(_id).populate({
    path: "histories",
    populate: { path: "topic" },
  });
  const history = histories.find(
    (history) => history.topic._id.toString() === body.topic
  );
  if (history) {
    const finish_question = body.answers.map((item) => item.correct).length;
    const pass_topic =
      finish_question + history.finish_question ===
      history.topic.vocabularies.length;

    const [u_history, u_user] = await Promise.all([
      History.findByIdAndUpdate(
        history._id,
        { ...body, finish_question },
        { new: true }
      ),
      !pass_topic
        ? Promise.resolve()
        : userService.findByIdAndUpdate({ _id, $inc: { lession_number: 1 } }),
    ]);
    return u_history;
  }
  const create_history = await History.create(body);
  await userService.findByIdAndUpdate({ _id, histories: create_history._id });
  return create_history;
};
//upDate Set History
exports.upDateHistory = async (body, id_user) => {
  try {
    const { topic, rightAnwser, contents } = body;
    const { histories } = await User.findById(id_user)
      .populate({
        path: "histories",
      })
      .populate({
        path: "topic",
      });

    let history;
    if (histories.length)
      history = histories.find((history) => history.topic.toString() === topic);
    if (history) {
      let counts = 0

      contents.map((con) => {
        if (con.rightAnwser !== 0) counts++;
      });
      history.totalAnwser++;
      history.rightAnwser = counts;
      history.complete = history.totalAnwser / history.rightAnwser;
      history.dateStudy = Date.now;

      let newContents = [];
      contents.map((con) => {
        history.contents.map((his) => {
          if (con.content.toString() === his.content.toString()) {
            newContents.push({
              content: his.content,
              rightAnwser: his.rightAnwser + con.rightAnwser,
              totalAnwser: his.totalAnwser + 1,
              complete:
                ((his.rightAnwser + con.rightAnwser) / his.totalAnwser++) * 100,
            });
          }
        });
      });
      let count = 0;
      contents.map((con) => {
        if (con.rightAnwser !== 0) count++;
      });
      const result = await History.findByIdAndUpdate(
        { _id: history._id },
        {
          rightAnwser: count,
          totalAnwser: newContents.length,
          contents: newContents,
          complete: (count / contents.length) * 100,
          dateStudy: new Date(),
        }
      );
      return result;
    } else {
      let count = 0,
        newContents = [];
      contents.map((con) => {
        newContents.push({
          ...con,
          totalAnwser: 1,
        });
        if (con.rightAnwser !== 0) count++;
      });

      let historyNew = {
        topic: topic,
        rightAnwser: count,
        totalAnwser: contents.length,
        complete: (count / contents.length) * 100,
        dateStudy: new Date(),
        contents: newContents,
      };

      const create_history = await History.create(historyNew);
      await User.findByIdAndUpdate(
        {
          _id: id_user,
        },
        { $push: { histories: create_history._id } }
      );
      return create_history;
    }
  } catch (error) {
    console.log(error);
  }
};
exports.getCurrent = async (id) => {
  try {
    const user = await User.findById(id)
      .populate({
        select: "-contents",
        path: "histories",
        populate: { path: "topic", model: "Course", select: "title" },
      })
    const { histories } = user.toJSON()

    const sortHis = histories.sort((a, b) => {
      return new Date(b.dateStudy) - new Date(a.dateStudy);
    });
    let resu = []
    const len = sortHis.length
    if (len >= 5)
      for (let i = 0; i < 5; i++) {
        resu.push({
          ...sortHis[i], background: `bg_background_topic_${i + 1}`
        })
      } else {
      for (let i = 0; i < len; i++) {
        resu.push({
          ...sortHis[i], background: `bg_background_topic_${i + 1}`
        })
      }
    }
    return resu
  } catch (error) {
    throw error;
  }
};
exports.vocabulary = async (id, id_course) => {
  try {
    console.log(id_course)
    const user = await User.findById(id)
      .populate({
        path: "histories",
        populate: { path: "contents.content", model: "Content" },
        // populate: { path: "contents",model:"Content"},
      })
    let oftenWrong = [], sometimesWrong = [], master = []

    const { histories } = user.toJSON()
    const { contents = [] } = histories.find(his => his.topic.toString() === id_course) || []
    contents.forEach(element => {
      const ratio = (element.rightAnwser / element.totalAnwser) * 100
      if (ratio <= 30)
        oftenWrong.push(element)
      if (ratio > 20 && ratio <= 60)
        sometimesWrong.push(element)
      if (ratio > 60)
        master.push(element)
    });
    return { oftenWrong, sometimesWrong, master }
  } catch (error) {
    throw error
  }
}
