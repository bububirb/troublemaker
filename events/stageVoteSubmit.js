const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, MessageFlags } = require('discord.js');
const jsonfile = require('jsonfile');
const stageVoteFile = 'data/stageVote.json';

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		// Check if the interaction is a stageVote
		if (!interaction.isModalSubmit()) return;
		if (!interaction.customId === "stageVoteSubmit") return;

		// Fetch rating input
		const ratingInput = interaction.fields.getTextInputValue('stageVoteRating');
		const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);
		if (!isNumeric(ratingInput)) {
			await interaction.reply({
				content: "This is not a number, silly!",
				flags: MessageFlags.Ephemeral,
			});
			return;
		}
		const rating = Math.max(Math.min(Number.parseInt(ratingInput), 10), 0);
		var ratingList = {}
		await jsonfile.readFile(stageVoteFile)
			.then(obj => ratingList = obj['ratingList'])
			.catch(error => console.error(error));
		ratingList[interaction.member] = rating;
		console.log(ratingList);
		jsonfile.writeFile(stageVoteFile, { "ratingList": ratingList }).catch(error => console.error(error));

		await interaction.reply({
			content: `Your vote is ${rating}`,
			flags: MessageFlags.Ephemeral,
		});
	}
}
