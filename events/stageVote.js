const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		// Check if the interaction is a stageVote
		if (!interaction.isButton()) return;
		if (!interaction.customId === "stageVote") return;

		// Create a voting modal
		const voteModal = new ModalBuilder()
			.setCustomId('stageVoteSubmit')
			.setTitle('Rate this idea from 0 to 10');

		// Create modal components
		const ratingInput = new TextInputBuilder()
			.setCustomId('stageVoteRating')
			.setLabel('Rating')
			.setStyle(TextInputStyle.Short)
			.setMinLength(1)
			.setMaxLength(2);
		const actionRow = new ActionRowBuilder().addComponents(ratingInput);

		// Add components to modal
		voteModal.addComponents(actionRow);

		await interaction.showModal(voteModal);
	}
}
