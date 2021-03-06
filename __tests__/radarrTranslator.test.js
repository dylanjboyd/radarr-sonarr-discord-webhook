'use strict';

const { translateMovie } = require('../translator');
const fs = require('fs').promises;

describe('Radarr', () => {
  let radarrGrabContent;
  let radarrDownloadContent;

  beforeEach(async () => {
    radarrGrabContent = JSON.parse(await fs.readFile('__tests__/sampleRadarrGrab.json', 'utf8'));
    radarrDownloadContent = JSON.parse(await fs.readFile('__tests__/sampleRadarrDownload.json', 'utf8'));
  });

  it('should parse a grab correctly.', async done => {
    const translatedMovie = translateMovie(radarrGrabContent);

    expect(translatedMovie).toBeTruthy();

    // Username
    expect(translatedMovie).toHaveProperty('username', 'Radarr');

    // Avatar
    expect(translatedMovie).toHaveProperty('avatar_url', 'https://undefined.herokuapp.com/radarr-icon.png');

    // Embeds
    expect(translatedMovie.embeds).toHaveLength(1);
    const embed = translatedMovie.embeds[0];

    // Title
    expect(embed).toHaveProperty('title', 'Finding Nemo (2003)');

    // Description
    expect(embed).toHaveProperty('description', 'Movie grabbed');

    // Footer
    expect(embed).not.toHaveProperty('footer');
    done();
  });

  it('should respect upgrades.', async done => {
    radarrDownloadContent.isUpgrade = true;
    const translatedMovie = translateMovie(radarrDownloadContent);

    expect(translatedMovie.embeds[0]).toHaveProperty('description', 'Movie upgraded');
    done();
  });
});

