const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('experiments')
		.setDescription('Fresh new commands we are testing out.')

		// Ping command
		.addSubcommand(subcommand =>
			subcommand
				.setName('react')
				.setDescription('Reacts to the message the bot sent.')),

	async execute(interaction) {

		if (interaction.options.getSubcommand() === 'react') {
			const message = await interaction.reply({ content: 'Experimenting with reactions...', fetchReply: true });
			message.react('🚀');
		}

	},
};