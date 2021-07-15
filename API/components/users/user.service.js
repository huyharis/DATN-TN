const { db, error } = require("../../helper");
const { User } = db;
const salt = 10;
const bcrypt = require("bcryptjs");
const avatarCtr = require("../avatars/avatar.controller");
const notifyService = require("../notify/notify.service");

// const IO = require('../../socket');
// const EVENTS = require('../../socket/events')

exports.findById = (id) => User.findById(id);
exports.findOne = async (user) => User.findOne(user).lean();
exports.findByIdAndUpdate = ({ _id, ...data }) =>
  User.findByIdAndUpdate(_id, data, { new: true });

exports.getMe = (id) => this.findById(id).select("-hash");

exports.create = async (postBody) => {
  const { password, username, ...info } = postBody;
  const name = username.toLowerCase().replace(/\s/g, "");
  const [userExisted, hashPass] = await Promise.all([
    this.findOne({ username: name }),
    bcrypt.hash(password, salt),
  ]);
  if (userExisted) throw error.userExisted;
  const user = await User.create({
    username: name,
    hash: hashPass,
    ...info,
  });
  const { hash, ...userWithoutHash } = user.toJSON();
  return userWithoutHash;
};

exports.setUsername = async ({ username, newName, password, _id }) => {
  const [userExisted, user] = await Promise.all([
    this.findOne({ username: newName }),
    this.findOne({ username }),
  ]);
  if (user && bcrypt.compareSync(password, user.hash)) {
    if (userExisted) throw error.userExisted;
    const updateUser = await this.findByIdAndUpdate({
      _id,
      username: newName,
    }).select("-hash");
    return updateUser.toJSON();
  } else throw error.wrongPass;
};

exports.login = async ({ username, password, email }) => {
  const user = await this.findOne({ ...(email ? { email } : { username }) });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const u_user = await this.findByIdAndUpdate({
      _id: user._id,
      isGuest: false,
      ...(email
        ? { typeLogin: User.type_login.EM }
        : { typeLogin: User.type_login.UN }),
    });
    const { hash, ...userWithoutHash } = u_user.toJSON();
    return userWithoutHash;
  } else throw error.loginFailed;
};

exports.getCourseLatest = async (id) => {
  const user = await User.findById(id)
    .populate({
      path: "courses",
      populate: { path: "contents" },
      options: { sort: "-create_at" },
    })
    .select("-hash");
  const {
    avatar,
    username,
    _id,
    courses,
    create_at,
    ...userExceptField
  } = user.toJSON();
  return {
    avatar,
    username,
    _id,
    courses,
    create_at,
  };
};

exports.setSumQuestion = (body, _id) => {
  return this.findByIdAndUpdate({ _id, ...body });
};

// exports.inviteFriends = async (body, user) => {
//   const { friend_id } = body;
//   const { isOnline, socketId } = await User.findById(friend_id)
//   IO.socket && isOnline && socketId && IO.socket.to(socketId).emit(EVENTS.INVITE_FRIEND, { invite_from: user })
//   return { success: true }
// }

