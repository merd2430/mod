const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

if (!message.member.voice.channel) {
return message.reply("Ses kanalında olman lazım!");
}
const filter = (reaction, user) => {
return ['onay', 'carpi'].includes(reaction.emoji.name) && user.id === kullanıcı.id;
};
  
let kullanıcı = message.mentions.members.first()
if (!kullanıcı) return message.channel.send('Bir Kullanıcı Belirt.');

let member = message.guild.member(kullanıcı);

if (!member.voice.channel) return message.channel.send('Etiketlenen Kullanıcı Ses Kanalında Değil.').then(m => m.delete,{timeout: 5000});

const voiceChannel = message.member.voice.channel.id;
if (!voiceChannel) return;
  
let log = new Discord.MessageEmbed()
.setColor("#7289D")
.setDescription(`${kullanıcı}, ${message.author} \`${message.member.voice.channel.name}\` Odasına Çekmek İstiyor. Kabul ediyor musun?`)
.setFooter(`Lore ❤️`)
  
let mesaj = await message.channel.send(log)
await mesaj.react(ayarlar.onay)
await mesaj.react(ayarlar.carpi)
mesaj.awaitReactions(filter, {
max: 1,
time: 60000,
errors: ['time']
}).then(collected => {
const reaction = collected.first();
if (reaction.emoji.name === 'onay') {
let poseidon = new Discord.MessageEmbed()
.setColor("0x348f36")
.setDescription(`${kullanıcı} Odaya Çekilme Teklifini Onayladı`)
.setFooter(`Lore ❤️ Poseidon`)
message.channel.send(poseidon)
kullanıcı.voice.setChannel(message.member.voice.channel.id)
} else {
let lore = new Discord.MessageEmbed()
.setColor("0x800d0d")
.setDescription(`${kullanıcı} Odaya Çekilme Teklifini Reddetti`)
message.channel.send(lore)
}
})
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["gel"],
  permLevel: 0,
}

exports.help = {
  name: 'çek'
  
}