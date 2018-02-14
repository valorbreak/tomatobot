"use strict";

const COMMAND = "DiaHappy";

class diaValentines {
    constructor(bot, config){
        this.bot = bot;
        this.config = config;
        this.giftChocolate = this.giftChocolate.bind(this);
        this.getGift = this.getGift.bind(this);
        this.purgeOtherRoles = this.purgeOtherRoles.bind(this);
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

            this.giftChocolate(msg);
            this.getGift(msg);
        });
    }

    getGift(msg) {
        const bot = this.bot;
        const config = this.config;
        // Hard Coded pls change this
        const GUILD_ID = config.guild_id;
        const CHANNEL_ID = config.channel_ids.valentines_dia;
        const ROLE_ID = config.role_ids.diavalentine;

        if(msg.attachments && msg.attachments.length > 0 && msg.channel.id === CHANNEL_ID) {
            return bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID, "You received a gift from Dia!").then(bot.createMessage(msg.channel.id, "❤You received a gift from Dia!❤"));
        }
    }

    giftChocolate(msg){
        const bot = this.bot;
        const config = this.config;
        // Hard Coded pls change this
        const GUILD_ID = config.guild_id;
        const CHANNEL_ID = config.channel_ids.dias_valentines_confessions;
        const ROLE_ID0 = config.role_ids.kanadiamari;
        const ROLE_ID1 = config.role_ids.kanadia;
        const ROLE_ID2 = config.role_ids.diamari;
        const ROLE_ID3 = config.role_ids.chikadia;
        const ROLE_ID4 = config.role_ids.diariko;
        const ROLE_ID5 = config.role_ids.diayou;
        const ROLE_ID6 = config.role_ids.diamaru;
        const ROLE_ID7 = config.role_ids.yohadia;
        const ROLE_ID8 = config.role_ids.kurosawasis;


        if(msg.content.toLowerCase().search(COMMAND.toLowerCase()) >= 0 && msg.channel.id === CHANNEL_ID){
            let shipArray = msg.content.split(" ");
            const ship = shipArray[1] ? shipArray[1].toLowerCase() : null;

            switch(ship){
                case "kanadiamari":
                    return this.purgeOtherRoles(msg.author.id)
                        .then(() => bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID0, "Dia went on a date with Maki!")
                            .then(() => bot.createMessage(msg.channel.id, "✨🐬🍫Dia spent Valentine's Day with Kanan and Mari!🍫🐬✨"))
                        );

                case "kanadia":
                    return this.purgeOtherRoles(msg.author.id)
                        .then(() => bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID1, "Dia went on a date with Kanan!")
                            .then(() => bot.createMessage(msg.channel.id, "🐬🍫Dia spent Valentine's Day with Kanan!🍫🐬"))
                        );

                case "diamari":
                    return this.purgeOtherRoles(msg.author.id)
                        .then(() => bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID2, "Dia went on a date with Mari!")
                            .then(() => bot.createMessage(msg.channel.id, "✨🍫Dia spent Valentine's Day with Mari!🍫✨"))
                        );

                case "chikadia":
                    return this.purgeOtherRoles(msg.author.id)
                        .then(() => bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID3, "Dia went on a date with Chika!")
                            .then(() => bot.createMessage(msg.channel.id, "🍊🍫Dia spent Valentine's Day with Chika!🍫🍊"))
                        );

                case "diariko":
                    return this.purgeOtherRoles(msg.author.id)
                        .then(() => bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID4, "Dia went on a date with Riko!")
                            .then(() => bot.createMessage(msg.channel.id, "🎹🍫Dia spent Valentine's Day with Riko!🍫🎹"))
                        );

                case "diayou":
                    return this.purgeOtherRoles(msg.author.id)
                        .then(() => bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID5, "Dia went on a date with You!")
                            .then(() => bot.createMessage(msg.channel.id, "⚓🍫Dia spent Valentine's Day with You!🍫⚓"))
                        );

                case "diamaru":
                    return this.purgeOtherRoles(msg.author.id)
                        .then(() => bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID6, "Dia went on a date with Hanamaru!")
                            .then(() => bot.createMessage(msg.channel.id, "🌼🍫Dia spent Valentine's Day with Hanamaru!🍫🌼"))
                        );

                case "yohadia":
                    return this.purgeOtherRoles(msg.author.id)
                        .then(() => bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID7, "Dia went on a date with Yohane!")
                            .then(() => bot.createMessage(msg.channel.id, "😈🍫Dia spent Valentine's Day with ~~Yoshiko~~ Yohane!🍫😈"))
                        );
                 case "diaruby":
                     return this.purgeOtherRoles(msg.author.id)
                     .then(() => bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID7, "Dia stayed home with Ruby!")
                     .then(() => bot.createMessage(msg.channel.id, "🍭🍫Dia stayed home with Ruby!🍫🍭"))
                        );

                default:
                    return bot.createMessage(msg.channel.id, "Buu-buu desu wa! Something went wrong!");
            }
        }
    }
    purgeOtherRoles(id){
        const bot = this.bot;
        const config = this.config;
        // Hard Coded pls change this
        const GUILD_ID = config.guild_id;
        const ROLE_ID0 = config.role_ids.kanadiamari;
        const ROLE_ID1 = config.role_ids.kanadia;
        const ROLE_ID2 = config.role_ids.diamari;
        const ROLE_ID3 = config.role_ids.chikadia;
        const ROLE_ID4 = config.role_ids.diariko;
        const ROLE_ID5 = config.role_ids.diayou;
        const ROLE_ID6 = config.role_ids.diamaru;
        const ROLE_ID7 = config.role_ids.yohadia;
        const ROLE_ID8 = config.role_ids.kurosawasis;

        return bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID0)
            .then(() => bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID1))
            .then(() => bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID2))
            .then(() => bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID3))
            .then(() => bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID4))
            .then(() => bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID5))
            .then(() => bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID6))
            .then(() => bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID7))
            .then(() => bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID8));
    }
}

module.exports = diaValentines;
