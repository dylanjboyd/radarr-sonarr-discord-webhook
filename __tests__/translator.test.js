const {translateShow, translateMovie} = require('../translator');
const fs = require('fs');

test('Radarr Grab parsed correctly', () => {
    const contents = JSON.parse(fs.readFileSync('__tests__/sample_radarr_grab.json', 'utf8'));
    const translatedMovie = translateMovie(contents);
    expect(translatedMovie).toBeTruthy();

    // Embeds
    expect(translatedMovie).toHaveProperty('embeds');
    expect(translatedMovie.embeds).toHaveLength(1);

    // Title
    expect(translatedMovie.embeds[0]).toHaveProperty('title', 'Finding Nemo (2003)');

    // Description
    expect(translatedMovie.embeds[0]).toHaveProperty('description', 'Movie added');

    // Footer
    expect(translatedMovie.embeds[0]).toHaveProperty('footer.text', 'Movie added');
});
