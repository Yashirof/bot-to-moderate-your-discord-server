const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "server",
    description: "teste",  
    run: async (client, message, args) => {
        let region;
        switch (message.guild.region) {
            case "europe":
                region = ':flag_eu: Europe';
                break;
            case "us-east":
                region = ':flag_us: us-east'
                break;
            case "us-west":
                region = ':flag_us: us-west';
                break;
            case "us-south":
                region = ':flag_us: us-south'
                break;
            case "us-central":
                region = ':flag_us: us-central'
                break;
            case "brazil":
                region = ':flag_br: Brazil'
                break;
        }

        const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#00FFE8')
            .setTitle(`${message.guild.name}`)
            .addFields(
                {
                    name: "Dono/a: ",
                    value: `<@!${message.guild.ownerId}>`
                },
                {
                    name: "Membros ",
                    value: `${message.guild.memberCount} Membros`
                },
                {
                    name: "ping:",
                    value: `${client.ws.ping}`
                },
                {
                    name: "Membros Online: ",
                    value: `${message.guild.memberCount}`
                },
                {
                    name: "Bots: ",
                    value: `${message.guild.members.cache.filter(m => m.user.bot).size} bots`
                },
                {
                    name: "Data de Criação: ",
                    value: message.guild.createdAt.toLocaleDateString("pt-br")
                },
                {
                    name: "Canais de Texto: ",
                    value:`${message.guild.channels.cache.filter(c => c.type === "GUILD_TEXT").size}`
                },
                {
                    name: "Canais de Voz: ",
                    value: `${message.guild.channels.cache.filter(c => c.type === "GUILD_VOICE").size}`
                },
                {
                    name: "Cargos: ",
                    value: `${message.guild.roles.cache.size} Cargos.`
                },
                {
                    name: `Verificado: `,
                    value: message.guild.verified ? 'Sim' : 'Não'
                },
                {
                    name: 'Boosters: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? `${message.guild.premiumSubscriptionCount} Boosters` : `Sem Boosters`
                },
                {
                    name: "Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `${message.guild.emojis.cache.size} emojis!` : 'Não há emojis.'
                });

        message.reply({embeds: [embed]});
    }
}