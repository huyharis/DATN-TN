const mongoose = require("mongoose");
const base = require("../../helper/_base_schema");
const notifySchema = new mongoose.Schema({
  ...base,
  recerUser: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  ],
  sentUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  read_by: [
    { type: mongoose.Schema.Types.ObjectId, ref: "user" }
    // read_at: { type: Date, default: Date.now }
  ],
  contentMess: {
    type: Object
  }
});

const Notify = mongoose.model("Notify", notifySchema);
module.exports = Notify;
