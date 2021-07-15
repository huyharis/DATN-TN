const mongoose = require("mongoose");
const base = require("../../helper/_base_schema");

const RoomSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.ObjectId,
    ref: "User",
  }],
  message: [{
    users: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    msg: "string",
    dateSent: "date"
  }]
});

module.exports = mongoose.model("Room", RoomSchema);
