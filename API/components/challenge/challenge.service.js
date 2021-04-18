const { db, error } = require("../../helper");
const { Challenge } = db;
const data = require("../../assets/challenge.json");
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

exports.getAll = async query => {
  const result =await Challenge.find(query);
  return result;
};
exports.getRandom=async ()=>{
  try {
  
    const result = await Challenge.find().limit(32)
    return shuffle(result)
  } catch (error) {
    throw error
  }
}
exports.getById = id => Challenge.findById(id);
exports.getByLevel = async level => {
  const Challenge = await Challenge.find({ level });
  return Challenge;
};
// exports.importData = async () => {
//     await Promise.all(Challenge.deleteMany())
//     await Challenge.insertMany(data)
// }
