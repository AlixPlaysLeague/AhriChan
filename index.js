
                    //BEGINNING AND BOT CONFIG SECTION
//------------------------------------------------------------------------------

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

const fs = require('fs');
const warnings = require('./warnings.json');
const warningContent = require('./warningcontent.json');
const weather = require('weather-js');
const moment = require('moment-timezone');


let mod = "Alix";
let mod2 = "Alix";
let admin = "Alix";
let techteam = "|--Bot Builders & Tech Team--|";
let guildrunners = "Guild Runners";
let footer = "League Lounge Bot ♡";
let botcolor = "#2345bd";

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity("a.help")
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let msg = message.content.toUpperCase();
  let cont = message.content.slice(prefix.length).split(" ");
  let args = cont.slice(1);

//------------------------------------------------------------------------------
                    //THIS IS THE BOT INFO SECTION
//------------------------------------------------------------------------------

  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("__**BOT INFORMATION:**__")
    .setColor(botcolor)
    .setThumbnail(bicon)
    .addField("__Bot Name:__", bot.user.username)
    .addField("__Bot Creator:__", "Alix ♡")
    .addField("__Created On:__", bot.user.createdAt)
    .addField("__Description:__", "Bot Created for League Lounge Server")
    .setFooter(footer, message.guild.iconURL)

    return message.channel.send(botembed)
    .then(msg => {
      message.delete()
    });
  }

  if (cmd === `${prefix}help`){

    let embed = new Discord.RichEmbed()
    .setThumbnail(bot.user.displayAvatarURL)
    .setTitle('Ahri Help Menu')
    .setColor(botcolor)
    .setFooter(footer, message.guild.iconURL)
    .addField(`**${prefix}8ball** or **@Ahri Chan**`, 'followed by a yes/no question.')
  
    .addField(`**${prefix}warnings**`, 'lets you see how many warnings you have in a PM (just in case you wanna keep your tea to yourself).')
    .addField(`**${prefix}botinfo**`, 'if you\'d like to know a little more about me!')


    message.channel.send(embed);
  }

  if (cmd === `${prefix}modhelp`){
    if (!message.member.roles.find("name", mod2)){
      return;
    }

    let embed = new Discord.RichEmbed()
    .setThumbnail(bot.user.displayAvatarURL)
    .setTitle('TTL MOD HELP MENU')
    .setColor(botcolor)
    .setFooter(footer, message.guild.iconURL)
    .addField(`**${prefix}members**`, `Lets you see how many members our server currently has.`)
    .addField(`**${prefix}purge [2-100]**`, `Lets you purge 2-100 messages in a channel.`)
    .addField(`**${prefix}warn @user**`, `Followed by your custom message, sends a warning directly to the user via PM. The warning sender retains anonymity from the user.`)
    .addField(`**${prefix}userwarnings @user**`, `Allows you to see how many warnings a user has.`)
    .addField(`**${prefix}lastwarningmessage @user**`, `Allows you to see the last custom warning message the user received.`)
    .addField(`**${prefix}removewarnings @user #**`, `Allows you to remove a custom number of warnings from a user's record (# represents your custom number).`)
    .addField(`**${prefix}removeallwarnings @user**`, `Removes all warnings from a users record.`)

    message.channel.send(embed)
  }

//------------------------------------------------------------------------------
                    //THIS IS THE @EVERYONE PINGING SECTION
//------------------------------------------------------------------------------

  if (message.content.includes('@everyone')) {

    if (message.member.roles.find("name", guildrunners)) {
      return;
    }

    message.channel.send("Please do not attempt to ping everyone in the server! :middle_finger:")

    let botembed = new Discord.RichEmbed()
    .setColor(botcolor)
    .setThumbnail(message.author.displayAvatarURL)
    .addField("__Rule Broken:__", "Attempt to ping or @ everyone in the server")
    .addField("__Sender:__", (message.author.tag))
    .addField("__In Channel:__", (message.channel))
    .addField("__Message:__", (message.content))
    .setFooter(footer, message.guild.iconURL)
    .setTimestamp()

    return bot.channels.get("462692105408610304").send(botembed);

  }

  if (message.content.includes('@here')) {

    if (message.member.roles.find("name", guildrunners)) {
      return;
    }

    message.channel.send("Please do not attempt to ping everyone in the server! :middle_finger:")

    let botembed = new Discord.RichEmbed()
    .setColor(botcolor)
    .setThumbnail(message.author.displayAvatarURL)
    .addField("__Rule Broken:__", "Attempt to ping or @ everyone in the server")
    .addField("__Sender:__", (message.author.tag))
    .addField("__In Channel:__", (message.channel))
    .addField("__Message:__", (message.content))
    .setFooter(footer, message.guild.iconURL)
    .setTimestamp()

    return bot.channels.get("462692105408610304").send(botembed);

  }

