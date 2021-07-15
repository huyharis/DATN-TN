const express = require("express");
const router = express.Router();
const RoomChatModel = require("../rooms/room.model");

router.get("/getRoomChatById", async (req, res) => {
  try {
    let { userId, partnerId } = req.query;
    let getData = await RoomChatModel.findOne({ users: { $in: [userId, partnerId] } }).populate("message.users");

    if (getData) {
      res.json({
        dataRoom: getData,
        msg: "successed"
      });
    } else {
      let newRoom = new RoomChatModel({
        users: [userId, partnerId],
        message: []
      });
      await newRoom.save();
      res.json({
        dataRoom: newRoom,
        msg: "successed"
      });
    }

  } catch (error) {
    console.log(error);
    res.json({ msg: "failed" });
  }
});

router.post('/addMsg', async (req, res) => {
  try {
    let { id, msg, roomId } = req.body

    let findRoom = await RoomChatModel.findById(roomId);
    let addUserInRoom = await RoomChatModel.findByIdAndUpdate(roomId, {
      message: [...findRoom.message, {
        users: id, msg: msg, dateSend: new Date(),
      }]
    })
    console.log("🚀 ~ file: room.route.js ~ line 44 ~ router.post ~ addUserInRoom", addUserInRoom)
    res.send(addUserInRoom)
    res.json({ message: 'successed' })
  }
  catch (err) {
    res.json({ error: err, message: 'error' })
  }
})

router.post("/deleteRoom", async (req, res) => {
  try {
    let { roomId } = req.query;
    await RoomChatModel.findByIdAndDelete(roomId);
    res.json({ msg: "successed" })
  }
  catch (err) {
    res.json({ msg: 'failed' })
  }
})

module.exports = router