const EMOTEBREAKER_COMMAND = "E-E-E-Emote Breaker!!!";

class EmoteStore {
    constructor(bot, config) {
        this.stack = [];
    }

    get(){
        return this.stack;
    }

    isNonconsecutive(field, amount) {
        const localStack = [];
        this.stack.forEach((value) => {

            // Reset the stack depending on amount
            if(localStack.length === amount) {
                localStack.length = 0;
            }

            if(!localStack.includes(value[field])) {
                localStack.push(value[field])
            } else {
                return false;
            }
        });

        return true;
    }

    add(data) {
        this.stack.push(data);
        console.log("emote added to stack: " + data.emote);
    }

    reset() {
        this.stack = [];
        console.log('RESET');
    }

}

class EmoteBreaker {
    constructor(bot, config) {
        this.bot = bot;
        this.config = config;
        this.store = new EmoteStore();

        this.game = this.game.bind(this);
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

            // Return Early
            const EMOTEBREAKER_CHANNEL = config.channel_ids.nico_emotebreaker;
            if( msg.channel.id === EMOTEBREAKER_CHANNEL ) {
                this.game(msg, config);
            }
        });

        // 5. editing/deleting a post breaks the emote chain
        bot.on("messageUpdate", (msg) => {
            // Stop listening on other channels
            if(!Object.keys(config.channel_ids).map(key => config.channel_ids[key]).includes(msg.channel.id) ||
                msg.author.bot) {
                return;
            }

            // Return Early
            const EMOTEBREAKER_CHANNEL = config.channel_ids.nico_emotebreaker;
            if( msg.channel.id === EMOTEBREAKER_CHANNEL ) {
                this.store.reset(msg);

                return bot.createMessage(msg.channel.id, "<:nicosmugcloser:230159539767476225>")
                    .then(() => bot.createMessage(msg.channel.id, "Editing is cheating"))
            }
        });

        bot.on("messageDelete", (msg) => {
            // Stop listening on other channels
            if(!Object.keys(config.channel_ids).map(key => config.channel_ids[key]).includes(msg.channel.id) ||
                msg.author.bot) {
                return;
            }

            // Return Early
            const EMOTEBREAKER_CHANNEL = config.channel_ids.nico_emotebreaker;
            if( msg.channel.id === EMOTEBREAKER_CHANNEL ) {
                this.store.reset(msg);

                return bot.createMessage(msg.channel.id, "<:nicosmugcloser:230159539767476225>")
                    .then(() => bot.createMessage(msg.channel.id, "Deleting is cheating"))
            }
        });

    }

    game(msg) {
        const bot = this.bot;
        const config = this.config;

        // Configuration
        const ROLE_ID = config.role_ids.nico_emotebreaker;
        const GUILD_ID = config.guild_id;
        const CONSECUTIVE_LIMIT = config.settings.CONSECUTIVE_LIMIT;
        const EMOTE_BREAK_LIMIT = config.settings.EMOTE_BREAK_LIMIT;

        const emojis = msg.channel.guild.emojis.map(emoji => emoji.name);
        const store = this.store;
        const re = new RegExp(":(.*):");

        const regexResult = re.exec(msg.content);
        const userEmote = regexResult ? regexResult[1] : null;

        // 1. only one emoji per post
        if(regexResult > 1) {
            store.reset();
        }
        // 2. emojis are that valid are the only ones in the server
        else if(!emojis.includes(userEmote) &&
            msg.content !== EMOTEBREAKER_COMMAND) {
            store.reset();
        }
        // 6. 25 emote chain are required before emotebreak
        else if(msg.content === EMOTEBREAKER_COMMAND) {

            // 7. "E-E-E-Emote Breaker!!!" must be the exact word to break the chain, without the quotes
            if(store.get().length === EMOTE_BREAK_LIMIT) {
                // Assign Role to User
                bot.createMessage(msg.channel.id, "<:nicoparty:470220069075681280>")
                    .then(() => bot.createMessage(msg.channel.id, "msg.author.mention breaker!"))
                    .then(() => bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID, "Birthday Event - Happy Birthday Nico!!!"))
                // Then Reset
                store.reset();
            } else {
                store.reset();
            }
        } else {

            // Reset first before adding
            // 3. an emote can't be repeated consecutively
            if(!store.isNonconsecutive('emote', CONSECUTIVE_LIMIT)) {
                store.reset();
                console.log('RESET');
            }

            // 4. a user can't post after immediately after posting a emoji
            if(!store.isNonconsecutive('userId', CONSECUTIVE_LIMIT)) {
                store.reset();
                console.log('RESET');
            }

            // Add emoji to stack
            store.add({
                emote: userEmote,
                userId: msg.author_id
            });
        }

    }
}


module.exports = EmoteBreaker;