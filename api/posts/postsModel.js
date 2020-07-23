const db = require("../../data/dbConfig");

module.exports = {
    getAll,
    add,
    remove
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

async function remove (id) {
    const removedPost = await getById(id);
    
    return db(TABLE_NAME)
        .where("id", id)
        .del()
        .then(rows => {
            return removedPost;
        });
}