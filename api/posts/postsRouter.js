const express = require("express");
const postDb = require("../posts/postsModel");

const router = express.Router();


// Get all posts

router.get("/", (req, res) => {
    postDb.getAll()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not get all posts.",
                description: error
            });
        });
});


// Add a post

router.post("/", (req, res) => {
    postDb.add(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not add a post.",
                description: error
            });
        });
});


router.delete("/:id", (req, res) => {
    res.status(501).send("Not implemented");
});


module.exports = router;