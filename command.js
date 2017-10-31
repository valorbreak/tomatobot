"use strict";

class Command {
    constructor(bot) {

        bot.registerCommand("nani", (msg, args) => {
            return " sore, imi wakanai";
        }, {
            description: "???"
        });


    }
}




module.exports = Command;