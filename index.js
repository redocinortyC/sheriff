const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Commands collection
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// On ready
client.once('ready', () => {
	console.log(`Node.js version: ${process.version}`);
    console.log(`🤠 Yee-haw! Logged in as ${client.user.tag}`);
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
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);

// Express server for hosting
const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('🤠 Sheriff is currently up and working!')
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})