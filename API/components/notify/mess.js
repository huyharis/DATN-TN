module.exports =(mess) => {
  switch (mess) {
    case "SHARE_COURSE":
        return "đã share cho bạn một khóa học"
      break;
    case "ADD_FRIEND":
        return "đã gửi lời mời kết bạn"
      break;
    case "ACCEPT_FRIEND":
        return "đã đồng ý lời mới kết bạn"
      break;
      case "INVITE_GAME":
        return "đã mời bạn chơi game"
      break;
    default:
        return false
      break;
  }
};
