const responseUsername = 'Plex';
const appUrl = `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`;

const translateMovie = payload => translate(`${payload.movie.title} (${payload.remoteMovie.year})`, 'Movie added', 'Movie added', null);

const translateShow = payload => translate(`${payload.series.title} (S${payload.episodes[0].seasonNumber.toString().padStart(2, '0')}E${payload.episodes[0].episodeNumber.toString().padStart(2, '0')})${payload.episodes.length > 1 ? '+' + (payload.episodes.length - 1) + 'others' : ''}`, 'Episode(s) added', 'Episode(s) added', null);

const translate = (title, description, footer, imageUrl) => ({
    "content": '',
    "username": responseUsername,
    "avatar_url": appUrl + '/plex-icon.png',
    "embeds": [
        {
            "title": title,
            "description": description,
            "footer": footer ? {
                "text": `Movie added`,
            } : undefined,
            "thumbnail": imageUrl ? {
                "url": imageUrl,
                "height": 200,
                "width": '200'
            } : undefined
        }
    ]
});

module.exports = {translateMovie, translateShow};