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

			const user = interaction.options.getUser('user');
			
			if (user && interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
				interaction.guild.members.ban(user);
				await interaction.reply(`:cowboy: ${user} has been banned.`);
			} else {
				await interaction.reply({ content: ':space_invader: Oops! An error occured.', ephemeral: true });
			}
			
		},
};