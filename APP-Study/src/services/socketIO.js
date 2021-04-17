import socketIO from "socket.io-client";
import { hostname } from "./host";
// Initialize Socket IO:
// const socket = socketIO(SERVER_URL, {
//   forceNew: true,
//   transports: ["websocket"],
//   jsonp: false,
// });
let socket;

export const socketInitial = (id) => {
  // const SERVER_URL = `https://22f057b741fb.ngrok.io?user_id=${id}`;
  const SERVER_URL = `${hostname}?user_id=${id}`;

  console.log("socketInitial", id);

  socket = socketIO(SERVER_URL, {
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: Infinity,
    transports: ["websocket"],
    forceNew: true,
  });

  return socket;
};

// const socket = socketIO(SERVER_URL, {
//     'reconnection': true,
//     'reconnectionDelay': 100,
//     'reconnectionAttempts': Infinity,
//     transports: ['websocket'],
//     forceNew: true
//   })

// export the function to connect and use socket IO:
export const startSocketIO = (store) => {
  try {
    console.log("stated socket");

    socket.connect();

    socket.on("connect", () => {
      console.log("connecteddd", store.id);
      // console.log('store', store)
      socket.io.opts.query = {
        user_id: store.id,
      };

      socket.connect();
      console.log(socket.connected);
    });
    socket.on("disconnect", () => {
      console.log("connection to server lost.");
    });

    socket.emit("reconnect", { user_id: store.id });

    socket.on("reconnect_attempt", () => {
      socket.io.opts.query = {
        user_id: store.id,
      };
    });

    // socket.on('GAME_START', (response) => {
    //   console.log('responseresponse', response);

    //   // callback(response)
    // })
  } catch (error) {
    alert("Something went wrong");
  }
};
export const pushNotification = (callback) => {
  socket.on("NOTIFY_USER", (message) => {
    console.log("NOTIFY_USER", message);
    callback(message);
  });
};

export const onStartGame = (callback) => {
  socket.on("GAME_START", (response) => {
    callback(response);
  });
};

export const getInfoRooms = (callback) => {
  socket.on("INFORMATION_GAME", (response) => {
    callback(response);
  });
};

export const emitAnswerWar = (data) => {
  socket.emit("PLAYER_ANSWER", data);
};

export const getTimeCountDown = (callback) => {
  socket.on("COUNT_DOWN", (response) => {
    callback(response);
  });
};

export const rejectGame = (data) => {
  socket.emit("REJECT", data);
};

export const handleError = (callback) => {
  socket.on("ERROR", (response) => {
    callback(response);
  });
};

export const endGame = (callback) => {
  socket.on("END_GAME", (response) => {
    console.log("Enddddddd", response);
    callback(response);
  });
};

export const SocketDisconect = () => {
  try {
    socket.disconnect();
  } catch (error) {
    alert("Something went wrong");
  }
};
