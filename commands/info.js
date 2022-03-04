// Imports
const { SlashCommandBuilder } = require('@discordjs/builders');

// Utility commands module
module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Information about IJHS.')
		
		// About IJHS command
		.addSubcommand(subcommand =>
			subcommand
				.setName('about')
				.setDescription('What is the International Junior Honor Society (or IJHS)?'))

		// Committees info command
		.addSubcommand(subcommand =>
			subcommand
				.setName('committees')
				.setDescription('A list of the IJHS SLC committees and what they do.'))
		
		// SLC info command
		.addSubcommand(subcommand =>
			subcommand
				.setName('slc')
				.setDescription('What is the IJHS Student Leadership Council (or IJHS SLC)?')),

	async execute(interaction) {

		if (interaction.options.getSubcommand() === 'about') {
			await interaction.reply(":trophy: The International Junior Honor Society (IJHS) is an honor society that focuses on developing leaders and enabling its members to achieve SUCCESS in academic and life pursuits. IJHS provides its members with a variety of platforms and opportunities to unleash their full potential, as well as connect with their community. IJHS is probably the only honor society that offers free membership to her members, where most honor societies charge annual membership fees between US$30 to US$300.\n\n:money_with_wings: IJHS is fully funded by Scholastic Trust Singapore (STS), a non-profit foundation, and supported by a prominent volunteer board of advisors to help guide bright young leaders. The STS Board of Advisors is made up of influential leaders from academia and industries to help open doors for our young leaders.");
		}

		if (interaction.options.getSubcommand() === 'committees') {
			await interaction.reply("Command still in development... check back later! :robot:");
		}

		if (interaction.options.getSubcommand() === 'slc') {
			await interaction.reply("Command still in development... check back later! :robot:");
		}

	},
};