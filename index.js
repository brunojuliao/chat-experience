const telegram = require("./telegram-bot.js");
//const mixer = require("./mixer-bot.js");
const twitch = require("./twitch-bot.js");
const youtube = require("./youtube-bot.js");

const services = [
    telegram,
//    mixer,
    twitch,
    youtube,
];

const regular_message_handler = (service, message, services) => {
    console.log(`${service.name}: Message received!`);
    services.forEach(s => {
        try {
            if (s) s.send_message(message);
        } catch (e) {
            console.log(e);
        }
    });
};

const is_specific_service_reply = (message, services, data) => {
    if (!data.service_name) return false;

    let target_service = services.filter(s => s.name == data.service_name)[0];
    if (target_service && target_service.instance)
        target_service.instance.send_message(`@${data.reply_to}: ${message}`);
    else
        console.log(`Service name "${data.service_name}" not found`);

    return true;
};

const hub_message_handler = (service, message, services, target_service_name) => {
    console.log(`${service.name}: Message received!`);

    if (is_specific_service_reply(message, services, target_service_name))
        return;

    services.forEach(s => {
        try {
            if (s.is_running) s.instance.send_message(message);
        } catch (e) {
            console.log(e);
        }
    });
};

const hub_start_handler = (hub, services) => {
    services.forEach(s => {
        try {
            if (!s.is_configured || s.is_running) return;
            s.instance = bot_factory(s);
        } catch (e) {
            console.log(e);
        }
    });
};

const hub_stop_handler = (hub, services) => {
    services.forEach(s => {
        try {
            if (!s.is_running) return;
            s.instance.send_message('Bot stopped!');
            s.instance.close();
            s.instance = null;
            s.is_running = false;
        } catch (e) {
            console.log(e);
        }
    });
};

let service_mapping = {};
service_mapping[telegram.name] = [twitch, youtube]; //[mixer, twitch, youtube];
//service_mapping[mixer.name] = [telegram];
service_mapping[twitch.name] = [telegram];
service_mapping[youtube.name] = [telegram];


const bot_factory = (service) => {
    if (!service.is_configured) return null;

    if (service.is_hub)
        return service.bot(hub_message_handler, service_mapping[service.name], hub_start_handler, hub_stop_handler);
    else
        return service.bot(regular_message_handler, service_mapping[service.name]);
}

services.forEach(s => {
    try {
        if (!s.is_hub) return;
        s.instance = bot_factory(s);
    } catch (e) {
        console.log(e);
    }
});

// This is for debugging only.
services.forEach(s => console.log(`${s.name} > `, s.instance));