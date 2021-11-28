const app = require("../src/server/server");
const supertest = require('supertest');
const request = supertest(app);

describe("Test endpoint", function () {
    it("get test endpoint", async () => {
        const response = await request.get('/test');
        expect(response.status).toBe(200);
    });
});