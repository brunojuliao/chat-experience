# chat-experience
Real life conversaton:

**_friend_** - "hey, when streaming on Mixer, I don't like having to either configure to show chat on the side (that takes space) or use the mixer app to keep an eye on chat"

**_me_** - "Ok... What would enhance your experience then?"

**_friend_** - "Maybe if the chat was redirected to my telegram and I could reply from there... I think that would work better for me"

**_me_** - "Ok... I think I can get it done using pieces from other bots"

That's it. That's why this project started.

In its current version, it supports only Mixer and Telegram. Only because that was his main request though. I plan to add Twitch in the loop. Stay tuned :)

# Requirements
- A Telegram token - Steps (Mandatory):
  - On Telegram, starts a conversation with @BotFather
  - /newbot
  - Pick a name for your bot (Can have spaces. e.g.: John Doe)
  - Pick a username for your bot. It must end in 'bot' (Don't add the @. Just the username. e.g.: john_doe_bot)
  - Now you receive either a success message with your toke (save it somewhere safe for now) or a fail message telling you why it failed
- A Mixer token - Steps (Optional):
  - Log in Mixer from your browser
  - Click [here](https://dev.mixer.com/guides/chat/chatbot) (right-click and ask to open in new tab)
  - Look for 'Click here to get your Token!'
  - Click and copy your token to somewhere safe (for now)
- A Twitch OAuth token - Steps (Optional):
  - Go to https://dev.twitch.tv/console
  - Authenticate/authorize
  - Create an app
    - Click "Register your application"
    - Pick a name
    - As "OAuth Redirect URLs" use http://localhost
    - Pick "Chat Bot" as category
    - Click create :)
    - Copy your "Client ID" to somewhere safe
    - Now, in order to create the OAuth token, we need:
      - Grabe this URL and replace the <your client ID> with your Client ID (I've already replaced the URL to localhost, type to token and scope to chat:edit chat:read so we can read and send messages): https://id.twitch.tv/oauth2/authorize?client_id=<your client ID>&redirect_uri=http%3A%2F%2Flocalhos&response_type=token&scope=chat%3Aedit%20chat%3Aread
      - Paste the replaced URL into your browser. This will start the authorization workflow. It will end by redirecting you to localhost. As you have no application listening, you will see a browser error page. Grab the #access_token content (#access_token=[content]&scope=)
      - Now, to form the token, just prepend "oauth:" to the content retrieved previously. That is your Twitch Token ;)
      - Reference: https://dev.twitch.tv/docs/authentication/getting-tokens-oauth
  
Not done yet... :)

We need few environment variables. If you know what I mean, their names are: mixer_token, telegram_token, telegram_username, twitch_bot_username, twitch_token, twitch_channel.

If you have no idea, no problem. Most likely you are a Windows User, so I will describe how to set it on Windows (let me know if need others):

- Open cmd.exe
  - Run: setx mixer_token [telegram token]
  - Run: setx telegram_token [telegram token]
  - Run: setx telegram_username [telegram username]
  - Run: setx twitch_bot_username [twitch bot username]
  - Run: setx twitch_token [twitch token]
  - Run: setx twitch_channel [twitch channel]

- Optional steps still in cmd.exe
  - Run: set mixer_token [mixer token]
  - Run: set telegram_token [telegram token]
  - Run: set telegram_username [telegram username]
  - Run: set twitch_bot_username [twitch bot username]
  - Run: set twitch_token [twitch token]
  - Run: set twitch_channel [twitch channel]

__Why the set commands seems duplicated?__

_The "set" command will set the env var for the current session only. The "setx" command will set the env var system wide. You can run only setx though. The "set" suggestions is in the case of you using that same session to run the program._

__Cool. Although, I'm not a programmer. How can I run it?__

_In this case you can download a compiled version [here](http://tiny.cc/d24bkz) (right-click and ask to open in new tab). You can't scape the cmd.exe steps though. Those are important._

__Will anyone in Telegram be able to use "my bot"? I mean, read my channel's chat history and also send messages?__

_No. It was built to answer commands only from the configured "telegram_username". Everyone else will be able to find your bot and send messages to it, but they will get as reply "Private bot"._
