const request = require("supertest");

const server = require("../../server");
const db = require("../../data/dbConfig");
const postDb = require("./postsModel");



describe("Get all posts", () => {
    test("Receives an empty array", async () => {
        const response = await request(server).get("/api/posts");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body).toEqual([]);
    });
});