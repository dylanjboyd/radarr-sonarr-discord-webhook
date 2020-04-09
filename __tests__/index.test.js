/* eslint-disable no-process-env */
'use strict';

const fs = require('fs').promises;
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
  const eventTypes = [ 'Download', 'Grab', 'Rename', 'test' ];

  test.each(eventTypes)('should respect %p.', async eventType => {
    const testFilename = `__tests__/sampleSonarr${eventType}.json`;
    const movie = JSON.parse(await fs.readFile(testFilename, 'utf8'));

    env[`ON_${eventType.toUpperCase()}`] = '1';
    let res = await supertest(app).post('/sonarr/testapikey').send(movie);

    expect(res.statusCode).toEqual(204);
    expect(request.post.mock.calls.length).toBe(1);

    // Disable environment variable
    env[`ON_${eventType.toUpperCase()}`] = '';
    res = await supertest(app).post('/sonarr/testapikey').send(movie);
    expect(res.statusCode).toEqual(204);
    expect(request.post.mock.calls.length).toBe(1);
  });
});
