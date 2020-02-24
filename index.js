const telegram = require("./telegram-bot.js");
const mixer = require("./mixer-bot.js");
const twitch = require("./twitch-bot.js");

let telegram_bot = telegram.bot();
let mixer_bot = process.env.mixer_token ? mixer.bot() : null;
let twitch_bot = process.env.twitch_token ? twitch.bot() : null;

// Receive from Telegram, send to streaming services.
const telegram_message_received = function(message) {
    console.log('Telegram: Message received!');
	if (mixer_bot) mixer_bot.send_message(message);
	if (twitch_bot) twitch_bot.send_message(message);
}

// Receive from Mixer, send to Telegram.
const mixer_message_received = function(message) {
    console.log('Mixer: Message received!');
    telegram_bot.send_message(message);
}

// Receive from Twitch, send to Telegram.
const twitch_message_received = function(message) {
    console.log('Twitch: Message received!');
    telegram_bot.send_message(message);
}

telegram_bot.message_received_callback = telegram_message_received;
if (mixer_bot)
    mixer_bot.message_received_callback = mixer_message_received;
if (twitch_bot)
    twitch_bot.message_received_callback = twitch_message_received;

// This is for debugging only.
console.log("Telegram > ", telegram_bot);
console.log("Mixer > ", mixer_bot);
console.log("Twitch > ", twitch_bot);
