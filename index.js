'use strict';

require('dotenv').config();
const { MailListener } = require('mail-listener6');
const { mailConfig } = require('./config');
const { processMail, serverConnected, serverDisconnected, errorOccurred } = require('./lib/mailActions');


const mailListener = new MailListener(mailConfig);

mailListener.start(); // start listening
mailListener.on("server:connected", serverConnected);
mailListener.on("error", errorOccurred);
mailListener.on("mail", processMail);
mailListener.on("server:disconnected", serverDisconnected);
