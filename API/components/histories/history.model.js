const mongoose = require("mongoose");
const base = require("../../helper/_base_schema");
const historySchema = new mongoose.Schema({
  ...base,
  topic: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
  },

  contents: [
    {
      content: {
        type: mongoose.Schema.ObjectId,
        ref: "Content",
      },
      rightAnwser:{
          type:Number,
          default:0 //0 chua hoc, 1 thuong sai , 2 doi luc sai , 3 nam chac
      },
      totalAnwser:{
        type:Number,
        default:0 
      }
    },
  ],
  rightAnwser: {
    type: Number,
    default: 0,
  },
  totalAnwser:{
      type:Number,
      default:0
  },
  complete:{
    type:Number,
    default:0
  },
  dateStudy:{
    type: Date,
  }
});
module.exports = mongoose.model("History", historySchema);
