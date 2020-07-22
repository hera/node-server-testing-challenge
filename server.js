const express = require("express");
const helmet = require("helmet");
const db = require("./data/dbConfig");
const postsRouter = require("./api/posts/postsRouter");


const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/posts", postsRouter);

module.exports = server;