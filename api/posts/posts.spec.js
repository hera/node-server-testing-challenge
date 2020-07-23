const request = require("supertest");

const server = require("../../server");
const db = require("../../data/dbConfig");
const postDb = require("./postsModel");

describe("Test db functions", () => {
    beforeEach(async () => {
        await db("post").truncate();
    });
    

    afterEach(async () => {
        await db("post").truncate();
    });

    test("Gets all posts", async () => {
        const posts = await postDb.getAll();
        expect(posts).toHaveLength(0);
    });

    test("Add a post", async () => {
        const added = await postDb.add({
            title: "Sample post",
            content: "Sample content"
        });
        expect(added).toHaveLength(1);

        const posts = await postDb.getAll();
        console.log(posts);
        expect(posts).toHaveLength(1);
    });

    test("Remove a post", async () => {
        const postAdded = await postDb.add({
            title: "Sample post",
            content: "Sample content"
        });


        const postId = postAdded[0]["id"];

        let posts = await postDb.getAll();
        expect(posts).toHaveLength(1);

        const removedPost = await postDb.remove(postId);

        posts = await postDb.getAll();
        expect(posts).toHaveLength(0);
    });

});

describe("Test posts", () => {

    beforeAll(async () => {
        await db("post").truncate();
    });
    

    afterAll(async () => {
        await db("post").truncate();
    });


    test("Receives an empty array", async () => {
        const response = await request(server).get("/api/posts");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body).toHaveLength(0);
    });


    test("Add a post", async () => {
        await request(server)
            .post("/api/posts")
            .send({
                title: "Sample post",
                content: "Sample content"
            })
            .then(response => {
                expect(response.status).toBe(201);
                expect(response.headers["content-type"]).toMatch(/application\/json/);
                expect(response.body).toHaveLength(1);
            });
    });


    let postId;

    test("Get all posts", async () => {
        const response = await request(server).get("/api/posts");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body).toHaveLength(1);
        postId = response.body[0]["id"];
    });


    test("Del a post", async () => {
        const response = await request(server).del(`/api/posts/${postId}`);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body).toHaveLength(1);
    });


    test("Receives an empty array again", async () => {
        const response = await request(server).get("/api/posts");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body).toHaveLength(0);
    });

    
});