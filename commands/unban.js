const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('You have been un-bonked by the hammer.')
		.addUserOption(option =>
			option.setName('id')
				.setDescription('User ID to be unbanned')
				.setRequired(true)),
				
	async execute(interaction) {

		const id = interaction.options.get('id')?.value;
        const user = interaction.options.getUser('id');

		if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
			interaction.guild.members.unban(id);
			await interaction.reply(`:cowboy: ${user} has been unbanned.`);
		} else {
			await interaction.reply({ content: ':space_invader: Oops! An error occured.', ephemeral: true });
		}

	},
};