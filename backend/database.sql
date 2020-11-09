CREATE DATABASE hotel;

CREATE TABLE reservations(
    reservation_id SERIAL PRIMARY KEY, -- Serial will increase your primary key at each new entry to ensure uniqueness.
    room_number INT,
    price INT,
    max_occupancy INT,
    check_in date,
    check_out date,
    room_id INT REFERENCES rooms (room_id)
);

CREATE TABLE rooms(
    room_id SERIAL PRIMARY KEY, 
    room_number INT,
    price INT,
    max_occupancy INT
);