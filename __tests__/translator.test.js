const {translateShow, translateMovie} = require('../translator');
const fs = require('fs');

test('Radarr Grab parsed correctly', () => {
    const translatedMovie = translateMovie(JSON.parse(fs.readFileSync('__tests__/sample_radarr_grab.json', 'utf8')));
    expect(translatedMovie).toBeTruthy();

    // Username
    expect(translatedMovie).toHaveProperty('username', 'Radarr');

    // Avatar
    expect(translatedMovie).toHaveProperty('avatar_url', 'https://undefined.herokuapp.com/radarr-icon.png');

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