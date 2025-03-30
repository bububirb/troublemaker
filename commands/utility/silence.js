const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("silence")
    .setDescription("Mutes all other voice chat members"),
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

      // Reply with how many members have been muted
      const memberCount = voiceStates.length;

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
    }

    await interaction.reply({
      content: reply,
      flags: MessageFlags.Ephemeral,
    });
  },
};
