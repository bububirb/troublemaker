const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require("discord.js");
const { verifiedRoleId } = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("end-stage-vote")
        .setDescription("Ends the vote in the vc chat and unlocks the channel."),
    async execute(interaction) {
        // TODO: Command permissions
        const channel = interaction.channel

        // Ensure the command is in a voice based channel
        if (!channel.isVoiceBased()) {
            interaction.reply({
                content: "You're not in a voice based channel!",
                flags: MessageFlags.Ephemeral,
            });
            return;
        }

        // Construct announcement message
        const announcementEmbed = new EmbedBuilder()
            .setColor(0xFF6666)
            .setTitle('Voting has ended!');
        interaction.channel.send({ embeds: [announcementEmbed] });

        interaction.channel.permissionOverwrites.edit(verifiedRoleId, {
            'SendMessages': true,
            'EmbedLinks': true,
            'AttachFiles': true,
        });

        await interaction.reply({
            content: `Ended the vote in ${channel}!`,
            flags: MessageFlags.Ephemeral,
        });
    },
};

