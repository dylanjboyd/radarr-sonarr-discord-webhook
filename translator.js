const appUrl = `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`;
const showAvatarUrl = `${appUrl}/sonarr-icon.png`;
const movieAvatarUrl = `${appUrl}/radarr-icon.png`;

const eventTypeVerbDict = {
    'Download': 'downloaded',
    'Grab': 'grabbed',
    'Rename': 'rename',
    'Test': 'tested'
};

const getMovieTitle = payload => (payload.movie && payload.remoteMovie) ? `${payload.movie.title} (${payload.remoteMovie.year})` : 'Generic notification';

const getShowTitle = payload => (payload.series && payload.episodes) ? `${payload.series.title} (S${payload.episodes[0].seasonNumber.toString().padStart(2, '0')}E${payload.episodes[0].episodeNumber.toString().padStart(2, '0')})${payload.episodes.length > 1 ? '+' + (payload.episodes.length - 1) + 'others' : ''}` : 'Generic notification';

const translateMovie = payload => translate(getMovieTitle(payload), `Movie ${eventTypeVerbDict[payload.eventType]}`, null, null, movieAvatarUrl, 'Radarr');

const translateShow = payload => translate(getShowTitle(payload), `Episode(s) ${eventTypeVerbDict[payload.eventType]}`, null, null, showAvatarUrl, 'Sonarr');

const translate = (title, description, footer, imageUrl, avatarUrl, username) => {

    const result = {
        "content": '',
        "username": username,
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
        "text": footer
    };

    return (result);
};

module.exports = {translateMovie, translateShow};