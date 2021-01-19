const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = async (bot , message, args) => {

  if(message.author.bot || message.channel.type === "dm") return;

  if(!message.member.roles.cache.has(ayarlar.botcommand) && !message.member.hasPermission('ADMINISTRATOR')) return
  
  let embed = new MessageEmbed().setColor("#00ffff")
  var user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  var designer = message.guild.roles.cache.get(ayarlar.vip)
  
  if(!user) return message.reply ("Bir üye belirtmelsiniz.").then(m => m.delete(9000));
  if(!designer) return 


 
  
  if(user.roles.cache.has(designer)){ 
  await user.roles.remove(designer);
  message.channel.send(embed.setDescription("<@"+user.id+"> üyesinden \`"+designer.name+"\` rolü alındı. ").setFooter(`Lore ❤️`)).then(msg => msg.delete({ timeout: 15000}))


  } else {
  if(!user.roles.cache.has(designer)){
  await (user.roles.add(designer));

  message.channel.send(embed.setDescription("<@"+user.id+"> üyesine \`"+designer.name+"\` rolü verildi.").setAuthor(`${message.author.tag}`, message.author.avatarURL).setFooter(`Lore ❤️`)).then(msg => msg.delete({ timeout: 15000}))
  }
  }
  }




exports.conf = { enabled: true, guildOnly: false, aliases: ['vip','vıp',] };

exports.help = { name: 'vip' };