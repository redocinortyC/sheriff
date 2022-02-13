const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Boot someone out of the server.')
		.addStringOption(option =>
			option.setName('target')
				.setDescription('User to be muted')
				.setRequired(true)),
				
	async execute(interaction) {

		const member = interaction.options.getMember('target');

		if (member && member.roles.cache.some(role => role.name === 'Staff Team')) {
			member.kick();
		} else {
			await interaction.reply({ content: 'You don\'t have permission to kick someone!', ephemeral: true });
		}

	},
};