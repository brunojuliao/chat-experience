module.exports = {
    bot: function() {
        this.message_received_callback = function(){}
        this.send_message = function () {}
        const twitch_channel = process.env.twitch_channel;

        const TwitchBot = require('twitch-bot')
        
        const Bot = new TwitchBot({
        username: process.env.twitch_bot_username,
        oauth: process.env.twitch_token,
        channels: [process.env.twitch_channel]
        })
        
        Bot.on('join', channel => {
            invoke_callback(this.message_received_callback, `Twitch > Join: ${channel}`);
        })
        
        Bot.on('error', err => {
            invoke_callback(this.message_received_callback, `Twitch > Error: ${err.message}`);
        })
        
        Bot.on('message', chatter => {
            invoke_callback(this.message_received_callback, `Twitch > ${chatter.username}: ${chatter.message}`);
        })

        this.send_message = function (message) {
            Bot.say(message, this.twitch_channel);
            console.log('Twitch > Message sent!');
        }

        function invoke_callback(message_received_callback, message) {
            if (message_received_callback)
                message_received_callback(message);
        }

        return this;
    }
}