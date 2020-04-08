const {translateShow, translateMovie} = require('../translator');
const fs = require('fs');

test('Radarr Grab parsed correctly', () => {
    const contents = JSON.parse(fs.readFileSync('__tests__/sample_radarr_grab.json', 'utf8'));
    const translatedMovie = translateMovie(contents);
    expect(translatedMovie).toBeTruthy();

    // Avatar
    expect(translatedMovie).toHaveProperty('avatar_url', 'https://undefined.herokuapp.com/radarr-icon.png');

    // Embeds
    expect(translatedMovie).toHaveProperty('embeds');
    expect(translatedMovie.embeds).toHaveLength(1);
    const embed = translatedMovie.embeds[0];

    // Title
    expect(embed).toHaveProperty('title', 'Finding Nemo (2003)');

    // Description
    expect(embed).toHaveProperty('description', 'Movie added');

    // Footer
    expect(embed).not.toHaveProperty('footer');
});
