# chat-experience
Real life conversaton:

**_friend_** - "hey, when streaming on Mixer, I don't like having to either configure to show chat on the side (that takes space) or use the mixer app to keep an eye on chat"

**_me_** - "Ok... What would enhance your experience then?"

**_friend_** - "Maybe if the chat was redirected to my telegram and I could reply from there... I think that would work better for me"

**_me_** - "Ok... I think I can get it done using pieces from other bots"

That's it. That's why this project started.

In its current version, it supports only Mixer and Telegram. Only because that was his main request though. I plan to add Twitch in the loop. Stay tuned :)

# Requirements
- A Mixer token - Steps:
  - Log in Mixer from your browser
  - Click [here](https://dev.mixer.com/guides/chat/chatbot) (right-click and ask to open in new tab)
  - Look for 'Click here to get your Token!'
  - Click and copy your token to somewhere safe (for now)
- A Telegram token - Steps:
  - On Telegram, starts a conversation with @BotFather
  - /newbot
  - Pick a name for your bot (Can have spaces. e.g.: John Doe)
  - Pick a username for your bot. It must end in 'bot' (Don't add the @. Just the username. e.g.: john_doe_bot)
  - Now you receive either a success message with your toke (save it somewhere safe for now) or a fail message telling you why it failed
  
Not done yet... :)

We need two environment variables. If you know what I mean, their names are: mixer_token and telegram_token .

If you have no idea, no problem. Most likely you are a Windows User, so I will describe how to set it on Windows (let me know if need others):

- Open cmd.exe
  - Run: setx mixer_token [telegram token]
  - Run: setx telegram_token [telegram token]

- Optional steps still in cmd.exe
  - Run: set mixer_token [mixer token]
  - Run: set telegram_token [telegram token]

__Why the set commands seems duplicated?__

_The "set" command will set the env var for the current session only. The "setx" command will set the env var system wide. You can run only setx though. The "set" suggestions is in the case of you using that same session to run the program_

__Cool. Although, I'm not a programmer. How can I run it?__
_In this case you can download a compiled version [here](http://tiny.cc/d24bkz) (right-click and ask to open in new tab). You can't scape the cmd.exe steps though. Those are important_
