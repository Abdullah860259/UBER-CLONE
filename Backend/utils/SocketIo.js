const socketio = require("socket.io");
const userModal = require("../modals/user.modal");
const Captain = require("../modals/captain.modal");
const jwt = require("jsonwebtoken");
let io;

function initializeSocket(server) {
  io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use(async (socket, next) => {
    const auth = socket.handshake.auth;
    try {
      const decoded = jwt.verify(auth.token, process.env.JWT_SECRET);
      socket.userid = decoded.id;
      socket.userType = auth.userType;
      next(); // ✅ allow connection
    } catch (error) {
      console.log(error);
      next(new Error("Authentication failed")); // ❌ reject connection
    }
  });

  io.on("connection", (socket) => {
    console.log("A new connection is formed " + socket.id);

    socket.on("join", async (data) => {
      const { user, userType } = data;
      if (userType === "user") {1
        await userModal.findByIdAndUpdate(user._id, {
          sockedId: socket.id,
        });
      } else if (userType === "captain") {
        await Captain.findByIdAndUpdate(user._id, {
          socketId: socket.id,
          status: "active",
        });
      }
    });

    socket.on("updateLocation", async (data) => {
      const { id, userType, location } = data;
      if (userType === "user") {
        await userModal.findByIdAndUpdate(id, {
          location: location,
        });
      } else if (userType === "captain") {
        await Captain.findByIdAndUpdate(id, {
          location: location,
        });
      }
    });

    socket.on("disconnect", async () => {
      console.log("Client disconnected " + socket.id);
      if (socket.userType === "user") {
      } else if (socket.userType === "captain") {
        await Captain.findByIdAndUpdate(socket.userid, {
          status: "inactive",
        });
      }
    });
  });
}

function sendMessageToSocketId(message, socketId, messsgeKey) {
  if (!message || !socketId || !messsgeKey) {
    throw new Error("Fields are not defined");
  }
  if (io) {
    io.to(socketId).emit(messsgeKey, message);
    console.log(`a new message to ${socketId} is sent by key ${messsgeKey}`);
  } else {
    console.log("io is not initialized");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
