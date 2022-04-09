const TelegramBot = require('node-telegram-bot-api')
const exec = require('child_process').exec
require('dotenv').config();
const key = process.env.TOKEN // or your telegram bot token
const bot = new TelegramBot(key, {polling: true});
const fs = require('fs')

let config = JSON.parse(fs.readFileSync('api/commands.json', 'utf8'));

const mainMenu = {
    "keyboard": [config.map(e => e.buttonTitle)]
}

bot.on('message', (msg) => {
    const userId = msg.from.id;

    const cmd = config.find((e) => e.buttonTitle === msg.text.toString()) || false
    if (cmd) 
    {
        exec(cmd.action)
        bot.sendMessage(userId, cmd.reply, {'reply_markup': mainMenu})
        return
    }

    bot.sendMessage(userId, 'Привет, выбери команду из списка', {
        "reply_markup": mainMenu
    })
})