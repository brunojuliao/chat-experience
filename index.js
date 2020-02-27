const telegram = require("./telegram-bot.js");
const mixer = require("./mixer-bot.js");
const twitch = require("./twitch-bot.js");

const services = [
    telegram,
    mixer,
    twitch,
];

const regular_message_handler = function(service, message, services) {
    console.log(`${service.name}: Message received!`);
    services.forEach(s => {
        if (s) s.send_message(message);
    });
};

const is_specific_service_reply = function(message, services, data) {
    if (!data.service_name) return false;

    let target_service = services.filter(s => s.name == data.service_name)[0];
    if (target_service && target_service.instance)
        target_service.instance.send_message(`@${data.reply_to}: ${message}`);
    else
        console.log(`Service name "${data.service_name}" not found`);

    return true;
};

const hub_message_handler = function(service, message, services, target_service_name) {
    console.log(`${service.name}: Message received!`);
    
    if (is_specific_service_reply(message, services, target_service_name))
        return;

    services.forEach(s => {
        if (s && s.instance) s.instance.send_message(message);
    });
};

let service_mapping = {};
service_mapping[telegram.name] = [mixer, twitch];
service_mapping[mixer.name] = [telegram];
service_mapping[twitch.name] = [telegram];

const message_handler_factory = (service) =>
    service.is_hub 
        ? hub_message_handler 
        : regular_message_handler;

const bot_factory = (service) =>
    service.is_configured
        ? service.bot(message_handler_factory(service), service_mapping[service.name]) 
        : null;

services.forEach(s => s.instance = bot_factory(s));

// This is for debugging only.
for (const s of services) {
    console.log(`${s.name} > `, s.instance);
}