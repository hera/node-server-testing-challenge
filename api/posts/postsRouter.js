const express = require("express");
const postDb = require("../posts/postsModel");
const { validatePostData } = require("./postsMiddleware");

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

router.post("/", validatePostData, (req, res) => {
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
    postDb.remove(req.params.id)
        .then(post => {
            if (!post.length) {
                res.status(404).json({
                    error: "Not found"
                });
            } else {
                res.status(200).json(post);
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not delete a post.",
                description: error
            });
        });
});


module.exports = router;