const fs = require('fs');
const env = Object.assign({API_KEY: 'testapikey', ON_DOWNLOAD: 1}, process.env);
process.env = env;
const supertest = require('supertest');
const app = require('../index');
const request = require('request');

jest.mock('request');

describe('Post Sonarr', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    test.each(['download', 'grab', 'rename', 'test'])('should respect %p', async (eventType) => {
        const movie = JSON.parse(fs.readFileSync(`__tests__/sample_sonarr_${eventType}.json`, 'utf8'));
        env[`ON_${eventType.toUpperCase()}`] = 1;
        let res = await supertest(app)
            .post(`/sonarr/testapikey`)
            .send(movie);
        expect(res.statusCode).toEqual(204);
        expect(request.post.mock.calls.length).toBe(1);

        // Disable environment variable
        env[`ON_${eventType.toUpperCase()}`] = 0;
        res = await supertest(app)
            .post(`/sonarr/testapikey`)
            .send(movie);
        expect(res.statusCode).toEqual(204);
        expect(request.post.mock.calls.length).toBe(1);
    });
});