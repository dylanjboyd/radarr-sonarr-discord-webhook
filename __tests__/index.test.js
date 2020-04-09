'use strict';

const fs = require('fs');
const env = { API_KEY: 'testapikey', ...process.env };

process.env = env;
const supertest = require('supertest');
const app = require('..');
const request = require('request');

jest.mock('request');

describe('Post Sonarr', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  const eventTypes = ['download', 'grab', 'rename', 'test'];

  test.each(eventTypes)('should respect %p', async eventType => {
    const testFilename = `__tests__/sample_sonarr_${eventType}.json`;
    const movie = JSON.parse(fs.readFileSync(testFilename, 'utf8'));

    env[`ON_${eventType.toUpperCase()}`] = 1;
    let res = await supertest(app).post('/sonarr/testapikey').send(movie);

    expect(res.statusCode).toEqual(204);
    expect(request.post.mock.calls.length).toBe(1);

    // Disable environment variable
    env[`ON_${eventType.toUpperCase()}`] = 0;
    res = await supertest(app).post('/sonarr/testapikey').send(movie);
    expect(res.statusCode).toEqual(204);
    expect(request.post.mock.calls.length).toBe(1);
  });
});
