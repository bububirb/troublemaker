const { SlashCommandBuilder, MessageFlags, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { verifiedRoleId } = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("start-stage-vote")
        .setDescription("Starts a vote in the vc chat and locks the channel"),
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
            .setColor(0x0099FF)
            .setTitle('Voting has started!')
            .setFooter({ text: 'Click the button below to vote!' });

        // Add the vote button
        const voteButton = new ButtonBuilder()
            .setCustomId('stageVote')
            .setLabel('Vote')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
            .addComponents(voteButton);

        interaction.channel.send({
            embeds: [announcementEmbed],
            components: [row],
        });

        interaction.channel.permissionOverwrites.edit(verifiedRoleId, {
            'SendMessages': false,
            'EmbedLinks': false,
            'AttachFiles': false
        });

        await interaction.reply({
            content: `Started a vote in ${channel}!`,
            flags: MessageFlags.Ephemeral,
        });
    },
};

