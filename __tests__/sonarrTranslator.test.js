'use strict';

const { translateShow } = require('../translator');
const fs = require('fs').promises;

describe('Sonarr', () => {
  let sonarrDownloadContent;

  beforeEach(async () => {
    sonarrDownloadContent = JSON.parse(await fs.readFile('__tests__/sample_sonarr_download.json', 'utf8'));
  });

  it('should respect upgrades.', async done => {
    sonarrDownloadContent.isUpgrade = true;
    const translatedShow = translateShow(sonarrDownloadContent);

    expect(translatedShow.embeds[0]).toHaveProperty('description', 'Episode(s) upgraded');
    done();
  });
});
