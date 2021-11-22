## Mail Watchman
Automatically run a script whenever new mails arrive in your inbox

## Installation
- After cloning, `cd` into application directory and run `npm install` to install dependencies
- Copy environment variables from .env.example `cp .env.example .env` and fill them appropriately
- Run `npm start` to start the application. You might want to use [PM2](https://pm2.keymetrics.io/) 
or [Forever](https://github.com/foreversd/forever) to keep it running as a background process.
