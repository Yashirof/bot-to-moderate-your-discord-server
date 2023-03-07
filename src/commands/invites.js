const { MessageEmbed, Message, Client } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

exports.run = async (client, message) => {
  message.delete()

  var user = message.mentions.users.first();

  if (!user) user = message.author;

  var targetInvites = await message.guild.invites.fetch();

  var invitesUses = 0;

  targetInvites.forEach(invite => {
    if (invite.inviter.id === user.id) {
      invitesUses += invite.uses;
    }
  });

  const embed = new MessageEmbed()
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setTitle(`• ${user.tag} invites.`)
    .addField("•  Membros Recrutados", `\`\`\`md\n# ${invitesUses} Membros\`\`\``)
    .setColor('#2f3136')
    .setFooter({ text: `ID : ${user.id}` })
    .setTimestamp();
  message.channel.send({ embeds: [embed] })
};


exports.help = {
  name: "invites",
  aliases: ["convidados"]
}