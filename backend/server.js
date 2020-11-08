// Dependencies
const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

// Configuration
const app = express();
const PORT = process.env.PORT || 3000


// Middleweare
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

// Controllers


// Listener
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})