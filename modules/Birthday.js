const request = require("request-promise");
const COMMAND = "nicoparty";

class Birthday {
    constructor(bot, config) {
        this.bot = bot;
        this.config = config;
        this.nicoParty = this.nicoParty.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.listen = this.listen.bind(this);
    }

    listen() {
        const config = this.config;
        const bot = this.bot;
        bot.on("messageCreate", (msg) => {

            // Stop listening on other channels
            if(!Object.keys(config.channel_ids).map(key => config.channel_ids[key]).includes(msg.channel.id) ||
                msg.author.bot) {
                return;
            }

            this.nicoParty(msg);
            this.onFileUpload(msg);
        });
    }

    onFileUpload(msg) {
        const bot = this.bot;
        const config = this.config;
        // Hard Coded pls change this
        const GUILD_ID = config.guild_id;
        const CHANNEL_ID = config.channel_ids.nico_birthday_shrine;
        const ROLE_ID = config.role_ids.nico_birthday_shrine;

        if(msg.attachments && msg.attachments.length > 0 && msg.channel.id === CHANNEL_ID) {
            return bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID, "<:nicoparty:470220069075681280> Happy Birthday Nico!!!");
        }
    }

    nicoParty(msg) {
        const bot = this.bot;
        const config = this.config;
        const ROLE_ID = config.role_ids.nico_birthday_scouts;
        const CHANNEL_ID = config.channel_ids.nico_birthday_scouts;
        const GUILD_ID = config.guild_id;

        // Return Early if
        if( !(msg.content.toLowerCase().search(COMMAND.toLowerCase()) >= 0 &&
            msg.channel.id === CHANNEL_ID) ) {
            return
        }

        const card = Birthday.cardGacha();
        return request.get(card.url)
            .then(data => {
                const cards = JSON.parse(data).results;

                // GET nico
                if(card.rarity === 'UR') {
                    const randomGoodCard = Birthday.getRandomObject(cards);

                    return bot.createMessage(msg.channel.id,
                        "<:nicoparty:470220069075681280> <:NicoNii:230141219399925760> <:nicoparty:470220069075681280> <:NicoNii:230141219399925760> <:nicoparty:470220069075681280> <:NicoNii:230141219399925760> <:nicoparty:470220069075681280> <:NicoNii:230141219399925760>\n" +
                        "<:NicoNii:230141219399925760> <:NicoNii:230141219399925760> ***Congratulations you got a UR!!!*** <:NicoNii:230141219399925760> <:NicoNii:230141219399925760> \n" +
                        "<:NicoNii:230141219399925760> <:nicoparty:470220069075681280> <:NicoNii:230141219399925760> <:nicoparty:470220069075681280> <:NicoNii:230141219399925760> <:nicoparty:470220069075681280> <:NicoNii:230141219399925760> <:nicoparty:470220069075681280>\n" +
                        msg.author.mention + " have received the nico nico nice!!! role \n" +
                        "https:" + (Math.random() >= 0.5 ? randomGoodCard.card_idolized_image : randomGoodCard.card_image)  + "\n"
                    )
                    // Add Them to a role
                        .then(() => bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID, "Birthday Event - Happy Birthday Nico!!!"))

                } else {
                    const randomGoodCard = Birthday.getRandomObject(cards);

                    return bot.createMessage(msg.channel.id,
                        "You got a " + card.rarity + " Nico <:nicoparty:470220069075681280> \n" +
                        "Please try again <:NicoNii:230141219399925760>" + msg.author.mention + "\n" +
                        "https:" + randomGoodCard.card_idolized_image + "\n"
                    )
                }
            })
            .catch(err => {
                console.log(err,"error");
                return bot.createMessage(msg.channel.id, "Please try again later")
            });

    }

    static cardGacha(){
        // Set the student's grade
        const rate = Math.random() * 100;

        let rarity = null;

        switch (true) {
            case rate >= 95:
                rarity = "UR";
                break;
            case rate >= 75:
                rarity = "SSR";
                break;
            case rate >= 50:
                rarity = "SR";
                break;
            default:
                rarity = "R";
                break;
        }

        return {
            rarity: rarity,
            url: Birthday.getNicoCard(rarity)
        }
    }

    static getNicoCard(rarity) {
        return `https://schoolido.lu/api/cards/?rarity=${rarity}&name=Yazawa%20Nico&is_promo=false`
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


module.exports = Birthday;