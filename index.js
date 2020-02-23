const mixer = require("./mixer-bot.js");
const telegram = require("./telegram-bot.js");
const twitch = require("./twitch-bot.js");

let mixer_bot = mixer.bot();
let telegram_bot = telegram.bot();
let twitch_bot = twitch.bot();

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

mixer_bot.message_received_callback = mixer_message_received;
telegram_bot.message_received_callback = telegram_message_received;
twitch_bot.message_received_callback = twitch_message_received;
console.log(mixer_bot, telegram_bot, twitch_bot);