//------------------------------------------------------------------------------
                    //END OF PINGING SECTION
//------------------------------------------------------------------------------
                    //THIS IS THE ATTA SECTION
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
                    //END OF ATTA SECTION
//------------------------------------------------------------------------------
                    //PURGE COMMAND SECTION
//------------------------------------------------------------------------------

if (msg.startsWith(prefix + 'clear')) {

  async function purge() {
    message.delete();

    if (!message.member.roles.find("name", mod)) {
      message.channel.send('You must be a member of the Admin Council to use this command.')
      .then(message => {
        message.delete(5000)
      })
      return;
    }

    const fetched = await message.channel.fetchMessages({limit: args[0]});
    console.log(fetched.size + ' messages found, deleting. . . ');

    message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Error: ${error.message}`));

  if (fetched.size < 1){
    message.channel.send(`I couldn't find any messages to delete. :sob:`)
    .then(message => {
      message.delete(7000)
    });
  }

  if (fetched.size === 1){
    message.channel.send(`I have deleted **${fetched.size}** message for you! :smile:`)
    .then(message => {
      message.delete(7000)
    });
  }

  if (fetched.size > 1){
    message.channel.send(`I have deleted **${fetched.size}** messages for you! :smile:`)
    .then(message => {
      message.delete(7000)
    });
  }

}
  purge()

  const fetched = await message.channel.fetchMessages({limit: args[0]});

  if (message.member.roles.find("name", admin)){
    return;
  }

  if (message.member.roles.find("name", mod)){

    let botembed = new Discord.RichEmbed()

    .setTitle("__A PURGE HAS OCCURED:__")
    .setDescription(`${message.author.username} has used the purge function.`)
    .setThumbnail(message.author.displayAvatarURL)
    .setColor(botcolor)
    .addField("Council Member:", message.author)
    .addField("Channel Affected:", message.channel)
    .addField("Messages Deleted:", `**${fetched.size}**`)
    .setFooter(footer, message.guild.iconURL)
    .setTimestamp()

    bot.channels.get('462692105408610304').send(botembed)
    bot.users.get('324532196872552459').send(botembed)
    bot.users.get('519640905280389199').send(botembed);
  };
}

//------------------------------------------------------------------------------
                    //END OF PURGE COMMAND SECTION
//------------------------------------------------------------------------------
                    //BEGINNING OF WARN MESSAGE SECTION
//------------------------------------------------------------------------------

if (cmd === `${prefix}warn`) {

  if (!message.member.roles.find("name", mod)) {
    message.channel.send("You must be a member of the Admin Council to use this command!")
    bot.channels.get("462692105408610304").send(`${message.author} just tried to send a warning with the message:\n**${message.content}**`)
    return;
  }

  if (message.author.bot) {
    return;
  }

  let member = message.mentions.users.first();
  let mentionMessage = message.content.slice (8);

  if (!mentionMessage.slice(20)) {
    message.channel.send("__**ERROR**__: You must include a reason for the warning. You can do this by simply typing a reason after the mentioned user.")
    return;
  }

  let warningsAdd = Math.floor(Math.random() * 1) + 1;
  console.log(warningsAdd);

  if(!warnings[member.tag]){
  warnings[member.tag] = 0;
  }

  let curwarnings = warnings[member.tag];
  warnings[member.tag] =  curwarnings + warningsAdd;

  fs.writeFile("./warnings.json", JSON.stringify(warnings), (err) => {
    if(err) console.log(err)
  });

  member.send(`**You have received a warning from the Leaguers Lounge Server:** \n ${mentionMessage.slice(20)}`);

  message.channel.send("Warning Sent!");

  let botembed = new Discord.RichEmbed()
  .setColor(botcolor)
  .setThumbnail(member.displayAvatarURL)
  .addField(`__**${message.author.tag} has just sent a warning!**__`, "The warning message was successfully delivered to the recipient! :smile:")
  .addField("__User warned:__", `${member}`)
  .addField("__The user received this bot message:__", "**You have received a warning from the Leaguers Lounge Server:**")
  .addField("__Succeeded by this custom message:__", (mentionMessage.slice(20)))
  .setFooter(footer, message.guild.iconURL)
  .setTimestamp()

  bot.channels.get("462692105408610304").send(botembed)
  bot.users.get("519640905280389199").send(botembed);

  let warningContentAdd = mentionMessage.slice(21);

  if(!warningContent[member.tag]){
  warningContent[member.tag] = 0;
  }

  let curwarningContent = warningContent[member.tag];
  warningContent[member.tag] = warningContentAdd;

  fs.writeFile("./warningcontent.json", JSON.stringify(warningContent), (err) => {
    if(err) console.log(err)
  });

}

