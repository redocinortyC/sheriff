const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('utility')
		.setDescription('Some useful commands.')

        // Ping command
		.addSubcommand(subcommand =>
            subcommand
            .setName('ping')
            .setDescription('Replies with \'pong\' and your current latency!')),
            
	async execute(interaction) {
        
        if (interaction.options.getSubcommand() === 'ping') {
            const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
            interaction.editReply(`:ping_pong: Pong! Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
        }
        
	},
};