exports.addFriend = async (body, _id) => {
  try {
    const { friend_id, is_request } = body;
    const check = await User.find({ _id: friend_id });
    if (!check.length) throw error.friendNotFound;
    if (!is_request) {
      const userHasFriend = await User.find({
        _id,
        friends: { $in: friend_id },
      });
      const FriendHasUser = await User.find({
        _id: friend_id,
        friends: { $in: _id },
      });
      if (userHasFriend.length || FriendHasUser.length)
        throw error.friendNotFound;
      await User.updateOne({ _id }, { $push: { friends: friend_id } });
      await User.updateOne({ _id }, { $pull: { requestFriend: friend_id } });
      await User.updateOne({ _id: friend_id }, { $push: { friends: _id } });
      return;
    } else {
      const hasRequest = await User.find({
        _id: friend_id,
        requestFriend: { $in: _id },
      });
      if (hasRequest.length) throw error.friendRequestNotFound;

      await User.updateOne(
        { _id: friend_id },
        { $push: { requestFriend: _id } }
      );
      // const UserUpdate = await User.find({ _id: friend_id });
      notifyService.create(
        {
          recerUser: friend_id,
          contentMess: {
            type: "ADD_FRIEND",
            content: null,
          },
        },
        _id
      );

      return;
    }
  } catch (err) {
    throw err;
  }
};
exports.friends = async (_id) => {
  try {
    const user = await User.findById(_id)
      .populate({ path: "friends", select: "-hash" })
      .populate({ path: "requestFriend", select: "-hash" })
      .select("friends requestFriend");
    let result = {};
    if (user.friends.length)
      result.friends = user.friends.map((u) => {
        return {
          ...u.toJSON(),
          avatar: avatarCtr.getImgUrl(u.avatar),
        };
      });
    else {
      result = {
        friends: [],
      };
    }
    if (user.requestFriend.length)
      result.requestFriend = user.requestFriend.map((u) => {
        return {
          ...u.toJSON(),
          avatar: avatarCtr.getImgUrl(u.avatar),
        };
      });
    else {
      result = {
        ...result,
        requestFriend: [],
      };
    }
    return result;
  } catch (err) {
    throw err;
  }
};
exports.search = async (_id, q) => {
  try {
    const myRe = new RegExp(`${q.toLowerCase()}`);
    const result = await User.find({
      username: { $regex: myRe },
      _id: { $ne: _id },
    }).select("username avatar email friends requestFriend isOnline");
    const resultAva = result.map((u) => {
      debugger;
      var type = "notFriend";
      u.friends.map((id) => {
        if (id.toString() === _id.toString()) {
          type = "isFriend";
        }
      });
      u.requestFriend.map((id) => {
        if (id.toString() === _id.toString()) {
          type = "isRequest";
        }
      });
      return {
        ...u.toJSON(),
        avatar: avatarCtr.getImgUrl(u.toJSON().avatar),
        type,
      };
    });
    return resultAva;
  } catch (err) {
    throw err;
  }
};
exports.friends = async (_id) => {
  try {
    const user = await User.findById(_id)
      .populate({ path: "friends", select: "-hash" })
      .populate({ path: "requestFriend", select: "-hash" })
      .select("friends requestFriend");
    let result = {};
    if (user.friends.length)
      result.friends = user.friends.map((u) => {
        return {
          ...u.toJSON(),
          avatar: avatarCtr.getImgUrl(u.avatar),
        };
      });
    else {
      result = {
        friends: [],
      };
    }
    if (user.requestFriend.length)
      result.requestFriend = user.requestFriend.map((u) => {
        return {
          ...u.toJSON(),
          avatar: avatarCtr.getImgUrl(u.avatar),
        };
      });
    else {
      result = {
        ...result,
        requestFriend: [],
      };
    }
    return result;
  } catch (err) {
    throw err;
  }
};

exports.facebookLogin = async (body) => {
  const { email, name, token, id, picture } = body;
  // login by facebookLogin
  if (id) {
    const userExisted = await User.findOne({ fbId: id })
      .select({ hash: 0 })
      .lean()
      .exec();

    if (userExisted) return userExisted;
  }

  // create new user loginByFB

  const user = await User.create({
    email,
    username: name,
    typeLogin: User.type_login.FB,
    hash: "no-hash",
    isGuest: false,
    fbId: id,
    avatar: picture,
  });

  const { hash, ...userWithoutHash } = user.toJSON();
  return userWithoutHash;
};
exports.hightMark = async (body, _id) => {
  const result = await User.findById({ _id });
  const update = {
    challenge: body.challenge || result.toJSON().markHight.challenge,
    topic: body.topic || result.toJSON().markHight.topic,
    course: body.course || result.toJSON().markHight.course,
  };
  await User.findOneAndUpdate({ _id }, { $set: { markHight: update } });
  return;
};
exports.updateTokenNotify = async (body, _id) => {
  const result = await User.findById({ _id });
  if (result.toJSON().tokenNotify.length)
    if (result.tokenNotify.indexOf(body.token) !== -1) return;
  await User.findOneAndUpdate({ _id }, { $push: { tokenNotify: body.token } });
  return;
};
exports.deleteToken = async (body, _id) => {
  const result = await User.findById({ _id });

  await User.findOneAndUpdate({ _id }, { $pull: { tokenNotify: body.token } });
  return;
};
exports.getHightMark = async (query, _id) => {
  // let  = query.q || "challenge";
  let page = parseInt(query.page) || 0;
  let limit = parseInt(query.limit) || 5;
  const user = await User.findOne({ _id });
  const id_friends = [...user.toJSON().friends, _id];
  let result = [];
  const count = await User.countDocuments({ _id: { $in: id_friends } });

  if (query.challenge) {
    result = await User.find({ _id: { $in: id_friends } })
      .skip(page * limit)
      .limit(limit)
      .sort({
        "markHight.challenge": "-1",
      });
  } else if (query.topic) {
    result = await User.find({ _id: { $in: id_friends } })
      .skip(page * limit)
      .limit(limit)
      .sort({
        "markHight.topic": "-1",
      });
  } else if (query.course) {
    result = await User.find({ _id: { $in: id_friends } })
      .skip(page * limit)
      .limit(limit)
      .sort({
        "markHight.course": "-1",
      });
  }
  const resultAva = result.map((data) => {
    return {
      ...data.toJSON(),
      avatar: avatarCtr.getImgUrl(data.toJSON().avatar),
    };
  });
  return {
    total: count,
    page,
    pageSize: result.length,
    result: [...resultAva],
  };
};
