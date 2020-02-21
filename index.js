const mixer = require("./mixer-bot.js");
const telegram = require("./telegram-bot.js");

let mixer_bot = mixer.bot();
let telegram_bot = telegram.bot();

const telegram_message_received = function(message) {
    console.log(`Telegram - Message received: ${message}`);
    mixer_bot.send_message(message);
}

const mixer_message_received = function(message) {
    console.log(`Mixer - Message received: ${message}`)
    telegram_bot.send_message(message);
}


mixer_bot.message_received_callback = mixer_message_received;
telegram_bot.message_received_callback = telegram_message_received;
console.log(mixer_bot, telegram_bot);