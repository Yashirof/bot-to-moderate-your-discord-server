const { Interaction, Client, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { Database } = require('simpl.db');
const db = new Database()

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction
 */


module.exports = async (client, interaction) => {
    if (interaction.isButton()) {
        const ticketCollection = db.createCollection('tickets');
        if(interaction.customId === "ticketclose") {
            const ticket = await ticketCollection.get(x => x.channelId === interaction.channel.id);
            if(!ticket) return;
            interaction.reply('Fechando esse ticket em 10 segundos')
            setTimeout(() => {
                interaction.channel.delete()
                ticketCollection.remove(x => x.channelId === interaction.channel.id);
            }, 10000)
            return;
        }
        const ticket = ticketCollection.get(x => x.id === interaction.user.id);
        if (ticket) return interaction.reply({ content: `${interaction.user.toString()} Seu ticket atual já está aberto em: <#${ticket.channelId}>!`, ephemeral: true })
        var category = interaction.guild.channels.cache.find(x => x.name === interaction.customId.toUpperCase() && x.type === "GUILD_CATEGORY")
        if(!category) {
            category = await interaction.guild.channels.create(`${interaction.customId.toUpperCase()}`, {type: "GUILD_CATEGORY"})
        }
        let channel = await interaction.guild.channels.create(`${interaction.customId}-${interaction.user.username}`, {
            type: 'GUILD_TEXT',
            parent: category.id,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                },
                {
                    id: client.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                }
            ]
        })
        interaction.reply({ content: `${interaction.user.toString()} Seu ticket foi aberto em: <#${channel.id}>!`, ephemeral: true })
        const embed4 = new MessageEmbed()
            .setTitle("Suporte")
            .setDescription('Nós iremos entrar em contato com você futuramente, apenas aguarde um pouco.\n\n Clique em **📩 Fechar Ticket** para fechar o suporte.')
            .setColor('#1476e4')
        let botao4 = new MessageButton()
            .setStyle('SECONDARY')
            .setLabel('Fechar Ticket')
            .setEmoji('📩')
            .setCustomId('ticketclose')
        const row4 = new MessageActionRow()
            .addComponents(botao4)
        channel.send({ embeds: [embed4], components: [row4] })
        ticketCollection.create({id: interaction.user.id, channelId: channel.id})
    }
};