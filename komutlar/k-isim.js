const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
  if(!message.member.roles.cache.has(ayarlar.register) && !message.member.hasPermission("ADMINISTRATOR")) return;
  
 const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  if(!member) return message.channel.send('Bir kullanıcı Belirt?')
  
  let tag = ayarlar.tag
  let isim = args[1]
  if(!isim) return message.channel.send('Bir isim belirlemelisin?')
  const lore = message.guild.member(member)
  
  lore.setNickname(`${isim}${tag}`)
  
  const lorepeyniri = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL ({ dynamic : true }))
  .setDescription(`• <@${lore.id}>, Kullanıcının adı başarılı bir şekilde değiştirildi\n• Değiştirilen yeni isim: \`${isim}\` `)
  .setFooter(`Lore ❤️`)
  message.channel.send(lorepeyniri)
  message.react(ayarlar.onay)
  
}

exports.conf = { enabled: true, guildOnly: false, aliases: ["isim", "i", "nick"], permLevel: 0};

exports.help = { name: 'isim' };