//------------------------------------------------------------------------------
                    //REMOVE WARNINGS
//------------------------------------------------------------------------------

if (cmd === `${prefix}removewarnings`) {
  if (!message.member.roles.find("name", mod)) {
    message.channel.send("You must be a member of the Admin Council to use this command!")
    return;
  }
  let member = message.mentions.users.first();
  if (isNaN(message.content.slice(38))) {
    message.channel.send('Please enter a valid, positive number.')
    return;
  }
  warnings[member.tag] = warnings[member.tag] - message.content.slice(38);
  fs.writeFile("./warnings.json", JSON.stringify(warnings), (err) => {
    if(err) console.log(err)
  });
  message.channel.send(`${member} has had **${message.content.slice(38)}** warnings removed.`)
  bot.users.get('324532196872552459').send(`${message.author} has just removed **${message.content.slice(38)}** warnings from ${member.username}'s record.`)
  bot.users.get('519640905280389199').send(`${message.author} has just removed **${message.content.slice(38)}** warnings from ${member.username}'s record.`);
}

if (cmd === `${prefix}removeallwarnings`) {
  if (!message.member.roles.find("name", mod)) {
    message.channel.send("You must be a member of the Admin Council to use this command!")
    return;
  }
  let member = message.mentions.users.first();
  warnings[member.tag] = warnings[member.tag] - warnings[member.tag];
  fs.writeFile("./warnings.json", JSON.stringify(warnings), (err) => {
    if(err) console.log(err)
  });
  message.channel.send(`${member} has had all warnings removed.`);
  bot.users.get('324532196872552459').send(`${message.author} has just removed ALL warnings from ${member.username}'s record.`)
  bot.users.get('519640905280389199').send(`${message.author} has just removed ALL warnings from ${member.username}'s record.`);
}

//------------------------------------------------------------------------------
                    //END OF WARN MESSAGE SECTION
//------------------------------------------------------------------------------
                    //WARNINGS COUNT
//------------------------------------------------------------------------------

if (cmd === `${prefix}warnings`) {

  if (!warnings[message.author.tag]) {
    message.author.send(`${message.author}, you have no current warnings!`)
    message.channel.send('I have sent you a PM! :thumbsup:')
    return;
  }
  if (warnings[message.author.tag] === 1) {
    message.author.send(`${message.author}, you currently have **${warnings[message.author.tag]}** warning.`)
    message.channel.send('I have sent you a PM! :thumbsup:')
    return;
  }
  if (warnings[message.author.tag] > 1) {
    message.author.send(`${message.author}, you currently have **${warnings[message.author.tag]}** warnings.`)
    message.channel.send('I have sent you a PM! :thumbsup:')
    return;
  }
}

//------------------------------------------------------------------------------
                    //WARNINGS CONTENT
//------------------------------------------------------------------------------

if (cmd === `${prefix}lastwarningmessage`) {

  if (!message.member.roles.find("name", mod)) {
    message.channel.send("You must be a member of the Admin Council to use this command!")
    return;
  }

  let member = message.mentions.users.first();

  if (!warningContent[member.tag]) {
    message.channel.send(`${member} has no recorded warning messages.`)
    return;
  }
  message.channel.send(`${member}'s last warning message was: \n\n "${warningContent[member.tag]}"`);
}

