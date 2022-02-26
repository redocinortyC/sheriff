const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const emojiCharacters = require('./utility/emojiCharacters.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Activity
const activityName = "the equity market";
const activityType = "WATCHING";

// Commands collection
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// On ready
client.once('ready', () => {
	// Version info
	console.log(`🚀	Node.js version: ${process.version}`);
	console.log(`🚀	Discord.js version: ${require('discord.js').version}`);

    console.log(`\n🤠	Yee-haw! Logged in as ${client.user.tag}`);

	// Status and activities
	client.user.setStatus('dnd');
	client.user.setActivity(activityName, { type: activityType });
});

// Interactions
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: `${emojiCharacters['!']} There was an error while executing this command!`, ephemeral: true });
	}
});

client.login(token);