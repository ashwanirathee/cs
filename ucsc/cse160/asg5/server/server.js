const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
const clients = new Map();

server.on('connection', (socket) => {
  const id = Date.now();
  clients.set(socket, { id, x: 0, y: 100, z: 0 });

  console.log(`Player ${id} connected`);

  // Send existing players
  socket.send(JSON.stringify({ type: 'init', players: Array.from(clients.values()) }));

  socket.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'move') {
      clients.set(socket, { id, x: data.x, y: data.y, z: data.z });

      // Broadcast to other players
      for (const [client, player] of clients) {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'update', id, x: data.x, y: data.y, z: data.z }));
        }
      }
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
    console.log(`Player ${id} disconnected`);

    // Notify others about the disconnect
    for (const client of clients.keys()) {
      client.send(JSON.stringify({ type: 'remove', id }));
    }
  });
});

console.log("WebSocket server running on ws://localhost:8080");
