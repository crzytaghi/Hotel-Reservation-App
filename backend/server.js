// ===== Dependencies ===== //
const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
// const pool = require('./db');

// ===== Configuration ===== //
const app = express();
const PORT = process.env.PORT || 3000;


// ===== Middleweare ===== //
app.use(cors());

app.use(express.json()); // Allowing us access to the request to body which returns json data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// If you want to run sessions --
app.use(session({
    secret:process.env.SECRET,
    resave: true,
    saveUninitialized: false
}));

app.get('/', (req,res) => {
    res.send(`hotel reservation app ${PORT}`);
})

// ===== CONTROLLERS ===== //
const reservationController = require('./controllers/reservation_controller.js');
app.use('/reservations', reservationController);

const roomController = require('./controllers/room_controller');
app.use('/rooms', roomController);

// ===== Listener ===== //
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})