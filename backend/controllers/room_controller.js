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
        const { room_number, price, max_occupancy } = req.body;
        const newRoom = await pool.query(
            "INSERT INTO rooms (room_number, price, max_occupancy) VALUES($1, $2, $3) RETURNING *", // RETURNING * allows us to return back all of the data to the user.
            [room_number, price, max_occupancy]
        );
        res.json(newRoom.rows[0]); // Returns only the body of the response that we want.
    } catch (error) {
        console.log(error.message);
    }
})

// ===== Get All ===== //
app.get('/', async(req,res) => {
    try {
        /* Order list by room_id */
        const allRooms = await pool.query("SELECT * FROM rooms ORDER BY room_id ASC");
        res.json(allRooms.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// ===== Get One ===== //
app.get('/:id', async (req,res) => {
    try {
        // res.send(req.params);
        const { id } = req.params;
        const room = await pool.query("SELECT * FROM rooms WHERE room_id = $1", [id])

        res.json(room.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// ===== Update - PUT ===== //
app.put('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const { room_number, price, max_occupancy } = req.body;
        const updateRoom = await pool.query("UPDATE rooms SET room_number = $1, price = $2, max_occupancy = $3 WHERE room_id = $4", [room_number, price, max_occupancy, id]);

        res.json(updateRoom.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// ===== Delete ===== //
app.delete("/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deleteRoom = await pool.query("DELETE FROM rooms WHERE room_id = $1 RETURNING *", [id]);

        res.json(deleteRoom.rows);
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = app;