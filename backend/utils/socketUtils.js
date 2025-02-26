const socketIO = require('socket.io');

const setupWebSocket = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Nouvelle connexion WebSocket');

    socket.on('disconnect', () => {
      console.log('Déconnexion WebSocket');
    });
  });

  return io;
};

module.exports = { setupWebSocket };