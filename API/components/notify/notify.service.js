const { db, error } = require("../../helper");
const { Notify, User } = db;
const avatarCtr = require("../avatars/avatar.controller");
const { socket } = require("../../socketio/index");
const notiFech = require("../../helper/fetch")
const avatarCtrl = require("../avatars/avatar.controller");
const messSen = require("./mess")
exports.getAllNotify = async () => await Notify.find();

exports.getNotifyForUser = async (_id, pageNumber, limit) => {
  const noti = await Notify.find({ recerUser: { $in: _id } })
    .skip(pageNumber * limit)
    .limit(limit)
    .sort({ update_at: -1 })
    .populate({
      path: "sentUser",
      select: "username avatar email",
    })
    .select("-recerUser");
  const count = await Notify.countDocuments({ recerUser: { $in: _id } });
  const notiForCount = await Notify.find({
    $and: [
      { recerUser: { $nin: _id } },
      { read_by: { $in: _id } }
    ]
  });
  const result = noti.map((no) => {
    return {
      ...no.toJSON(),
      sentUser: {
        ...no.toJSON().sentUser,
        avatar: avatarCtr.getImgUrl(no.toJSON().avatar),
      },
      read_by: true ? no.read_by.includes(_id) : false,
    };
  });
  return {
    total: count,
    page: pageNumber,
    pageSize: result.length,
    notSeenNumber: notiForCount.length,
    result: [...result],
  };
};
exports.create = async (data, _id) => {
  const result = await Notify.create({ ...data, sentUser: _id });
  const user = await User.findOne({ _id: data.recerUser });
  if (user.isOnline) {
    let noti = await Notify.findOne({ _id: result.toJSON()._id }).populate({
      path: "sentUser",
      select: "username avatar email",
    });
    notiAva = {
      ...noti.toJSON(),
      sentUser: {
        ...noti.toJSON().sentUser,
        avatar: avatarCtr.getImgUrl(noti.toJSON().avatar),
      },
    };
    socket.pushNotiToUser(user.socketId, { ...notiAva, read_by: false });
  }
  else {
    if (messSen(data.contentMess.type)) {
      const mess = user.tokenNotify.map(val => {
        return {
          to: val,
          sound: "default",
          title: "Thông báo",
          body: `${user.username} ${messSen(data.contentMess.type)}`,
          _displayInForeground: true,
        }
      })
      notiFech(mess).then(console.log("ok"))
    }
    // const message = {
    //  to: "ExponentPushToken[SlAtXFKit8v7jGfgvz9_M4]",
    //   sound: "default",
    //   title: "Thông báo",
    //   body: `${user.username} ${data.contentMess.type}`,
    //   _displayInForeground: true,
    // };
  }
  return;
};

exports.delete = async (_id) => await Notify.findOneAndDelete({ _id });

exports.updateSeen = async (id_notify, _id) => {
  await Notify.updateMany(
    { recerUser: { $in: _id } },
    { $push: { read_by: _id } }
  );
  // await Notify.updateMany(
  //   { _id: { $in: id_notify } },
  //   { $push: { read_by: _id } }
  // );
  return;
};
