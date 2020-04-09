const { translateMovie, translateShow } = require('../translator');
const fs = require('fs');

let radarrGrabContent, radarrDownloadContent;

describe('Sonarr', () => {
  let sonarrDownloadContent;

  beforeEach(() => {
    const downloadFilename = '__tests__/sample_sonarr_download.json';

    sonarrDownloadContent = JSON.parse(
      fs.readFileSync(downloadFilename, 'utf8')
    );
  });

  it('should respect upgrades', () => {
    sonarrDownloadContent.isUpgrade = true;
    const translatedShow = translateShow(sonarrDownloadContent);

    expect(translatedShow.embeds[0])
      .toHaveProperty('description', 'Episode(s) upgraded');
  });
});

describe('Radarr', () => {
  beforeEach(() => {
    const grabFilename = '__tests__/sample_radarr_grab.json';
    const downloadFilename = '__tests__/sample_radarr_download.json';

    radarrGrabContent = JSON.parse(fs.readFileSync(grabFilename, 'utf8'));
    radarrDownloadContent = JSON.parse(
      fs.readFileSync(downloadFilename, 'utf8')
    );
  });

  it('should parse a grab correctly', () => {
    const translatedMovie = translateMovie(radarrGrabContent);

    expect(translatedMovie).toBeTruthy();

    // Username
    expect(translatedMovie).toHaveProperty('username', 'Radarr');

    // Avatar
    const iconUrl = 'https://undefined.herokuapp.com/radarr-icon.png';

    expect(translatedMovie).toHaveProperty('avatar_url', iconUrl);

    // Embeds
    expect(translatedMovie.embeds).toHaveLength(1);
    const embed = translatedMovie.embeds[0];

    // Title
    expect(embed).toHaveProperty('title', 'Finding Nemo (2003)');

    // Description
    expect(embed).toHaveProperty('description', 'Movie grabbed');

    // Footer
    expect(embed).not.toHaveProperty('footer');
  });

  it('should respect upgrades', () => {
    radarrDownloadContent.isUpgrade = true;
    const translatedMovie = translateMovie(radarrDownloadContent);

    expect(translatedMovie.embeds[0])
      .toHaveProperty('description', 'Movie upgraded');
  });
});

