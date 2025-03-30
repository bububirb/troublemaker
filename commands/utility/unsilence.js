const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unsilence")
    .setDescription("Unmutes all other voice chat members"),
  async execute(interaction) {
    const user = interaction.member;
    const channel = interaction.member.voice.channel;

    let reply = "You are not in a voice channel!";

    // Ensure the user is in a voice channel
    if (channel != null) {
      // Get voice channel members
      const members = interaction.member.voice.channel.members;
      // Exclude command user
      members.sweep(member => member === user);

      const voiceStates = members.map(member => member.voice);
      voiceStates.forEach(member => member.setMute());

      // Reply with how many members have been unmuted
      const memberCount = voiceStates.length;

      switch (memberCount) {
        case 0:
          reply = "No users to unmute";
          break;

        case 1:
          reply = `Unmuted ${memberCount} user`;
          break;

        default:
          reply = `Unmuted ${memberCount} users`;
          break;
      }
    }

    await interaction.reply({
      content: reply,
      flags: MessageFlags.Ephemeral,
    });
  },
};
