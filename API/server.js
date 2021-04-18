require('dotenv').config()
const express = require('express')
const app = express()
const logger = require('morgan');
const multer = require('multer');

const bodyParser = require('body-parser')
// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger.json')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swaggerDocument.json');
const path = require('path')
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(multer().any());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  next()
})
const PORT = process.env.PORT
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,{explorer: true}))
app.use('/api/assets', express.static(path.join(__dirname, 'assets')))
app.use('/api/users', require('./components/users/user.route'))
app.use('/api/avatars', require('./components/avatars/avatar.route'))
app.use('/api/courses', require('./components/courses/course.route'))
app.use('/api/topics', require('./components/topics/topic.route'))
app.use('/api/vocabularies', require('./components/vocabularies/vocabulary.route'))
app.use('/api/histories', require('./components/histories/history.route'))
app.use('/api/challenge', require('./components/challenge/challenge.route'))
app.use('/api/notify', require('./components/notify/notify.route'))
app.use('/api/game', require('./components/game/game.route'))
app.use('/api/alphabet', require('./components/alphabet/alphabet.route'))
// handle error
app.use(require('./middlewares/err.middleware'))
server = require('http').createServer(app),
io = require('socket.io').listen(server),
// app.listen(PORT || 3000, () => console.log('server is start: ' + PORT))
// socketIO.createServer({ server })




server.listen(PORT || 3000, () => console.log('server is start: ' + PORT));

var {socket} = require("./socketio")
socket.initSocket(io)
