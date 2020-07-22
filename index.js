require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const db = require("./data/dbConfig");
const postsRouter = require("./api/posts/postsRouter");


const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/posts", postsRouter);


server.listen(
    process.env.PORT || 8000,
    () => console.log("Server is running...")
);