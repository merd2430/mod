const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json")


module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(ayarlar.MuteYetki) && !message.member.hasPermission("ADMINISTRATOR")) return;

    let embed = new MessageEmbed().setColor("GREEN").setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    let member = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!member) return message.channel.send(embed.setDescription(`Geçerli bir kullanıcıyı etiketleyiniz`).setFooter(`Lore ❤️`))
    if(!member.guild.members) message.channel.send(embed.setDescription(`Etiketlediğiniz kullanıcı sunucuda bulunmamaktadır.`).setFooter(`Lore ❤️`))
    if(!member.roles.cache.has(ayarlar.muteli)) return message.channel.send(embed.setDescription(`Etiketlediğiniz kullanıcı muteli değil.`).setFooter(`Lore ❤️`))

    else {
    member.roles.remove(ayarlar.muteli)

    message.channel.send(embed.setDescription(`${member} adlı kullanıcının mutesi <@${message.author.id}> yetkilisi tarafından açıldı.`).setFooter(`Lore ❤️`))
    }
}

exports.conf = { enabled: true, guildOnly: true, aliases: ["unmute"] }

exports.help = { name : "unmute" }