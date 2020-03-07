module.exports = {
    name: 'YouTube',
    is_configured: process.env.youtube_token && process.env.youtube_channel ? true : false,
    is_hub: false,
    is_running: false,
    instance: null,
    bot: function (message_received_callback, services) {
        this.send_message = (message) => { };
        this.close = () => { };

        const YouTube = require('youtube-live-chat');

        const token = process.env.youtube_token;
        const channel_id = process.env.youtube_channel;

        const yt = new YouTube(channel_id, token);

        yt.on('ready', () => {
            this.is_running = true;
            //console.log('ready!')
            yt.listen(1000)
        })

        yt.on('message', data => {
            invoke_callback(this, message_received_callback, `${this.name} > ${data.authorDetails.displayName}: ${data.snippet.displayMessage}`, services)
        })

        yt.on('error', error => {
            console.error(error)
            invoke_callback(this, message_received_callback, `${this.name} > error: ${error}`, services)
        })

        this.close = () => yt.stop();

        const invoke_callback = (service, message_received_callback, message, services) => {
            if (message_received_callback)
                message_received_callback(service, message, services);
        }

        return this;
    }
}