// Imports
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, Intents, Permissions } = require("discord.js");

// Discord client and its intents
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

// Experimental commands module
module.exports = {
  data: new SlashCommandBuilder()
    .setName("experiments")
    .setDescription("Fresh new commands we are testing out.")

    // React command
    .addSubcommand((subcommand) =>
      subcommand
        .setName("react")
        .setDescription("Reacts to the message the bot sent.")
    )

    // Set activity command
    .addSubcommand((subcommand) =>
      subcommand
        .setName("set")
        .setDescription("Sets the bot's username and/or activity.")
        .addStringOption((option) =>
          option.setName("username").setDescription("New username for the bot")
        )
        .addStringOption((option) =>
          option
            .setName("activity-type")
            .setDescription(
              'Sets status to "Watching/Listening to/Competing in ..."'
            )
            .addChoice("Watching", "WATCHING")
            .addChoice("Listening to", "LISTENING")
            .addChoice("Competing in", "COMPETING")
        )
        .addStringOption((option) =>
          option.setName("activity").setDescription("New activity for the bot")
        )
    ),

  async execute(interaction) {
    if (interaction.options.getSubcommand() === "react") {
      const message = await interaction.reply({
        content: "Experimenting with reactions...",
        fetchReply: true,
      });
      message.react("🚀");
    }

    /* 
		NEW EXPERIMENTAL COMMAND: /EXPERIMENTS SET
		STATUS: CURRENTLY IN DEVELOPMENT
		Sets the bot's new username, activity, and activity type.
		TODO: Test it out in Discord and debug if necessary.
		*/

    if (interaction.options.getSubcommand() === "set") {
      const username = interaction.options.getString("username");
      const activityType = interaction.options.getString("activity-type");
      const activity = interaction.options.getString("activity");

      if (
        username &&
        interaction.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)
      ) {
        client.user.setUsername(username);
      } else {
        await interaction.reply({
          content: ":space_invader: Oops! An error occured.",
          ephemeral: true,
        });
      }

      if (
        activityType &&
        activity &&
        interaction.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)
      ) {
        client.user.setActivity(activity, { type: activityType });
      } else {
        await interaction.reply({
          content: ":space_invader: Oops! An error occured.",
          ephemeral: true,
        });
      }
    }
  },
};
