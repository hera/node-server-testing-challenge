const request = require("supertest");

const server = require("../../server");
const db = require("../../data/dbConfig");
const postDb = require("./postsModel");



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
                expect(response).toHaveLength(1);
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