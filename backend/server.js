// ===== Dependencies ===== //
const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const pool = require('./db');

// ===== Configuration ===== //
const app = express();
const PORT = process.env.PORT || 3000


// ===== Middleweare ===== //
app.use(cors());

app.use(express.json()); // Allowing us access to the request to body which returns json data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret:process.env.SECRET,
    resave: true,
    saveUninitialized: false
}));

app.get('/', (req,res) => {
    res.send(`hotel reservation app ${PORT}`);
})

// ===== ROUTES ===== //

// ===== Create - POST ===== //
// Async provides us with await, which allows our program to complete before moving on to the next function
app.post("/reservations", async(req,res) => {
    try {
        const { room_number, price, max_occupancy, check_in, check_out } = req.body;
        const newReservation = await pool.query(
            "INSERT INTO reservations (room_number, price, max_occupancy, check_in, check_out) VALUES($1, $2, $3, $4, $5)", 
            [room_number, price, max_occupancy, check_in, check_out]
        );
        res.json(newReservation);
    } catch (error) {
        console.log(error.message);
    }
})

// ===== Get All ===== //

// ===== Get ===== //

// ===== Update - PUT ===== //

// ===== Delete ===== //

// ===== Listener ===== //
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})