module.exports = {
  name: 'Telegram',
  is_configured: process.env.telegram_token && process.env.telegram_username ? true : false,
  is_hub: true,
  instance: null,
  bot: function (message_received_callback, services) {
    const allowed_username = process.env.telegram_username;
    const TelegramBot = require('node-telegram-bot-api');

    // replace the value below with the Telegram token you receive from @BotFather
	// or better yet, use the environment variables and or the chex.bat script
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
      if (msg.chat.username != allowed_username) {
        client.sendMessage(msg.chat.id, "START: Not an allowed user.");
        return;
      }
      chatId = msg.chat.id;
      console.log(`Chat ID ${chatId} recorded. Starting to listen`);
	    client.sendMessage(msg.chat.id, "START: Started listening.");
    });

    client.onText(/\/stop$/, (msg, match) => {
      if (msg.chat.username != allowed_username) {
        client.sendMessage(msg.chat.id, "STOP: Not an allowed user.");
        return;
      }
      chatId = undefined;
      console.log(`Stop listenning`);
	    client.sendMessage(msg.chat.id, "STOP: Stopped listening.");
    });

    // Listen for any kind of message. There are different kinds of
    // messages.
    client.on('message', (msg) => {
      if (msg.chat.username != allowed_username) {
        client.sendMessage(msg.chat.id, "I don't know you, please go away.");
        return;
      }
      if (chatId === undefined || msg.text == '/stop')
        return;
      //chatId = msg.chat.id;

      // send a message to the chat acknowledging receipt of their message
      //client.sendMessage(chatId, 'Received your message');

      const data = extract_service(msg);

      invoke_callback(this, message_received_callback, msg.text, services, data);
    });

    const service_regex = new RegExp(/^(\w+) >( (\w+):)?/);
    const extract_service = (msg) => {
      const replied_message = msg.reply_to_message 
        ? msg.reply_to_message.text 
        : null;
      const regex_result = service_regex.exec(replied_message);
      return {
        service_name:(regex_result || [])[1],
        reply_to:(regex_result || [])[3]
      };
    }

    const invoke_callback = (service, message_received_callback, message, services, data) => {
      if (message_received_callback)
        message_received_callback(service, message, services, data);
    }

    this.send_message = (message) => {
      if (chatId === undefined)
        return;
      client.sendMessage(chatId, message);
      console.log(`${this.name} > Message sent!`);
    }

    return this;
  }
}