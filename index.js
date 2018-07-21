"use strict";

const Eris = require("eris");
const config = require("./config.json");
const Command = require("./modules/Command");
const Halloween = require("./modules/Halloween");
const Christmas = require("./modules/Christmas");
const Valentines = require("./modules/Valentines");
const diaValentines = require("./modules/DiaValentines");
const Birthday = require("./modules/Birthday");
const EmoteBreaker = require("./modules/EmoteBreaker");

// Using basic commands
const bot = new Eris.CommandClient(config.token, {}, {
    name: "tomatobot",
    prefix: "nico."
});

bot.on("ready", () => { // When the bot is ready
    console.log("Ready!"); // Log "Ready!"
});

const command = new Command(bot);
command.listen();

const halloween = new Halloween(bot,config.halloween);
halloween.listen();

const christmas = new Christmas(bot,config.christmas);
christmas.listen();

const valentines = new Valentines(bot,config.valentines);
valentines.listen();

const diavday = new diaValentines(bot, config.diavalentines);
diavday.listen();

const birthday = new Birthday(bot,config.birthday);
birthday.listen();

const emoteBreaker = new EmoteBreaker(bot,config.emotebreaker);
emoteBreaker.listen();

bot.connect(); // Get the bot to connect to Discord
