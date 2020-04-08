# Radarr/Sonarr Discord Webhook integration

[![Build Status](https://travis-ci.com/dylanjboyd/radarr-sonarr-discord-webhook.svg?branch=master)](https://travis-ci.com/dylanjboyd/radarr-sonarr-discord-webhook)
![Heroku](https://pyheroku-badge.herokuapp.com/?app=radarr-sonarr-discord-webhook)

This small Node.JS app is based on the [plex-discord-webhook](https://github.com/Floydan/plex-discord-webhook) library created by Floydan [webhooks-slack](https://github.com/plexinc/webhooks-slack), which is in turn based on the library created by plexinc.

In order to run this app:
 
- Install [node.js](https://nodejs.org/en/).
- Clone the repository.
- Install dependencies using `npm install`.
- Make a new app at Heroku.
- Add an `API_KEY` config variable to your Heroku app, which will be used to secure exposed endpoints. This should be able to be of any format or length.
- Make a Discord webhook and note the URL, add the last part after /webhooks/ as a config var named `DISCORD_WEBHOOK_KEY`. e.g. `279401144396748544/gPy8loljUVY3MzsvIvFd9o7tllolp8SWavdwi0JwCpphKGLdadlsE8Dv4hlolhkd0hFA`
- Deploy to Heroku.
- Have any Radarr or Sonarr instance (that you wish to contribute to your desired Discord channel) add a webhook to the `/radarr/` or `/sonarr` URL (respectively). 
  - You'll find this setting in `Settings` > `Connect` > `+` > `Webhook`