'use strict';

const port = 3331;
const caps = require('socket.io')(port);


// Global stuff
caps.on('connection', (socket) => {//namespace
  console.log(`Welcome to the main server ${socket.id}`);

  socket.on('pickup', (payload) => {
    console.log('Package is ready for pickup');
    socket.broadcast.emit('driverpickup', payload);
  });

  socket.on('in-transit', (payload) => {
    console.log(`Package ID ${payload.orderId} has been picked up`);
    console.log(`Package ID ${payload.orderId} is in transit`);

    socket.broadcast.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    console.log(`Package ID ${payload.orderId} has been delivered`);
    socket.broadcast.emit('delivered', payload);
  });

});


