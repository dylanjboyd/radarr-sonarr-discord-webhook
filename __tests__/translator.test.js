const {translateMovie} = require('../translator');
const fs = require('fs');

test('Radarr Grab parsed correctly', () => {
  const grabFilename = '__tests__/sample_radarr_grab.json';
  const fileContent = fs.readFileSync(grabFilename, 'utf8');
  const translatedMovie = translateMovie(JSON.parse(fileContent));

  expect(translatedMovie).toBeTruthy();

  // Username
  expect(translatedMovie).toHaveProperty('username', 'Radarr');

  // Avatar
  const iconUrl = 'https://undefined.herokuapp.com/radarr-icon.png';

  expect(translatedMovie).toHaveProperty('avatar_url', iconUrl);

  // Embeds
  expect(translatedMovie).toHaveProperty('embeds');
  expect(translatedMovie.embeds).toHaveLength(1);
  const embed = translatedMovie.embeds[0];

  // Title
  expect(embed).toHaveProperty('title', 'Finding Nemo (2003)');

  // Description
  expect(embed).toHaveProperty('description', 'Movie grabbed');

  // Footer
  expect(embed).not.toHaveProperty('footer');
});
