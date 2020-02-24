const telegram = require("./telegram-bot.js");
const mixer = require("./mixer-bot.js");
const twitch = require("./twitch-bot.js");

let telegram_bot = telegram.bot();
let mixer_bot = process.env.mixer_token ? mixer.bot() : null;
let twitch_bot = process.env.twitch_token ? twitch.bot() : null;

const telegram_message_received = function(message) {
    console.log('Telegram > Message received!');
    mixer_bot.send_message(message);
    twitch_bot.send_message(message);
}

const mixer_message_received = function(message) {
    console.log('Mixer > Message received!');
    telegram_bot.send_message(message);
}

const twitch_message_received = function(message) {
    console.log('Twitch > Message received!');
    telegram_bot.send_message(message);
}

telegram_bot.message_received_callback = telegram_message_received;
mixer_bot?.message_received_callback = mixer_message_received;
twitch_bot?.message_received_callback = twitch_message_received;

console.log("Telegram > ", telegram_bot, "Mixer > ", mixer_bot, "Twitch > ", twitch_bot);