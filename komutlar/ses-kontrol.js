const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

module.exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    let member = message.mentions.members.first()
    if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(`Bir kullanıcı etiketlemelisin.`).setFooter(`Lore ❤️`))
    if(!member) return message.channel.send(new MessageEmbed().setDescription(`Geçerli bir kullanıcıyı etiketlemelisin.`).setFooter(`Lore ❤️`))
    if(!member.guild.members) return  message.channel.send(new MessageEmbed().setDescription(`Geçerli bir kullanıcıyı etiketlemelisin.`).setFooter(`Lore ❤️`))
    if(!member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`${member} adlı kullanıcı herhangi bir ses kanalında bulunmuyor.`).setFooter(`Lore ❤️`))


    else {

    if(member.voice.channel) 
    message.channel.send(new MessageEmbed().setDescription(`${member} adlı kullanıcı \`${member.voice.channel.name}\` adlı kanalda bulunuyor.`).setFooter(`Lore ❤️`)).then(msg => msg.delete(9000));

    }

}

exports.conf = { enabled: true, guildOnly: true, aliases: ["ses-kontrol", "sesbilgi"] }

exports.help = { name: "sesbilgi"}