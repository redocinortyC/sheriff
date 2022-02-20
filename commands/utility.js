const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('utility')
		.setDescription('Some useful commands.')
		.addSubcommand(subcommand =>
            subcommand
            .setName('ping')
            .setDescription('Replies with \'pong\' and your current latency!'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('timesent')
            .setDescription('Calculates the time between two sent messages.')),
	async execute(interaction) {
        
        if (interaction.options.getSubcommand() === 'ping') {
            const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
            interaction.editReply(`🏓 Pong! Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
        }
        
	},
};