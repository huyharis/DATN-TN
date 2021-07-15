const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
app.use(body_parser.json());

app.use("/api/user", require("./routers/users/users"));
app.use("/api/roomChat", require("./routers/roomChat/index"));
app.use("/api/icons", require("./routers/iconsRouter/index"));

const RoomChat = require("./models/roomchats");
const User = require("./models/users");

app.use("/public", express.static("public"));

let changeStreamRoom = RoomChat.watch();

changeStreamRoom.on("change", async (data) => {
  console.log("Phòng " + data.documentKey._id + "Vừa có 1 tin nhắn mới");
  io.emit(
    "changeRoomChat",
    await RoomChat.findById(data.documentKey._id).populate("message.users")
  );
});

io.on("connection", async (client) => {
  console.log("Connect");
});
mongoose.connect(
  "mongodb+srv://Huyharis:huy@cluster0.admy4.mongodb.net/Chat-App-Server?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("Mongodb conected");
  }
);
server.listen(PORT, () => {
  console.log("Server run on PORT " + PORT);
});
