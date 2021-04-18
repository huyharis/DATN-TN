const { db, error } = require("../../helper");
const { Notify, User, Room } = db;
const avatarCtr = require("../avatars/avatar.controller");
const { socket } = require("../../socketio/index");
const notifySer = require("../notify/notify.service");

exports.inviteFriend = async (data, _id) => {
  const { friend_id, game } = data;
  const me = await User.findOne({_id})
  const friend = await User.findOne({ _id: friend_id });
  if (!friend.toJSON().isOnline) throw error.friendNotOnline;
  const room_name = await socket.CreateRoomToWaiting(me,friend);
  notifySer.create(
    {
      recerUser: friend_id,
      contentMess: {
        type: "INVITE_GAME",
        content: room_name,
      },
    },
    _id
  );
  return room_name;
};
exports.acceptFriend = async (data, _id) => {
  const { friend_id, game, content, accept } = data;
  const me = await User.findOne({ _id }).select("username avartar isOnline socketId");
  const friend = await User.findOne({ _id: friend_id }).select("username avartar isOnline socketId");
  if (!friend.isOnline) throw error.friendNotOnline;
  if (accept) {
    socket.startGame(content, {
      ...me.toJSON(),
      avatar: avatarCtr.getImgUrl(me.toJSON().avatar),
    },{...friend.toJSON()});
  } else {
    socket.UserNoAccept(content, {
      ...friend.toJSON(),
      avatar: avatarCtr.getImgUrl(friend.toJSON().avatar),
    });
  }
  return;
};
