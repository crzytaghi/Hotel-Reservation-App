// ===== DEPENDENCIES ===== //
const express = require('express');
const pool = require('../db');

// ===== CONFIGURATION ===== //
const app = express.Router();

// ****************** ROUTES ****************** //

// ===== Create - POST ===== //
// Async provides us with await, which allows our program to complete before moving on to the next function
app.post("/", async(req,res) => {
    try {
        const { room_number, price, max_occupancy, check_in, check_out } = req.body;
        const newReservation = await pool.query(
            "INSERT INTO reservations (room_number, price, max_occupancy, check_in, check_out) VALUES($1, $2, $3, $4, $5) RETURNING *", // RETURNING * allows us to return back all of the data to the user.
            [room_number, price, max_occupancy, check_in, check_out]
        );
        res.json(newReservation.rows[0]); // Returns only the body of the response that we want.
    } catch (error) {
        console.log(error.message);
    }
})

// ===== Get All ===== //
app.get('/', async(req,res) => {
    try {
        const allReservations = await pool.query("SELECT * FROM reservations");
        res.json(allReservations.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// ===== Get One ===== //
app.get('/:id', async (req,res) => {
    try {
        // res.send(req.params);
        const { id } = req.params;
        const reservation = await pool.query("SELECT * FROM reservations WHERE reservation_id = $1", [id])

        res.json(reservation.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// ===== Update - PUT ===== //
app.put('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const { room_number, price, max_occupancy, check_in, check_out } = req.body;
        const updateReservation = await pool.query("UPDATE reservations SET room_number = $1, price = $2, max_occupancy = $3, check_in = $4, check_out = $5 WHERE reservation_id = $6", [room_number, price, max_occupancy, check_in, check_out, id]);

        res.json(updateReservation.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// ===== Delete ===== //
app.delete("/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deleteReservation = await pool.query("DELETE FROM reservations WHERE reservation_id = $1 RETURNING *", [id]);

        res.json(deleteReservation.rows);
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = app;