const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Everything about your roles in the server.')

        // Add role command
		.addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add another role to your growing profile.')
                .addRoleOption(option => option.setName('role').setDescription('Role to be added').setRequired(true))
                .addUserOption(option => option.setName('user').setDescription('User to be modified').setRequired(true)))
        
        // Has role command
		.addSubcommand(subcommand =>
            subcommand
                .setName('has')
                .setDescription('Check if someone has a role.')
                .addRoleOption(option => option.setName('role').setDescription('Role to be investigated').setRequired(true))
                .addUserOption(option => option.setName('user').setDescription('User to be investigated').setRequired(true))),
        
	async execute(interaction) {
        
        if (interaction.options.getSubcommand() === 'add') {
            const role = interaction.options.getRole('role');
            const user = interaction.options.getMember('user');

            if (!user.roles.cache.has(role) && interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)){
                user.roles.add(role);
                await interaction.reply(`${user} has been crowned a new role: ${role.name}.`);
            } else {
                await interaction.reply({ content: ':space_invader: Oops! An error occured.', ephemeral: true });
            }
        }
	},
};