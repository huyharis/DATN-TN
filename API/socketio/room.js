const { db, error } = require("../helper");
const { Notify, User, Room } = db;
exports.createRanDomRoom = async me => {
  const player = [];
  player.push(me);
  const room = await Room.create({
    player,
    maxplayer: 2,
    status: 1
  });
  return room.toJSON()._id;
};
exports.leaveRoom = async _id => {
  await Room.findOneAndUpdate({ _id} , { $set: { status: 2 } });
};
exports.endRoom = async (_id,win) => {
  await Room.findOneAndUpdate({ _id:{$in:_id} }, { $set: { status: 0 } },{$set:{win}});
};
exports.deleteRoom= async _id =>{
  await Room.findOneAndRemove({_id})
}
exports.findRoom=async _id=>{
 const result= await Room.findOne({_id})
  return result
}
