
const postsSchema = {
    type: "object",
    strict: true,
    properties: {
        title: {
            type: "string",
            minLength: 4,
            maxLength: 128
        },
        content: {
            type: "string",
            minLength: 4
        }
    }
};

module.exports = postsSchema;