//------------------------------------------------------------------------------
                    //USER WARNINGS COUNT
//------------------------------------------------------------------------------

if (cmd === `${prefix}userwarnings`) {

let member = message.mentions.users.first();

  if (!message.member.roles.find("name", mod)) {
    message.channel.send("You must be a member of the Admin Council to use this command!")
    return;
  }
  if (!warnings[member.tag]) {
    message.channel.send(`${member} has no warnings.`)
    return;
  }
  if (warnings[member.tag] === 1) {
    message.channel.send(`${member} has **${warnings[member.tag]}** warning.`)
    return;
  }
  if (warnings[member.tag] > 1) {
    message.channel.send(`${member} has **${warnings[member.tag]}** warnings.`)
    return;
  }
}

//------------------------------------------------------------------------------
                    //START MEMBER COUNT SECTION
//------------------------------------------------------------------------------

if (message.content.startsWith(prefix + "members")){
  if (!message.member.roles.find("name", mod2)){
    return message.reply("you must be in the Admin Council to use this command.");
  }

  let botembed = new Discord.RichEmbed()
  .setThumbnail(message.guild.iconURL)
  .setTitle("__**MEMBER COUNT:**__")
  .setColor(botcolor)
  .addField("This server currently has:", `**${message.guild.memberCount}** members!
            \n **${message.guild.members.filter(m => m.presence.status !== 'offline').size}** are online!`)
  .setFooter(footer, message.guild.iconURL)
  .setTimestamp()
  return message.channel.send(botembed);

}

//------------------------------------------------------------------------------
                    //END OF MEMBER COUNT SECTION
//------------------------------------------------------------------------------
                    //START BOT MESSAGE SECTION
//------------------------------------------------------------------------------

if (message.content.startsWith(prefix + "botmsg")){
  if (!message.member.roles.find("name", mod)){
    return;
  }
return message.channel.send(message.content.slice(7))
  .then(msg => {
    message.delete()
  });

}

//------------------------------------------------------------------------------
                    //END BOT MESSAGE SECTION
//------------------------------------------------------------------------------
                    //BEGINNING OF MAGIC 8-BALL SECTION
//------------------------------------------------------------------------------

var rand = ['Hell yeah', 'Yeah pretty much..', 'Without a doubt', 'Yes - definitely', 'UwU', "Yes daddy",
            'You may rely on it.', 'As I see it, yes.', 'Outlook good.', 'Yes.', 'ohhh my godddd', '*makes ahri noises*',
            'Signs point to yes.', 'Better not tell you now. :eyes: ', ' Honestly, I dont have ALL the answers kid..',
            'Don\'t count on it.', 'My reply is no.', 'My sources say no.', 'hehe :3', 'Wha?', 'Sorry, I dont know you like that..',
            'Outlook not so good.', 'Very doubtful.', 'Fuck no', 'Maybeeeeeeee', 
            'Idk sorry', 'Can you not @ me... ever again'];

if (message.content.startsWith(prefix + '8ball')){

  var answer = rand[Math.floor(Math.random()*rand.length)];

  return message.channel.send(answer);

}

if (message.content.includes('629803915377901578')){

  var answer = rand[Math.floor(Math.random()*rand.length)];

  return message.channel.send(answer);
}

//------------------------------------------------------------------------------
                    //USER INFO SECTION
//------------------------------------------------------------------------------

if (cmd === `${prefix}userinfo`){
  if (!message.member.roles.find("name", mod2)){
    return message.reply("you must be Alix to use this command.");
  }

  let member = message.mentions.users.first();

  var time = moment(member.createdTimestamp).format("ddd MMM-DD-YYYY h:mm A");

  let botembed = new Discord.RichEmbed()
  .setColor("#2345bd")
  .setThumbnail(member.displayAvatarURL)
  .setTitle(`**${member.username.toUpperCase()}**`)
  .setDescription(`__**Member Information:**__`)
  .addField("Discord Username:", member.tag)
  .addField("Nickname:", member)
  .addField("Current Status:", member.presence.status)
  .addField("Discord Created On:", time)
  .setFooter(footer, message.guild.iconURL)
  .setTimestamp()

  return message.channel.send(botembed)
  .catch(error => message.reply(`Error: ${error}`));
}

