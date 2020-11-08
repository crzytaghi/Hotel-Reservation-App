// ===== DEPENDENCIES ===== //
const express = require('express');
const pool = require('../db.js');

// ===== CONFIGURATION ===== //
const app = express.Router();

// ===== ROUTES ===== //

// ===== Create - POST ===== //

// async allows us to use await which enables the function to complete before requesting the data.
app.post('/reservations', async(req,res) => {
    try {
        res.send('They some hoes in this house!');
        // const { room_number, price, max_occupancy, check_in, check_out } = req.body;
        // const newReservation = await pool.query("INSERT INTO reservations (room_number, price, max_occupancy, check_in, check_out) VALUES($1, $2, $3, $4, $5)", [room_number, price, max_occupancy, check_in, check_out]);
    } catch (error) {
        console.log(error.message);
    }
})

// ===== Get All ===== //

// ===== Get ===== //

// ===== Update - PUT ===== //

// ===== Delete ===== //

module.exports = app;