const socketIO = require('socket.io');
const redisCli = require('redis');
const redisAdapter = require('socket.io-redis');
const userService = require('../components/users/user.service')
const EVENTS = require('./events');
const client = redisCli.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

exports.socket = null;

exports.createServer = ({ server }) => {
    const io = socketIO(server);
    io.adapter(redisAdapter({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }));
    this.socket = io;
    const socketRoom = (room_id) => io.to(room_id);
    io.on(EVENTS.CONNECTION, socket => {

        const userId = socket.handshake.query.id || socket.handshake.query.user_id;
        userService.findByIdAndUpdate({ _id: userId, isOnline: true, socketId: socket.id }).then(res => res)
        console.log(`userId: ${userId} -> socketId: ${socket.id}`)
        socket.on(EVENTS.DISCONNECT, reason => {
            userService.findByIdAndUpdate({ _id: userId, isOnline: false, socketId: '' }).then(res => res)
        })
    })
    return io;
}