const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with \'pong\' and your current latency!'),
	async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        interaction.editReply(`🏓 Pong! Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};