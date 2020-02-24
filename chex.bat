@echo off

rem ---------------------------------------------------------------
rem Set your tokens according to README.md and 
rem UNCOMMENT the services you want to use.

rem set mixer_token=[mixer token]
rem twitch_token=oauth:abcdef1234567890abcdefghijklmn
rem ---------------------------------------------------------------

set telegram_token=999999999:abcdef1234567890_abcdefg_ijklmnopqr
set telegram_username=MyTelegramUsername
set twitch_bot_username=MyTwitchBotName
set twitch_channel=MyTwitchChannel

rem Fixes node-telegram-bot-api common error message 319
rem Check https://github.com/yagop/node-telegram-bot-api/issues/319
set NTBA_FIX_319=X

echo Telegram Username=%telegram_username%
echo Twitch Bot Name=%twitch_bot_username%
echo Twitc Channel=%twitch_channel%

if exist chat-experience.exe (
	echo Launching chat-experience from binary...
    chat-experience.exe
) else (
	echo Launching chat-experience from source...
	if exist index.js node .\index.js
)

