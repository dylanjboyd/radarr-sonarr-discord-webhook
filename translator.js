const appUrl = `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`;
const showAvatarUrl = `${appUrl}/sonarr-icon.png`;
const movieAvatarUrl = `${appUrl}/radarr-icon.png`;

const getMovieTitle = payload => `${payload.movie.title} (${payload.remoteMovie.year})`;

const getShowTitle = payload => `${payload.series.title} (S${payload.episodes[0].seasonNumber.toString().padStart(2, '0')}E${payload.episodes[0].episodeNumber.toString().padStart(2, '0')})${payload.episodes.length > 1 ? '+' + (payload.episodes.length - 1) + 'others' : ''}`;

const translateMovie = payload => translate(getMovieTitle(payload), 'Movie added', null, null, movieAvatarUrl, 'Radarr');

const translateShow = payload => translate(getShowTitle(payload), 'Episode(s) added', null, null, showAvatarUrl, 'Sonarr');

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