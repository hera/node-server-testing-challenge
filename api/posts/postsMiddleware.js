const inspector = require("schema-inspector");
const postsSchema = require("./postsSchema");


module.exports = {
    validatePostData
}


function validatePostData (req, res, next) {
    const postData = req.body;

    const result = inspector.validate(postsSchema, postData);
    
    if (result.valid) {
        next();
    } else {
        res.status(400).json({
            error: "Bad request. Please provide valid post data.",
            description: result.error
        });
    }
}