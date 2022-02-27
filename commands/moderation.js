const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moderation')
		.setDescription('The basic Discord moderator\'s kit.')

		// Ban command
		.addSubcommand(subcommand =>
			subcommand
				.setName('ban')
				.setDescription('Ban hammer activated and ready to bonk.')
				.addUserOption(option => option.setName('user').setDescription('User to be banned').setRequired(true)))

		// Kick command
		.addSubcommand(subcommand =>
			subcommand
				.setName('kick')
				.setDescription('Boot someone out of the server.')
				.addUserOption(option => option.setName('user').setDescription('User to be kicked').setRequired(true)))

		// Unban command
		.addSubcommand(subcommand =>
			subcommand
				.setName('unban')
				.setDescription('You have been un-bonked by the hammer.')
				.addUserOption(option => option.setName('id').setDescription('User ID to be unbanned').setRequired(true))),

	async execute(interaction) {

		if (interaction.options.getSubcommand() === 'ban') {
			const user = interaction.options.getUser('user');

			if (user && interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
				interaction.guild.members.ban(user);
				await interaction.reply(`:loudspeaker: ${user} has been banned.`);
			} else {
				await interaction.reply({ content: ':space_invader: Oops! An error occured.', ephemeral: true });
			}
		}

		if (interaction.options.getSubcommand() === 'kick') {
			const member = interaction.options.getMember('user');

			if (member && interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
				member.kick();
				await interaction.reply(`:loudspeaker: ${member} has been kicked.`);
			} else {
				await interaction.reply({ content: ':space_invader: Oops! An error occured.', ephemeral: true });
			}
		}

		if (interaction.options.getSubcommand() === 'unban') {
			const id = interaction.options.get('id') ?.value;
			const user = interaction.options.getUser('id');

			if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
				interaction.guild.members.unban(id);
				await interaction.reply(`:loudspeaker: ${user} has been unbanned.`);
			} else {
				await interaction.reply({ content: ':space_invader: Oops! An error occured.', ephemeral: true });
			}
		}

	},
};