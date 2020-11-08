CREATE DATABASE hotel;

CREATE TABLE reservations(
    reservation_id SERIAL PRIMARY KEY, -- Serial will increase your primary key at each new entry to ensure uniqueness.
    room_number int,
    price int,
    max_occupancy int,
    check_in date,
    check_out date
);