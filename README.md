# Radarr/Sonarr Discord Webhook integration

![Build Status](https://travis-ci.com/dylanjboyd/radarr-sonarr-discord-webhook.svg?branch=master)
[![License](https://img.shields.io/:license-mit-blue.svg)](https://badges.mit-license.org)
[![codecov](https://codecov.io/gh/dylanjboyd/radarr-sonarr-discord-webhook/branch/master/graph/badge.svg)](https://codecov.io/gh/dylanjboyd/radarr-sonarr-discord-webhook)

This small Node.JS app is based on the [plex-discord-webhook](https://github.com/Floydan/plex-discord-webhook) library created by Floydan, which is in turn based on the library [webhooks-slack](https://github.com/plexinc/webhooks-slack) created by plexinc.

## Quickstart
 
- Install [node.js](https://nodejs.org/en/).
- Clone the repository.
- Install dependencies using `npm install`.
- Make a new app at Heroku.
- Add an `API_KEY` config variable to your Heroku app, which will be used to secure exposed endpoints. This should be able to be of any format or length.
- Depending on events you'd like to be notified about, add the ON_DOWNLOAD, ON_GRAB, ON_RENAME, and ON_TEST environment variables to your Heroku app (with a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value such as 1).
- Make a Discord webhook and note the URL, add the last part after /webhooks/ as a config var named `DISCORD_WEBHOOK_KEY`. e.g. `279401144396748544/gPy8loljUVY3MzsvIvFd9o7tllolp8SWavdwi0JwCpphKGLdadlsE8Dv4hlolhkd0hFA`
- Deploy to Heroku.
- Have any Radarr or Sonarr instance (that you wish to contribute to your desired Discord channel) add a webhook to the `/radarr/` or `/sonarr` URL (respectively). 
  - You'll find this setting in `Settings` > `Connect` > `+` > `Webhook`