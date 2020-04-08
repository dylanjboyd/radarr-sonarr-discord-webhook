const express = require('express')
    , request = require('request')
    , multer = require('multer')
    , redis = require('redis')
    //, lwip = require('lwip')
    , jimp = require('jimp')
    , sha1 = require('sha1')
    , freegeoip = require('node-freegeoip'),
    translator = require('./translator');

const discordUrl = `https://discordapp.com/api/webhooks/${process.env.DISCORD_WEBHOOK_KEY}`;
const apiKey = process.env.API_KEY;
// const redisClient = redis.createClient(process.env.REDISCLOUD_URL, {return_buffers: true});
// const upload = multer({storage: multer.memoryStorage()});
const app = express();

app.use(express.static('images'));
app.use(express.json());

function notifyDiscord(payload, mediaType) {
    const discordPayloadFunc = mediaType === 'movie' ? translator.translateMovie : translator.translateShow;

    request.post({
            url: discordUrl,
            json: discordPayloadFunc(payload)
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);
            } else {
                console.error(`Failed to POST to Discord: ${error}`);
            }
        }
    );
}

app.post('/radarr/:apiKey', function (req, res, next) {
    if (req.params.apiKey !== apiKey) return res.sendStatus(204);
    if (req.body.eventType === 'Grab') notifyDiscord(req.body, 'movie'); // One of Grab, Download, Rename, Test
    res.sendStatus(204);
});

app.post('/sonarr/:apiKey', function (req, res, next) {
    if (req.params.apiKey !== apiKey) return res.sendStatus(204);
    if (req.body.eventType === 'Grab') notifyDiscord(req.body, 'show'); // One of Grab, Download, Rename, Test
    res.sendStatus(204);
});

app.listen(process.env.PORT || 11000);
