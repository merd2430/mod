const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

module.exports.run = async(client, message, args) => {
   
    if(!message.member.roles.cache.has(ayarlar.jailyetkilisi) && !message.member.hasPermission("ADMINISTRATOR")) return;

    let member = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]) 
    if(!member) return message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL).setDescription("Eksik argüman girildi, Bir üye belirtip tekrar deneyin.").setColor(message.member.displayHexColor).setFooter(`Lore ❤️`)).then(m => m.delete({timeout:10000}))
    if(member.hasPermission("ADMINISTRATOR")) return
    if(!member.roles.cache.has(ayarlar.Karantina)&& !member.roles.cache.has(ayarlar.Cezalı)) return message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL).setDescription("Etiketlediğin kullanıcı cezalıda değil.").setColor(message.member.displayHexColor).setFooter(`Lore ❤️`)).then(m => m.delete({timeout:10000}))
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply("Bu Kullanıcı Sizle Aynı Veya Sizden Üst Pozisyonda.");
   
        else {
    if(member.roles.cache.has(ayarlar.Karantina) && member.roles.cache.has(ayarlar.Cezalı)) 
    message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor(message.member.displayHexColor).setDescription("Etiketlediğin kullanıcı cezalıdan çıkartıldı.").setFooter(`Lore ❤️`)).then(e => e.delete({timeout:10000}));;
    client.channels.cache.get(ayarlar.CezalıLog).send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(message.member.displayHexColor).setDescription("<@"+member+"> (\`"+member.id+"\`) Adlı kullanıcı cezalıdan çıkarıldı.").setFooter(`Lore ❤️`))
   
    let roller = db.fetch(`cezarolleri.${member.id}`)
    await member.roles.set(roller)
    await member.roles.add(ayarlar.Unregister)
   
    await db.delete(`cezarolleri.${member.id}`)
    await db.delete(`jail_${member.id}`)



}

   message.react(ayarlar.onay)
}


exports.conf = { enabled: true, guildOnly: true, aliases: ["cezakaldır", "unjail"] }

exports.help = { name: "unjail" }