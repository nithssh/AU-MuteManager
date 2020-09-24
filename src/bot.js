const discord = require('discord.js')
const client = new discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
  if (msg.content === "$mute") { muteAll(msg); }
  if (msg.content === "$unmute") { unmuteAll(msg); }
  if (msg.content === "$toggle") { toggleAll(msg); }
});

async function toggleAll(msg) {
  const members = getConnectedMembers(msg);
  if (members.length == 0) { return; }
  for (const member of members) {
    let isMuted = member.voice.mute;
    member.edit({ "mute": !isMuted }, "toggled by MuteMgr, discussion period is over.");
    console.log(`${member.displayName} has been toggled.`);
  }
  console.log("Everyone has been toggled.");
}

async function muteAll(msg) {
  const members = getConnectedMembers(msg);
  if (members.length == 0) { return; }
  for (const member of members) {
    member.edit({ "mute": true }, "Muted by MuteMgr, discussion period is over.");
    console.log(`${member.displayName} has been muted.`);
  }
  console.log("Everyone has been muted.");
}

async function unmuteAll(msg) {
  const members = getConnectedMembers(msg);
  if (members.length == 0) { return; }
  for (const member of members) {
    member.edit({ "mute": false });
    console.log(`${member.displayName} has been unmuted.`);
  }
  console.log("Everyone has been unmuted.");
}

function getConnectedMembers(msg) {

  // This is another implementation where the bot 
  // gets the name specified voice channel in the guild.
  // let voiceChannel = msg.guild.channels.cache
  //   .filter(c => c.type === "voice")
  //   .filter(c => c.name === "General")
  //   .array()[0];

  try {
    let voiceChannel = msg.member.voice.channel;
    let members = voiceChannel.members.array();
    return members;
  } catch (e) {
    msg.reply("connect to a voice channel before issuing commands.");
    return [];
  }
}

module.exports = {client, unmuteAll};