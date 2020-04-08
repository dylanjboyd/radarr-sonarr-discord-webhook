const appUrl = `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`;
const showAvatarUrl = `${appUrl}/sonarr-icon.png`;
const movieAvatarUrl = `${appUrl}/radarr-icon.png`;

const eventTypeVerbDict = {
  Download: 'downloaded',
  Grab: 'grabbed',
  Rename: 'rename',
  Test: 'tested'
};

const translateToDiscord = bundle => {
  const result = {
    content: '',
    username: bundle.username,
    avatar_url: bundle.avatarUrl,
    embeds: [
      {
        title: bundle.title,
        description: bundle.description,
        thumbnail: bundle.imageUrl ? {
          url: bundle.imageUrl,
          height: 200,
          width: '200'
        } : null
      }
    ]
  };

  if (bundle.footer) {
    result.footer = {text: bundle.footer};
  }

  return (result);
};

const getMovieTitle = payload => (payload.movie && payload.remoteMovie)
  ? `${payload.movie.title} (${payload.remoteMovie.year})`
  : 'Generic notification';

const getShowTitle = payload => {
  const title = payload.series.title;

  const season = payload.episodes[0].seasonNumber.toString().padStart(2, '0');
  const episode = payload.episodes[0].episodeNumber.toString().padStart(2, '0');
  const othersText = payload.episodes.length > 1
    ? '+' + (payload.episodes.length - 1) + 'others'
    : '';

  return (payload.series && payload.episodes)
    ? `${title} (S${season}E${episode})${othersText}`
    : 'Generic notification';
};

const translateMovie = payload => translateToDiscord({
  username: 'Radarr',
  avatarUrl: movieAvatarUrl,
  title: getMovieTitle(payload),
  description: `Movie ${eventTypeVerbDict[payload.eventType]}`
});

const translateShow = payload => translateToDiscord({
  username: 'Sonarr',
  avatarUrl: showAvatarUrl,
  title: getShowTitle(payload),
  description: `Episode(s) ${eventTypeVerbDict[payload.eventType]}`
});


module.exports = {translateMovie, translateShow};
