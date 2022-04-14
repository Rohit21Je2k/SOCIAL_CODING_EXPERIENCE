const chat = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("send-message", (msg, user, room) => {
      if (room === "") {
        return;
      }

      socket.to(room).emit("receive-message", msg, user);
    });

    socket.on("join-room", (room) => {
      socket.join(room);
    });
  });
};

export default chat;
