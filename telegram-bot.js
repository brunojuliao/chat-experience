module.exports = {
  bot: function () {
    this.message_received_callback = function(){};
    const allowed_username = process.env.telegram_username.toLowerCase();
    const TelegramBot = require('node-telegram-bot-api');

    // replace the value below with the Telegram token you receive from @BotFather
    const token = process.env.telegram_token;

    // Create a bot that uses 'polling' to fetch new updates
    const client = new TelegramBot(token, { polling: true });

    // Matches "/echo [whatever]"
    //client.onText(/\/echo (.+)/, (msg, match) => {
    //  // 'msg' is the received Message from Telegram
    //  // 'match' is the result of executing the regexp above on the text content
    //  // of the message
    //
    //  const chatId = msg.chat.id;
    //  const resp = match[1]; // the captured "whatever"
    //
    //  // send back the matched "whatever" to the chat
    //  client.sendMessage(chatId, resp);
    //});

    let chatId;
    client.onText(/\/start$/, (msg, match) => {
      if (msg.chat.username.toLowerCase() != allowed_username) {
        client.sendMessage(msg.chat.id, "Private bot.");
        return;
      }
      chatId = msg.chat.id;
      console.log(`Chat ID ${chatId} recorded. Starting to listen`);
    });

    client.onText(/\/stop$/, (msg, match) => {
      if (msg.chat.username != allowed_username) {
        client.sendMessage(msg.chat.id, "Private bot.");
        return;
      }
      chatId = undefined;
      console.log(`Stop listenning`);
    });

    // Listen for any kind of message. There are different kinds of
    // messages.
    client.on('message', (msg) => {
      if (msg.chat.username != allowed_username) {
        client.sendMessage(msg.chat.id, "Private bot.");
        return;
      }
      if (chatId === undefined || msg.text == '/stop')
        return;
      //chatId = msg.chat.id;

      // send a message to the chat acknowledging receipt of their message
      //client.sendMessage(chatId, 'Received your message');

      invoke_callback(this.message_received_callback, msg.text)
    });

    function invoke_callback(message_received_callback, message) {
      if (message_received_callback)
        message_received_callback(message);
    }

    this.send_message = function (message) {
      if (chatId === undefined)
        return;
      client.sendMessage(chatId, message);
      console.log('Telegram > Message sent!');
    }

    return this;
  }
}