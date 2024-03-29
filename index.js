// Imports
const { readdirSync } = require("fs");
require("dotenv").config();

const { Client, Collection, Intents } = require("discord.js");
const token = process.env.BOT_TOKEN;

// Utilities
const emojis = require("./utility/emojis.js");
const { server, crypto } = require("./utility/backend.js");

// Discord client and its intents
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

// Activity
const activityType = "WATCHING";
const activityName = "the stock market";

// Commands collection
client.commands = new Collection();
const commandFiles = readdirSync("./commands").filter((file) =>
  file.endsWith(".js")
);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// On ready
client.once("ready", () => {
  // Version info
  console.log(`🚀	Node.js version: ${process.version}`);
  console.log(`🚀	Discord.js version: ${require("discord.js").version}`);

  console.log(`\n🤠	Yee-haw! Logged in as ${client.user.tag}\n`);

  // Backend hosting and APIs
  server();
  crypto();

  // Status and activities
  client.user.setStatus("dnd");
  client.user.setActivity(activityName, { type: activityType });
});

// Interactions
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: `${emojis["!"]} There was an error while executing this command!`,
      ephemeral: true,
    });
  }
});

// Client login
client.login(token);
