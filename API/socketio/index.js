const { db, error } = require("../helper");
const { User } = db;
const room = require("./room");
class socket {
  constructor() {
    this.sockett = null;
  }
  
  static initSocket(io) {
    this.io = io;
    io.on("connection", async (socket) => {
      const { user_id } = socket.handshake.query;
      this.sockett = socket;
      if (user_id)
        await User.findOneAndUpdate(
          { _id: user_id },
          { $set: { isOnline: true, socketId: socket.id } }
        );
      console.log("connect", "user_id", user_id, "socket id", socket.id);

      socket.on("disconnect", async function () {
        if (user_id)
          await User.findOneAndUpdate(
            { _id: user_id },
            { $set: { isOnline: false } }
          );
        console.log("disconnect", user_id);
      });
      ///
      socket.on("PLAYER_ANSWER", (data) => {
        console.log("INFORmation");
        console.log("data nhan", data);
        this.INFORMATION_GAME(data);
      });
      // socket.on("END_GAME", (data) => {
      //   this.END_GAME(data);
      // });
      socket.on("REJECT", (data) => {
        this.REJECT(data);
      });
      return socket;
    });
  }
  static pushNotiToUser(socketId, data) {
    console.log("push notify ne",data);

    io.to(socketId).emit("NOTIFY_USER", data);
  }

  static async CreateRoomToWaiting(me, friend) {
    const me_socketid = me.socketId;
    const friend_socketid = friend.socketId;
    const RAN_DOM_ROOM = await room.createRanDomRoom(me._id);
    console.log("thang moi:::", me_socketid);
    io.sockets.connected[me_socketid].join(RAN_DOM_ROOM);

    // console.log(
    //   "thằng tạo",
    //   RAN_DOM_ROOM,
    //   this.io.sockets.connected[me_socketid].id
    // );
    // this.io.to(RAN_DOM_ROOM).emit("ROOM_HAS_CREATED", "Room has created");
    // this.io.on("USER_NO_ACCEPT", (user) => {
    //   room.leave(user.room);
    //   this.socket.leave(user.room);
    // });
    // this.io.sockets.connected[friendID].join(RAN_DOM_ROOM);
    // this.io.sockets.connected[meID].join(RAN_DOM_ROOM);
    // this.io
    //   .to(RAN_DOM_ROOM)
    //   .emit("private room created", `${RAN_DOM_ROOM} has to created`);
    // this.socket.on("RIGHT_ANSWER", data => {
    //  console.log(data,RAN_DOM_ROOM);
    //   this.io
    //     .to(RAN_DOM_ROOM)
    //     .emit("RIGHT_ANSWER", { id: this.user_id, answer: data });
    // });
    return RAN_DOM_ROOM;
  }
  static UserNoAccept(room_user, user) {
    this.io.to(user.socketId).emit("USER_NO_ACCEPT", "Friend no accept");
    room.deleteRoom(room_user);
  }
  static Join(room) {
    console.log(this.sockett.id);
  }
  static async startGame(room_user, me, friend) {
    try {
      const findRoom = await room.findRoom(room_user);
      console.log(findRoom,room_user)
      if (!findRoom) {
        console.log("loi moi het han");
        throw "Lời Mời HẾT HẠN";
      }
      const me_socketid = me.socketId;
      console.log("thang chap nhan::::", me_socketid);
      io.sockets.connected[me_socketid].join(room_user);
      const data = {
        room: room_user,
        user1: {
          ...me,
          score: 0,
        },
        user2: { ...friend, score: 0 },
      };
      // this.socket.join(room_user);
      // const friend_socketid = friend.socketId;

      console.log(
        "thằng chấp nhận vào chơi",
        room_user,
        this.io.sockets.connected[me_socketid].id
      );
      io.to(room_user).emit("GAME_START", { data: true });
      io.to(room_user).emit("INFORMATION_GAME", data);
      // this.io.to(friend_socketid).emit("USER_ACCEPT", "Friend has accept");

      let counter = 50;
      let Coundow = setInterval(() => {
        this.COUNT_DOW({ ...data, counter });
        counter--;
        if (counter === 0) {
          this.END_GAME(data)
          clearInterval(Coundow);
        }
      }, 1000);
    } catch (err) {
      console.log(err)
      this.ERROR_MESS(me.socketId, err);
    }
  }
  static COUNT_DOW(data) {
    io.to(data.room).emit("COUNT_DOWN", data.counter);
  }
  static ERROR_MESS(socketid, mess) {
    io.to(socketid).emit("ERROR", mess);
  }
  static async END_GAME(data) {
    let result = {};
    if (data.user1.score > data.user2.score) {
      result = {
        user1: { ...data.user1, win: true },
        user2: { ...data.user2, win: false },
      };
      await room.endRoom(data.room, data.user1.id);
    }
    if(data.user1.score === data.user2.score){
      result = {
        user2: { ...data.user2, win: true },
        user1: { ...data.user1, win: true },
      };
    } if(data.user1.score < data.user2.score) {
      result = {
        user2: { ...data.user2, win: true },
        user1: { ...data.user1, win: false },
      };
      await room.endRoom(data.room, data.user2.id);
    }
    console.log("EndGAME",result)
    io.to(data.room).emit("END_GAME", result);
  }
  static async REJECT(id) {
    await room.deleteRoom(id);
  }
  static INFORMATION_GAME(data) {
    console.log("INFOR_room");
    io.to(data.room).emit("INFORMATION_GAME", data);
  }
}

module.exports = { socket };
