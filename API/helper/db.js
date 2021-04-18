const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
// Database Connectivity
const uri = process.env.MONGO_URI
mongoose.connect(
  uri,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)
mongoose.Promise = global.Promise
module.exports = {
  User: require('../components/users/user.model'),
  Avatar: require('../components/avatars/avatar.model'),
  Course: require('../components/courses/course.model'),
  Content: require('../components/contents/content.model'),
  Topic: require('../components/topics/topic.model'),
  Vocabulary: require('../components/vocabularies/vocabulary.model'),
  History: require('../components/histories/history.model'),
  Challenge: require('../components/challenge/challenge.model'),
  Notify: require('../components/notify/notify.model'),
  Room: require('../components/rooms/room.model'),
  RoomConfig: require('../components/room_configs/room_config.model'),
  Alphabet: require('../components/alphabet/alphabet.model')
}
