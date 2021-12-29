# slack-avatar
My [Slack](https://slack.com) avatar, animated by a [Markov process](https://en.wikipedia.org/wiki/Markov_chain).

![avatar](example.gif)

## Development
Observe avatar state transitions by running `npm start dev` (python3 is required), and navigating to `http://localhost:8000/prototype.html`.

## Setup
1. Set `SLACK_TOKEN` environment variable to the **User OAuth Token** generated for your workspace installed app (Under *OAuth & Permissions* section in your app configuration page, [https://api.slack.com/apps](https://api.slack.com/apps)).
    - Ensure `users.profile:write` scope is added to **User Token Scopes** to allow for editing your profile photo. 


2. Set `STATE_FILE` to the filename where the current avatar state will be stored between runs.

## Running
- Run `npm start` or `node .` to update the avatar once.
- Run `npm run start:local` to continuously update the avatar every 15 seconds.

## License
MIT
