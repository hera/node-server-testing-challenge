const db = require("../../data/dbConfig");

module.exports = {
    getAll,
    add
};

const TABLE_NAME = "post";


function getAll () {
    return db(TABLE_NAME);
}


function getById (id) {
    return db(TABLE_NAME).where({id});
}


function add (postData) {
    return db(TABLE_NAME)
        .insert(postData, "id")
        .then(ids => {
            return getById(ids[0]);
        })
}