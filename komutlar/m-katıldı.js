const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const Discord = require("discord.js");
const qdb = require("quick.db");
const db = new qdb.table("ban");
const ayarlar = require('../ayarlar.json')

module.exports.run = async(client, message, args)  => {
  
  
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();
  if(!message.member.roles.cache.has(ayarlar.botcommand) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Yoklama komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  if(!message.member.voice || message.member.voice.channelID != ayarlar.katıldıkanal) return;
  
  let members = message.guild.members.cache.filter(member => member.roles.cache.has(ayarlar.katıldı) && member.voice.channelID != ayarlar.katıldıkanal);
  members.array().forEach((member, index) => {
    setTimeout(() => {
      member.roles.remove(ayarlar.katıldı).catch();
    }, index * 1250)
  });
  let verildi = message.member.voice.channel.members.filter(member => !member.roles.cache.has(ayarlar.katıldı) && !member.user.bot)
  verildi.array().forEach((member, index) => {
    setTimeout(() => {
      member.roles.add(ayarlar.katıldı).catch();
    }, index * 1250)
  });
  message.channel.send(embed.setDescription(`Katıldı rolü dağıtılmaya başlandı! \n\n🟢 **Rol Verilecek:** ${verildi.size} \n🔴 **Rol Alınacak:** ${members.size}`)).catch();

  }


exports.conf = { enabled: true, guildOnly: false, aliases: ["katıldı", "k-dağıt"], permLevel: 0};

exports.help = { name: 'katıldı' };