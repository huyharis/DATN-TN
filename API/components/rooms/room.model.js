const mongoose = require("mongoose");
const base = require("../../helper/_base_schema");

const RoomSchema = new mongoose.Schema({
  nameRoom: {
    type: "string",
    required: true,
  },
  message: [
    {
      users: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      msg: {
        type: "string",
        dateSend: "date",
      },
    },
  ],
});

module.exports = mongoose.model("Room", RoomSchema);
