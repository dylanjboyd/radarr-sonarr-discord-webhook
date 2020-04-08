const responseUsername = 'Plex';
const appUrl = `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`;

const translateMovie = payload => translate(`${payload.movie.title} (${payload.remoteMovie.year})`, 'Movie added', null, null, `${appUrl}/radarr-icon.png`);

const translateShow = payload => translate(`${payload.series.title} (S${payload.episodes[0].seasonNumber.toString().padStart(2, '0')}E${payload.episodes[0].episodeNumber.toString().padStart(2, '0')})${payload.episodes.length > 1 ? '+' + (payload.episodes.length - 1) + 'others' : ''}`, 'Episode(s) added', null, null, `${appUrl}/sonarr-icon.png`);

const translate = (title, description, footer, imageUrl, avatarUrl) => {

    const result = {
        "content": '',
        "username": responseUsername,
        "avatar_url": avatarUrl,
        "embeds": [
            {
                "title": title,
                "description": description,
                "thumbnail": imageUrl ? {
                    "url": imageUrl,
                    "height": 200,
                    "width": '200'
                } : undefined
            }
        ]
    };

    if (footer) result.footer = {
        "text": `Movie added`,
    };

    return (result);
};

module.exports = {translateMovie, translateShow};