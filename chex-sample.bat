@echo off

rem ---------------------------------------------------------------
rem Set your tokens according to README.md and 
rem UNCOMMENT means to remove the leading "rem" from a line
rem ---------------------------------------------------------------

rem -- START of config table

rem -- Mandatory *
set telegram_token=999999999:abcdef1234567890_abcdefg_ijklmnopqr
set telegram_username=MyTelegramUsername
echo Telegram Username=%telegram_username%

rem -- UNCOMMENT the next 5 lines and replace values if you plan to use Twitch
rem set twitch_token=oauth:abcdef1234567890abcdefghijklmn
rem set twitch_bot_username=MyTwitchBotName
rem set twitch_channel=MyTwitchChannel
rem echo Twitch Bot Name=%twitch_bot_username%
rem echo Twitch Channel=%twitch_channel%

rem -- UNCOMMENT the line below and replace values if you plan to use Mixer
rem set mixer_token=[mixer token]

rem -- END of config table

rem Fixes node-telegram-bot-api common error message 319
rem Check https://github.com/yagop/node-telegram-bot-api/issues/319
set NTBA_FIX_319=X

if exist chat-experience.exe (
	echo Launching chat-experience from binary...
    chat-experience.exe
) else (
	echo Launching chat-experience from source...
	if exist index.js node .\index.js
)

