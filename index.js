const { Client, Collection } = require("discord.js");
const { readdir } = require('fs')
const client = new Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_INVITES"] });
require('dotenv').config()

readdir('./src/events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./src/events/${file}`);
    let eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Collection();

readdir('./src/commands/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    let props = require(`./src/commands/${file}`);
    let commandName = file.split('.')[0];
    client.commands.set(commandName, props);
  });
});

client.on('ready', () => {
  let palavras = [
	`nome`
  ]
  inc = 0
  setInterval(() => client.user.setActivity(`${palavras[inc++ % palavras.length]}`, { type: `PLAYING` }), 1000 * 10)
})

client.on("guildMemberAdd", (member) => member.roles.add("1002741062751760475"))


client.login(process.env.TOKEN);