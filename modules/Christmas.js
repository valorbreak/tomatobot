"use strict";

const request = require("request-promise");

// Christmas Event Game
const CHRISTMAS_CARDS = "http://schoolido.lu/api/cards?translated_collection=Christmas&page_size=50";
const COMMAND = "NicoNii";

class Christmas {
    constructor(bot, config) {
        this.bot = bot;
        this.config = config;

        this.naughtyOrNice = this.naughtyOrNice.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.listen = this.listen.bind(this);
    }

    listen() {
        const config = this.config;
        const bot = this.bot;

        bot.on("messageCreate", (msg) => {

            // Stop listening on other channels
            if(!Object.keys(config.channel_ids)
                    .map(key => config.channel_ids[key])
                    .includes(msg.channel.id)) {
                return;
            }

            this.naughtyOrNice(msg);
            this.onFileUpload(msg);
        });
    }

    onFileUpload(msg) {
        const bot = this.bot;
        const config = this.config;
        // Hard Coded pls change this
        const CHANNEL_ID = config.channel_ids.christmas_nico;
        const ROLE_ID = config.role_ids.nico_nico_naughty;
        const GUILD_ID = config.guild_id;

        if(msg.attachments && msg.attachments.length > 0 && msg.channel.id === CHANNEL_ID) {
            return bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID, "Holiday Event - nico nico naughty!!!");
        }
    }

    naughtyOrNice(msg) {
        const bot = this.bot;
        const config = this.config;
        const ROLE_ID = config.role_ids.nico_nico_nice;
        const CHANNEL_ID = config.channel_ids.naughty_or_nice;
        const GUILD_ID = config.guild_id;
        
        if(msg.content.toLowerCase().search(COMMAND.toLowerCase()) >= 0 && msg.channel.id === CHANNEL_ID) {

            return request.get(CHRISTMAS_CARDS)
                .then(data => {
                    const cards = JSON.parse(data).results;

                    // GET nico
                    if(Math.random() <= 0.08) {
                        const goodCards = [
                            cards.find(card => card.idol.name === "Nishikino Maki" && card.rarity === "UR").card_idolized_image,
                            cards.find(card => card.idol.name === "Yazawa Nico").card_idolized_image,
                            cards.find(card => card.idol.name === "Kurosawa Dia").card_idolized_image,
                            cards.find(card => card.idol.name === "Kurosawa Ruby").card_idolized_image,
                        ];

                        const randomGoodCard = Christmas.getRandomObject(goodCards);

                        return bot.createMessage(msg.channel.id,
                            ":christmas_tree: ⭐ :christmas_tree: ⭐ :christmas_tree: ⭐ :christmas_tree: ⭐\n" +
                            "⭐ ⭐ ***You got a Present!!!*** ⭐ ⭐ \n" +
                            "⭐ :christmas_tree: ⭐ :christmas_tree: ⭐ :christmas_tree: ⭐ :christmas_tree:\n" +
                            msg.author.mention + " have received the nico nico nice!!! role \n" +
                            "https:" + randomGoodCard + "\n"
                        )
                        // Add Them to a role
                        .then(() => bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID, "Christmas Event - Nico Nico Naughty!!!"))

                    } else {
                        const filteredCards = cards.filter(card =>
                            !(card.idol.name === "Nishikino Maki" && card.rarity === "UR") &&
                            !(card.idol.name === "Yazawa Nico") &&
                            !(card.idol.name === "Kurosawa Dia") &&
                            !(card.idol.name === "Kurosawa Ruby")
                        );

                        const card = Christmas.getRandomObject(filteredCards);
                        return bot.createMessage(msg.channel.id,
                            ":christmas_tree: 🚂 :christmas_tree: 🚂 :christmas_tree: 🚂 :christmas_tree: 🚂\n" +
                            "🚂 🚂 ***You got COAL!!!*** 🚂 🚂 \n" +
                            "🚂 :christmas_tree: 🚂 :christmas_tree: 🚂 :christmas_tree: 🚂 :christmas_tree:\n" +
                            "https:" + card.card_idolized_image + "\n");
                    }
                })
                .catch(err => {
                    console.log(err,"error");
                    return bot.createMessage(msg.channel.id, "Please try again later")
                });

        }
    }

    static getRandomObject(list) {
        const min = 0;
        const max = list.length;
        return list[Math.floor(Math.random()*(max-min)+min)]
    }

    static randomIntFromInterval(min,max) {
        return Math.floor(Math.random()*(max-min)+min);
    }

}


module.exports = Christmas;