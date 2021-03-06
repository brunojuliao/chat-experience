module.exports = {
  name: 'Telegram',
  is_configured: process.env.telegram_token && process.env.telegram_username ? true : false,
  is_hub: true,
  instance: null,
  bot: function (message_received_callback, services, hub_start_callback, hub_stop_callback) {
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
      chatId = msg.chat.id;
      if (msg.chat.username != allowed_username) {
        client.sendMessage(chatId, "START: Not an allowed user.");
        return;
      }
      console.log(`Start listenning`);

      client.sendMessage(chatId, 'START: Started listening.');
      
      //This callback will trigger the bots instantiation (start)
      if (hub_start_callback) hub_start_callback(this, services);
      
      let check_count = 0;
      const check_services = () => {
        check_count++;
        if (check_count > 10 || services.filter(s => s.is_configured && s.is_running).length == services.length) {
          clearInterval(interval);
          client.sendMessage(chatId, `${services.map(s => `${s.name}: ${s.is_configured ? "configured" : "NOT configured"}, ${s.is_running ? "running" : "NOT running (check config data and/or logs)"}`).join('\n')}`);
        }
      }
      let interval = setInterval(check_services, 500);
    });

    client.onText(/\/stop$/, (msg, match) => {
      if (msg.chat.username != allowed_username) {
        client.sendMessage(msg.chat.id, "STOP: Not an allowed user.");
        return;
      }
      chatId = undefined;
      console.log(`Stop listenning`);
      client.sendMessage(msg.chat.id, "STOP: Stopped listening.");
      
      if (hub_stop_callback)
        hub_stop_callback(this, services);
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