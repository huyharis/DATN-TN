const mongoose = require("mongoose");
const base = require("../../helper/_base_schema");

const RoomSchema = new mongoose.Schema({
  ...base,
  maxplayer: {
    type: Number,
  },
  player: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  status: {
    // 0 : close , 1 :waiting , 2 : play
    type: Number,
    default: 1,
  },
  win: { type: mongoose.Schema.ObjectId, ref: "User" },

});

module.exports = mongoose.model("Room", RoomSchema);
