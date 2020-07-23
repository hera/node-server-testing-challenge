const express = require("express");
const postDb = require("../posts/postsModel");

const router = express.Router();


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


router.post("/", (req, res) => {
    res.status(501).send("Not implemented");
});


router.delete("/:id", (req, res) => {
    res.status(501).send("Not implemented");
});


module.exports = router;