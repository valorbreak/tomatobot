"use strict";

const Eris = require("eris");
const config = require("./config.json");
const Command = require("./modules/Command");
const Halloween = require("./modules/Halloween");
const Christmas = require("./modules/Christmas");

// Using basic commands
const bot = new Eris.CommandClient(config.token, {}, {
    name: "Tomato",
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

bot.connect(); // Get the bot to connect to Discord