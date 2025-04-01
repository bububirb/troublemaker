const { ContextMenuCommandBuilder, ApplicationCommandType, channelLink, messageLink } = require('discord.js');
const { logId, verifiedRoleId } = require('../../config.json');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Verify')
		.setType(ApplicationCommandType.Message),
	async execute(interaction) {
		// Fetch log channel
		interaction.client.channels.fetch(`${logId}`)
			.then(channel => {
				// Send verified user ID
				channel.send(interaction.targetId);
				// Forward verification message
				interaction.targetMessage.forward(channel);
			})
			.catch(console.error);

		// Assign verified role
		interaction.targetMessage.member.roles.add(verifiedRoleId)
			.catch(console.error);

		await interaction.reply(`Log has been saved in <#${logId}>`);
	},
};
