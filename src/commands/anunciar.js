const Discord = require("discord.js")

module.exports = {
    name: "anunciar", // Coloque o nome do comando do arquivo
    aliases: ["anúncio"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply({embeds: [
                new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription("Você não tem permissão!")
                    ]})
    } else {
    
                
       
        let embed_1 = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`${message.author} Em qual chat você quer enviar esse anúncio?`);

        let embed_erro = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`${message.author} Este canal de texto não existe ou é inválido.`);

        let embed_2 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${message.author} Escreva o título do anúncio`);

        let embed_3 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${message.author} Escreva a descrição do anúncio?`);

        message.reply({ embeds: [embed_1] }).then(msg => {
            let coletor_1 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

            coletor_1.on("collect", (palavra_1) => {
                let chat = palavra_1.mentions.channels.first() || message.guild.channels.cache.get(palavra_1.content);

                if (!chat) {
                    palavra_1.reply({ embeds: [embed_erro] })
                } else
                if (chat) {
                    message.reply({ embeds: [embed_2] }).then(m_2 => {

                        let coletor_2 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

                        coletor_2.on("collect", (palavra_2) => {

                            let titulo = palavra_2.content;

                             message.reply({ embeds: [embed_3] }).then(m_3 => {

                                let coletor_3 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

                                coletor_3.on("collect", (palavra_3) => {

                                    let desc = palavra_3.content;

                                    message.reply(`${message.author}, o anúncio foi enviado para ${chat} com sucesso.`).then(m => {
                                        chat.send({ embeds: [
                                            new Discord.MessageEmbed()
                                            .setColor("RANDOM")
                                            .setTimestamp(new Date)
                                            .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                            .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                                            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                                            .setTitle(titulo)
                                            .setDescription(desc)
                                        ] }).catch(e => { m.edit({ content: `${message.author} Não foi possível enviar o anúncio.`, embeds: [] }) })
                                    })

                                })
                             })
                        })
                    })
                }
            })

            
        })
    }

       
}
    }
