"use strict";

const request = require("request-promise");

// Trick or Treat Event Game
// Getting Nico is a Treat and will provide a role
const IDOL = "Yazawa Nico";
const HALLOWEEN_CARDS = "http://schoolido.lu/api/cards?translated_collection=Halloween&page_size=50";
const COMMAND = "NicoNii";

class Halloween {
    constructor(bot, config) {
        this.bot = bot;
        this.config = config;

        this.trickOrTreat = this.trickOrTreat.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.listen = this.listen.bind(this);
    }

    listen() {
        const config = this.config;
        const bot = this.bot;

        bot.on("messageCreate", (msg) => {

            // Stop listening on other channels
            if(!Object.keys(config.channel_ids).map(key => config.channel_ids[key]).includes(msg.channel.id)) {
                return;
            }

            this.trickOrTreat(msg);
            this.onFileUpload(msg);
        });
    }

    onFileUpload(msg) {
        const bot = this.bot;
        const config = this.config;
        // Hard Coded pls change this
        const GUILD_ID = config.guild_id;
        const CHANNEL_ID = config.channel_ids.halloween_nico;
        const TREAT_ROLE_ID = config.role_ids.halloween_nico;

        if(msg.attachments && msg.attachments.length > 0 && msg.channel.id === CHANNEL_ID) {
            return bot.addGuildMemberRole(GUILD_ID, msg.author.id, TREAT_ROLE_ID, "Holiday Event - Treat!!!");
        }
    }

    trickOrTreat(msg) {
        const bot = this.bot;
        const config = this.config;
        const TRICK_ROLE_ID = config.role_ids.trick_or_treat;
        const CHANNEL_ID = config.channel_ids.trick_or_treat;
        const GUILD_ID = config.guild_id;

        if(msg.content.toLowerCase().search(COMMAND.toLowerCase()) >= 0 && msg.channel.id === CHANNEL_ID) {

            request.get(HALLOWEEN_CARDS)
                .then(data => {
                    const cards = JSON.parse(data).results;

                    // GET nico
                    if(Halloween.randomIntFromInterval(0,cards.length) === 0) {
                        return bot.createMessage(msg.channel.id,
                            "🍬 🍫 🍬 🍫 🍬 🍫 \n" +
                            "🍫 🍬 ***TREAT!!!*** 🍬 🍫 \n" +
                            "🍬 🍫 🍬 🍫 🍬 🍫 \n" +
                            msg.author.mention + " have received the TRICKED!!! role \n" +
                            (Math.random() >= 0.5 ? "http://i.schoolido.lu/c/909idolizedNico.png\n" : "http://i.schoolido.lu/c/425idolizedNico.png\n")
                        )
                        // Add Them to a role
                            .then(() => bot.addGuildMemberRole(GUILD_ID, msg.author.id, TRICK_ROLE_ID, "Holiday Event - Tricked!!!"))

                    } else {
                        const filteredCards = cards.filter(card => card.idol.name !== IDOL);

                        const card = filteredCards[randomIntFromInterval(0,filteredCards.length)];
                        return bot.createMessage(msg.channel.id,
                            "👻 🎃 👻 🎃 👻 🎃 👻 \n" +
                            "🎃 🎃 ***TRICKED!!!*** 🎃 🎃 \n" +
                            "🎃 👻 🎃 👻 🎃 👻 🎃 \n" +
                            "http:" + card.card_idolized_image + "\n");
                    }
                })
                .catch((err) => {
                    console.log(err,"error");
                    return bot.createMessage(msg.channel.id, "Please try again later")
                })

        }
    }

    static randomIntFromInterval(min,max) {
        return Math.floor(Math.random()*(max-min)+min);
    }
}


module.exports = Halloween;