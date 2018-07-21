class Command {
    constructor(bot) {
        this.bot = bot;
    }

    listen() {
        const bot = this.bot;
        bot.registerCommand("nani", (msg, args) => {
            return "nani ???, imi wakanai";
        }, {
            description: "???"
        });
    }
}




module.exports = Command;