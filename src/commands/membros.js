const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "membros",
    description: "Ver membros atuais do server",  
    run: async (client, message, args) => {

       const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor(`RANDOM`)
            .setTitle(`Membros atuais do \`${message.guild.name}\``)
            .setDescription(`Atualmente temos \`${message.guild.memberCount}\` Membros`)

        message.reply({embeds: [embed]});
    }
}