const { GuildMember, Client, MessageEmbed } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member
 */


module.exports = async (client, member) => {
    const embed = new MessageEmbed()
        .setTitle("👋 Seja bem vindo(a)!")
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .addField( "bem vindo", "ㅤ", true)
        .addField(" mensagem aqui ", "mensagem aqui", true)
        .setColor("#2f3136")
    let channel = client.channels.cache.get(process.env.CHANNEL_WELCOME_ID);
    if(channel) channel.send({content: member.toString(), embeds: [embed]});
};