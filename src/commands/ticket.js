const { MessageEmbed, MessageButton, MessageActionRow, Message, Client }= require("discord.js");
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports.run = (client, message, args) => {
if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({embed: { title: `❌ Ocorreu um erro`  , description: `${message.author} Você não possui a permissão de \`Administrador\` para executar este comando`, color: "FF0000"}}).then(msg => setTimeout(() => msg.delete(), 10 * 1000));
    const embed = new MessageEmbed()
    .setTitle("Central de Atendimentos")
    .setDescription('» Reaja no botão abaixo para abrir um ticket e realizar seu pedido ou tirar suas dúvidas.')
    .setColor('GREEN')
    .setFooter("©Void Smurfs")
    let button = new MessageButton()
    .setStyle('DANGER')
    .setLabel('Smurf')
    .setEmoji('💸')
    .setCustomId('smurf')
	let button2 = new MessageButton()
    .setStyle('DANGER')
    .setLabel('Elojob')
    .setEmoji('🔮')
    .setCustomId('elojob')
	let button3 = new MessageButton()
    .setStyle('DANGER')
    .setLabel('Coach')
    .setEmoji('🖊️')
    .setCustomId('coach')
	let button4 = new MessageButton()
    .setStyle('DANGER')
    .setLabel('Suporte')
    .setEmoji('❓')
    .setCustomId('suporte')
    const row = new MessageActionRow()
    .addComponents(button)
	.addComponents(button2)
	.addComponents(button3)
	.addComponents(button4)
    message.channel.send({embeds: [embed], components: [row]});

}