const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unsilence")
    .setDescription("Unmutes all other voice chat members"),
  async execute(interaction) {
    // Get command user
    const user = interaction.member;
    // Get voice channel members
    const members = interaction.member.voice.channel.members;
    // Exclude command user
    members.sweep(member => member === user);

    const voiceStates = members.map(member => member.voice);
    voiceStates.forEach(member => member.setMute(false));

    // Reply with how many members have been unmuted
    const memberCount = voiceStates.length;
    let reply = "";
    switch (memberCount) {
      case 0:
        reply = "No users to mute";
        break;

      case 1:
        reply = `Muted ${memberCount} user`;
        break;

      default:
        reply = `Muted ${memberCount} users`;
        break;
    }

    await interaction.reply({
      content: reply,
      flags: MessageFlags.Ephemeral,
    });
  },
};
