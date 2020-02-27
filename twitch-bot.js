module.exports = {
    name: 'Twitch',
    is_configured: process.env.twitch_token && process.env.twitch_channel && process.env.twitch_bot_username ? true : false,
    is_hub: false,
    instance: null,
    bot: function(message_received_callback, services) {
        this.send_message = () => {};
        const twitch_channel = process.env.twitch_channel;

        const TwitchBot = require('twitch-bot')
        
        const Bot = new TwitchBot({
			username: process.env.twitch_bot_username,
			oauth: process.env.twitch_token,
			channels: [process.env.twitch_channel]
        })
        
        Bot.on('join', channel => {
            invoke_callback(this, message_received_callback, `${this.name} > Join: ${channel}`, services);

            Bot.say('Bot started!', channel);
        })
        
        Bot.on('error', err => {
            invoke_callback(this, message_received_callback, `${this.name} > Error: ${err.message}`, services);
        })
        
        Bot.on('message', chatter => {
            invoke_callback(this, message_received_callback, `${this.name} > ${chatter.username}: ${chatter.message}`, services);
        })

        this.send_message = (message) => {
			Bot.say(message, twitch_channel);
            console.log(`${this.name} > Message sent!`);
        }

        const invoke_callback = (service, message_received_callback, message, services) => {
            if (message_received_callback)
                message_received_callback(service, message, services);
        }

        return this;
    }
}