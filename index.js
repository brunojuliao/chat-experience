const mixer = require("./mixer-bot.js");
const telegram = require("./telegram-bot.js");

const mixer_message_received = function(message) {
    console.log(`Mixer - Message received: ${message}`)
}

const telegram_message_received = function(message) {
    console.log(`Telegram - Message received: ${message}`)
}

const mixer_bot = mixer.bot(mixer_message_received);
const telegram_bot = telegram.bot(telegram_message_received);
console.log(mixer_bot, telegram_bot);