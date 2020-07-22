
exports.up = function(knex) {
    return knex.schema
        .createTable("post", table => {
            table.increments("id");
            table.string("title", 128)
                .notNullable()
                .unique();
            table.text("content");
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('post');
};
