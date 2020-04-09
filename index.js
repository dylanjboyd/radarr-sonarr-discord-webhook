/* eslint-disable no-process-env */
'use strict';

const express = require('express');
const request = require('request');
const translator = require('./translator');

const discordUrl = `https://discordapp.com/api/webhooks/\
${process.env.DISCORD_WEBHOOK_KEY}`;
const apiKey = process.env.API_KEY;

const getEnabledEventTypes = () => ({
  Grab: process.env.ON_GRAB,
  Download: process.env.ON_DOWNLOAD,
  Rename: process.env.ON_RENAME,
  Test: process.env.ON_TEST
});

const app = express();

app.use(express.static('images'));
app.use(express.json());

const notifyDiscord = (payload, mediaType) => {
  const discordPayloadFunc = mediaType === 'movie' ?
    translator.translateMovie :
    translator.translateShow;

  request.post({
    url: discordUrl,
    json: discordPayloadFunc(payload)
  });
};

const handleEventPost = (req, res, mediaType) => {
  const eventTypeDict = getEnabledEventTypes();

  if (req.params.apiKey !== apiKey) {
    return res.sendStatus(204);
  }

  // One of Grab, Download, Rename, Test
  if (eventTypeDict[req.body.eventType]) {
    notifyDiscord(req.body, mediaType);
  }

  return res.sendStatus(204);
};

app.post('/radarr/:apiKey', (req, res) => handleEventPost(req, res, 'movie'));

app.post('/sonarr/:apiKey', (req, res) => handleEventPost(req, res, 'show'));

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 11000);
}

module.exports = app;
