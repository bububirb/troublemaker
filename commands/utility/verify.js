const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, messageLink } = require('discord.js');
const { logId, verifiedRoleId } = require('../../config.json');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Verify')
		.setType(ApplicationCommandType.Message),
	async execute(interaction) {
		// Get target user
		const targetUser = interaction.targetMessage.author;
		// Fetch log channel
		interaction.client.channels.fetch(`${logId}`)
			.then(channel => {
				// Send verified user ID
				channel.send(targetUser.id);
				// Forward verification message
				interaction.targetMessage.forward(channel);
			})
			.catch(console.error);

		// Assign verified role
		interaction.guild.members.fetch(targetUser.id)
			.then(member => member.roles.add(verifiedRoleId))
			.catch(console.error);

		await interaction.reply({
			content: `Verified ${targetUser}! Message has been saved in <#${logId}>`,
			flags: MessageFlags.Ephemeral
		});
	},
};
