module.exports = {
  invalidToken: {
    status: 401,
    message: 'Invalid Token'
  },
  tokenRequire: {
    status: 401,
    message: 'Token is required'
  },
  loginFailed: {
    status: 400,
    message: 'username or password is incorrect'
  },
  userExisted: {
    status: 400,
    message: 'username is taken'
  },
  avatarNotFound: {
    status: 400,
    message: 'avatar not found'
  },
  fileNotFound: {
    status: 400,
    message: 'file not found'
  },
  wrongPass: {
    status: 400,
    message: 'password is incorrect'
  },
  courseNotFound: {
    status: 400,
    message: 'course not exists'
  },
  topicNotFound: {
    status: 400,
    message: 'topic not exists'
  },
  friendNotFound: {
    status: 400,
    message: 'friend has exist'
  },
  friendRequestNotFound: {
    status: 400,
    message: 'friend request has exist'
  },
  friendNotOnline: {
    status: 400,
    message: 'friend not online'
  },
  requiredLogin: {
    status: 405,
    message: 'required login'
  },
  courseOfFriendIsExit: {
    status: 405,
    message: 'course of friend is exit'
  },
}
