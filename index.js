require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const db = require("./data/dbConfig");


const server = express();

server.use(helmet());
server.use(express.json());


server.listen(
    process.env.PORT || 8000,
    () => console.log("Server is running...")
);