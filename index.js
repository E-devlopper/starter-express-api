const Discord = require('discord.js');
const config = require("./config.json");
const bot = new Discord.Client({disableEveryone: true});

bot.login(config.token);

// Log stats-bot in to the server and set status
bot.on("ready", async () => {
console.log(`${bot.user.username} has logged on.`)
bot.user.setActivity('Half Life 3', { type: 'PLAYING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);

// Get our server
const guild = bot.guilds.get('1082747697154498620');

// Get our stats channels
const totalUsers = bot.channels.get('1091347020977029261');
const onlineUsers = bot.channels.get('1091347067982581902');
const dndUsers = bot.channels.get('1091348016998396054');
const idleUsers = bot.channels.get('1091349814056321099');

// Check every 30 seconds for changes
setInterval(function() {
  console.log('Getting stats update..')

  //Get actual counts
  var userCount = guild.memberCount;
  var onlineCount = guild.members.filter(m => m.presence.status === 'online').size
  var dndCount = guild.members.filter(m => m.presence.status === 'dnd').size
  var idleCount = guild.members.filter(m => m.presence.status === 'idle').size
  
  // Log counts for debugging
  console.log("Total Users: " + "(",userCount,")");
  console.log("Online Users: " + onlineCount);
  console.log("dnd Users: " + dndCount);
  console.log("idle Users: " + idleCount);

  // Set channel names
  totalUsers.setName("👤 " + userCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);

  onlineUsers.setName("🟢 " + onlineCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);

  dndUsers.setName("🔴 " + dndCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);

  idleUsers.setName("🟠 " + idleCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);
  }, 5000)

});

bot.on('message', async message => {
  if(message.author.bot) return;

  let prefix = config.prefix;
  let messageBody = message.content.split(" ");
  let command = messageBody[0];


  if(command == `${prefix}code`){
    let repo = new Discord.RichEmbed()
    .setDescription("Stats Bot Repository")
    .setColor("#00FF00")
    .addField("Github", "https://github.com/CodeSpent/discord-stats");
 

    return message.channel.send(repo);
  }
});



