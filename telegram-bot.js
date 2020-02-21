module.exports = {
  bot: function(message_received_callback) {
    const TelegramBot = require('node-telegram-bot-api');

    // replace the value below with the Telegram token you receive from @BotFather
    const token = process.env.telegram_token;

    // Create a bot that uses 'polling' to fetch new updates
    const client = new TelegramBot(token, {polling: true});

    // Matches "/echo [whatever]"
    client.onText(/\/echo (.+)/, (msg, match) => {
      // 'msg' is the received Message from Telegram
      // 'match' is the result of executing the regexp above on the text content
      // of the message

      const chatId = msg.chat.id;
      const resp = match[1]; // the captured "whatever"

      // send back the matched "whatever" to the chat
      client.sendMessage(chatId, resp);
    });

    // Listen for any kind of message. There are different kinds of
    // messages.
    client.on('message', (msg) => {
      const chatId = msg.chat.id;
      
      // send a message to the chat acknowledging receipt of their message
      client.sendMessage(chatId, 'Received your message');

      if (message_received_callback)
        message_received_callback(msg.text);
    });

    this.send_message = function(message) {
      socket.call('msg', [message]);
      console.log('Telegram - Message sent!');
    }

    return this;
  }
}