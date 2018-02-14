"use strict";

const request = require("request-promise");

const COMMAND = "NicoNii";

// const COMMAND0 = "NicoMaki";
// const COMMAND1 = "NicoRin";
// const COMMAND2 = "NicoPana";
// const COMMAND3 = "HonoNico";
// const COMMAND4 = "NicoUmi";
// const COMMAND5 = "NozoNico";
// const COMMAND6 = "NicoEli";
// const COMMAND7 = "KotoNico";

class Valentines {
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
      const CHANNEL_ID = config.channel_ids.love_nico;
      const ROLE_ID = config.role_ids.lovenico;

      if(msg.attachments && msg.attachments.length > 0 && msg.channel.id === CHANNEL_ID) {
          return bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID, "You received a gift from Nico!").then(bot.createMessage(msg.channel.id, "❤You received a gift from Nico!❤"));
      }
  }

  giftChocolate(msg){
      const bot = this.bot;
      const config = this.config;
      // Hard Coded pls change this
      const GUILD_ID = config.guild_id;
      const CHANNEL_ID = config.channel_ids.date_nico;
      const ROLE_ID0 = config.role_ids.nicomaki;
      const ROLE_ID1 = config.role_ids.nicopana;
      const ROLE_ID2 = config.role_ids.nicorin;
      const ROLE_ID3 = config.role_ids.hononico;
      const ROLE_ID4 = config.role_ids.nicoumi;
      const ROLE_ID5 = config.role_ids.kotonico;
      const ROLE_ID6 = config.role_ids.nozonico;
      const ROLE_ID7 = config.role_ids.nicoeli;


      if(msg.content.toLowerCase().search(COMMAND.toLowerCase()) >= 0 && msg.channel.id === CHANNEL_ID){
        var ship = msg.content.split(" ");
        switch(ship[1].toLowerCase()){
          case "nicomaki":
          this.purgeOtherRoles(msg.author.id);
          return bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID0, "Nico went on a date with Maki!").then(bot.createMessage(msg.channel.id, "🍅🍫Nico spent Valentine's Day with Maki!🍫🍅"));

          case "nicopana":
          this.purgeOtherRoles(msg.author.id);
          return bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID1, "Nico went on a date with Hanayo!").then(bot.createMessage(msg.channel.id, "🍚🍫Nico spent Valentine's Day with Hanayo!🍫🍚"));

          case "nicorin":
          this.purgeOtherRoles(msg.author.id);
          return bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID2, "Nico went on a date with Rin!").then(bot.createMessage(msg.channel.id, "😺🍫Nico spent Valentine's Day with Rin!🍫😺"));

          case "hononico":
          this.purgeOtherRoles(msg.author.id);
          return bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID3, "Nico went on a date with Honoka!").then(bot.createMessage(msg.channel.id, "🍞🍫Nico spent Valentine's Day with Honoka!🍫🍞"));

          case "nicoumi":
          this.purgeOtherRoles(msg.author.id);
          return bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID4, "Nico went on a date with Umi!").then(bot.createMessage(msg.channel.id, "🌊🍫Nico spent Valentine's Day with Umi!🍫🌊"));

          case "kotonico":
          this.purgeOtherRoles(msg.author.id);
          return bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID5, "Nico went on a date with Kotori!").then(bot.createMessage(msg.channel.id, "🐥🍫Nico spent Valentine's Day with Kotori!🍫🐥"));

          case "nozonico":
          this.purgeOtherRoles(msg.author.id);
          return bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID6, "Nico went on a date with Nozomi!").then(bot.createMessage(msg.channel.id, "🎴🍫Nico spent Valentine's Day with Nozomi!🍫🎴"));

          case "nicoeli":
          this.purgeOtherRoles(msg.author.id);
          return bot.addGuildMemberRole(GUILD_ID, msg.author.id, ROLE_ID7, "Nico went on a date with Eli!").then(bot.createMessage(msg.channel.id, "💃🍫Nico spent Valentine's Day with Eli!🍫💃"));

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
    const ROLE_ID0 = config.role_ids.nicomaki;
    const ROLE_ID1 = config.role_ids.nicopana;
    const ROLE_ID2 = config.role_ids.nicorin;
    const ROLE_ID3 = config.role_ids.hononico;
    const ROLE_ID4 = config.role_ids.nicoumi;
    const ROLE_ID5 = config.role_ids.kotonico;
    const ROLE_ID6 = config.role_ids.nozonico;
    const ROLE_ID7 = config.role_ids.nicoeli;
    bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID0).then(
    bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID1)).then(
    bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID2)).then(
    bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID3)).then(
    bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID4)).then(
    bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID5)).then(
    bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID6)).then(
    bot.removeGuildMemberRole(GUILD_ID, id, ROLE_ID7))
    return
  }
}

module.exports = Valentines;
