const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban hammer activated and ready to bonk.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('User to be banned')
				.setRequired(true)),
				
	async execute(interaction) {

		const member = interaction.options.getMember('user');

		if (member && interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			member.ban();
			await interaction.reply(`:cowboy: ${member} has been banned.`);
		} else {
			await interaction.reply({ content: 'You don\'t have permission to ban someone!', ephemeral: true });
		}

	},
};