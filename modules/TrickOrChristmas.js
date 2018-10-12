const path = require('path');
const fs = require('fs');

class TrickOrChristmas {
    constructor (bot, config) {
        this.bot = bot;
        this.config = config;
        this.data;
        this.fetchData();
        this.listen = this.listen.bind(this);
        this.index = Math.floor(this.gradient().length / 2);
    }

    fetchData() {
        const configFilePath = path.resolve(__dirname, '../data/trick-or-treat.json');

        if(fs.existsSync(configFilePath)) {
            this.data = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
        }
    }

    getChristmasEmotes() {
        return this.data.christmas_emotes;
    }


    getHalloweenEmotes() {
        return this.data.halloween_emotes;
    }

    gradient () {
        return this.data.gradient;
    }

    pickGradient (index) {
        return parseInt(this.gradient()[index], 16) ;
    }

    listen () {
        const config = this.config;
        const bot = this.bot;

        bot.on("ready", () => {
            this.updateStatus();
        });

        bot.on("messageCreate", (msg) => {
            // Stop listening on other channels
            if(!Object.keys(config.channel_ids).map(key => config.channel_ids[key]).includes(msg.channel.id) ||
                msg.author.bot) {
                return;
            }

            // Return Early
            const TRICK_OR_CHRISTMAS = config.channel_ids.treat_or_christmas;
            if( msg.channel.id === TRICK_OR_CHRISTMAS ) {
                this.game(msg, config);
            }
        });
    }

    game (msg) {
        const re = new RegExp(':(.*):');
        const regexResult = re.exec(msg.content);
        let userEmote = regexResult ? regexResult[1] : null;

        this.fetchData();
        const christmasEmotes = this.getChristmasEmotes();
        const halloweenEmotes = this.getHalloweenEmotes();

        if( christmasEmotes.includes(userEmote) ||
            christmasEmotes.find(emote => msg.content.includes(emote))
        ) {
            this.index--;
        } else if(
            halloweenEmotes.includes(userEmote) ||
            halloweenEmotes.find(emote => msg.content.includes(emote))
        ) {
            this.index++;
        }

        this.updateStatus();
    }

    updateStatus() {
        const config = this.config;

        // Configuration
        const ROLE_ID = config.role_ids.bot;
        const GUILD_ID = config.guild_id;
        this.changeRoleColor(GUILD_ID, ROLE_ID, this.pickGradient(this.index));

        // Add emote status to nickname
        this.bot.editNickname(GUILD_ID, this.message(this.index));
    }

    message(index){
        const length = this.gradient().length;
        if(index === Math.floor(length / 2)) {
            return "Tomato Bot";
        } else if(index < Math.floor(length / 2)) {
            const offset = Math.floor(length / 2) - index;
            return `🎄 Merry Christmas!!! 🎄 - ${offset}`;
        } else if(index > Math.floor(length / 2)) {
            const offset = index - Math.floor(length / 2);

            return `🎃 Happy Halloween!!! 🎃 - ${offset}`;
        }
    }

    changeRoleColor (guildID, roleID, color) {
        return this.bot.editRole(guildID,roleID,{ color: color }, "Tomato Bot: Event Halloween Christmas");
    }
}

module.exports = TrickOrChristmas;