//------------------------------------------------------------------------------
                    //BOTMIN PERSONAL MESSAGE
//------------------------------------------------------------------------------

if (cmd === `${prefix}membermessage`) {

  if (!message.member.roles.find("name", admin)){
    return;
  }

  let member = message.mentions.users.first();

  let customMessage = message.content.slice(37);

  member.send(`**This is a message from the A-League server:**\n${customMessage}`)
  message.author.send(`__Receipt:__\n**This is a message from the A-League server:**\n${customMessage}`)
  bot.channels.get('462692105408610304').send(`${message.author.tag} sent to ${member.tag} the following:\n**This is a message from the A-League server:**\n${customMessage}`)

}

//------------------------------------------------------------------------------

});

//------------------------------------------------------------------------------
                    //BEGINNING OF WELCOME/LEAVE SECTION
//------------------------------------------------------------------------------

bot.on('guildMemberAdd', member => {
  var time = moment(member.user.createdTimestamp).tz('America/Los_Angeles').format("ddd MMM-DD-YYYY h:mm A");
  var frmNow = moment(member.user.createdTimestamp).fromNow();
    let channel = member.guild.channels.find('id', '453058294286778390');
    let memberavatar = member.user.avatarURL
    let footer = "Toontown 21+ Rewritten & Corporate Clash";
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor(botcolor)
        .setThumbnail(member.user.displayAvatarURL)
        .addField("__New Member__ <:yitalian_hand_gesture:453312583110492183>", `${member}`)
        .addField('__**WELCOME TO TOP TOONS LEAGUE!!!**__ <:zttrfflip:453312183267229696>', 'Please be sure to __`READ THE RULES`__ and leave a <:zttrpp:453312582619496448> when you\'ve finished!')
        .addField("***How to gain server access:*** <:zttrgjb:453314524741632010>:exclamation:", `You can get verified by reading the ${bot.channels.find('id', '497642958661877770')} and following the steps :) <:zttrccash:453315147839176708>`)
        .addField("You are member number:", `**${member.guild.memberCount}** <:PikaHappy:454094827328634881>`)
        .setFooter(footer, member.guild.iconURL)
        .setTimestamp()

        channel.send(embed);

        let channel2 = member.guild.channels.find('id', '462692105408610304')
        let embed2 = new Discord.RichEmbed()
        .setColor(botcolor)
        .setThumbnail(member.user.displayAvatarURL)
        .setTitle('New Member:')
        .addField('Nickname', member)
        .addField('Discord Name:', member.user.tag)
        .addField('Discord Account Created:', `${time} Toontown Time\n${frmNow}`)
        .addField('Member Number:', member.guild.memberCount)
        .setFooter(footer, member.guild.iconURL)
        .setTimestamp()

        channel2.send(embed2);

        member.send(`Welcome to Top Toons League! :fire: \nBe sure to read through the rules - and answer the server questions so that you can enter the rest of **${member.guild.name}!!!** \nHope you enjoy the guild! Be sure to check out our run schedule, and we'll see you around! :smile:`);

});

bot.on('guildMemberAdd', member => {

    console.log(`${member.user.tag}`, "has joined" + `${member.guild.name}`)

});

bot.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('id', '462692105408610304');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor(botcolor)
        .setThumbnail(member.user.displayAvatarURL)
        .addField(`${member.user.tag}`, "has just left the server.")
        .addField('FUCK YOU!!', `${member.user.username}`)
        .addField("Go eat a dick!", "-----------------------")
        .addField('The server now has', `**${member.guild.memberCount}**` + " members <453314524767059978>")
        .setFooter(footer, member.guild.iconURL)
        .setTimestamp()

        channel.send(embed);
});

bot.on('guildMemberRemove', member => {
    console.log(`${member.user.tag}` + "has left" + `${member.guild.name}` + "Sending leave message now")
    console.log("Leave Message Sent")
});

//------------------------------------------------------------------------------
                    //END OF WELCOME/LEAVE SECTION
//------------------------------------------------------------------------------

bot.login(botconfig.token);
