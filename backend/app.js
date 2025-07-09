const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/connectDatabase');
const http = require('http');
const socketIo = require('socket.io');
const validateAccess = require("./router/validateAccess")

// Initialize the Express app
const app = express();

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// Connect to the database
connectDatabase();

// Middleware for JSON body parsing and CORS handling
app.use(express.json());
app.use(cors({
    origin: '*',
}));

// Create an HTTP server and bind Socket.IO to it
const server = http.createServer(app);

//usefetch methods to router folder
app.use('/api/v1/', validateAccess);
// Import the validateUserAccess function (for Socket.IO)
const { setMapCords } = require('./controllers/setMapCords');
const { TrackVehicle } = require("./controllers/trackVehicle");

// Configure Socket.IO with CORS
const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log(`New client connected ${socket.id}`);

    // Use the validateUserAccess function for each socket connection
    setMapCords(socket, io)
    TrackVehicle(socket, io)

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
