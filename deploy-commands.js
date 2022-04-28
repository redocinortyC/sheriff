// Imports
const { readdirSync } = require("fs");
require("dotenv").config();

// Discord.js setup
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId } = require("./config.json");
const token = process.env.BOT_TOKEN;

const commands = [];
const commandFiles = readdirSync("./commands").filter((file) =>
  file.endsWith(".js")
);

// Logs commands
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

// Deploys commands
rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("🛠	Successfully registered application commands."))
  .catch(console.error);
