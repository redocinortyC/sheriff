// Imports
const { get } = require("axios");
const { SlashCommandBuilder } = require("@discordjs/builders");

// Utility commands module
module.exports = {
  data: new SlashCommandBuilder()
    .setName("fun")
    .setDescription("Fun commands for your entertainment.")

    // Cryptocurrency info command
    .addSubcommand((subcommand) =>
      subcommand
        .setName("cryptocurrency")
        .setDescription("Spew out some stats on cryptocurrencies.")
        .addStringOption((option) =>
          option
            .setName("cryptocurrency")
            .setDescription("The cryptocurrencies I currently support")
            .setRequired(true)
            // Some cryptocurrencies
            .addChoice("Avalanche", "avalanche-2")
            .addChoice("Bitcoin", "bitcoin")
            .addChoice("Dogecoin", "dogecoin")
            .addChoice("Ethereum", "ethereum")
            .addChoice("Polkadot", "polkadot")
            .addChoice("Polygon", "matic-network")
            .addChoice("Solana", "solana")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("jokes")
        .setDescription("Spew out some humour/humor")
        .addStringOption((option) =>
          option
            .setName("type")
            .setDescription("Types of jokes that are supported")
            .setRequired(true)
            .addChoice("Programming", "programming")
            .addChoice("Anime", "anime")
            .addChoice("Food", "food")
            .addChoice("Knock-knock", "knock-knock")
            .addChoice("Dad", "dad")
            .addChoice("General", "general")
        )
    ),

  async execute(interaction) {
    if (interaction.options.getSubcommand() === "cryptocurrency") {
      const id = interaction.options.getString("cryptocurrency");

      let response = null;

      // eslint-disable-next-line no-async-promise-executor
      new Promise(async (resolve, reject) => {
        try {
          response = await get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
          );
        } catch (ex) {
          response = null;
          // Error logging
          console.log(ex);
          reject(ex);
        }

        if (response) {
          // Upon success
          const json = response.data;
          await interaction.reply(
            "**Cryptocurrency data (" +
              id +
              ")**\n```json\n" +
              JSON.stringify(json, null, " ") +
              "```\n*:lizard: Data provided by the CoinGecko data market APIs.*"
          );
          resolve(json);
        }
      });
    }
    if (interaction.options.getSubcommand() === "jokes") {
      const type = interaction.options.getString("type");
      let response = null;
      new Promise(async (resolve, reject) => {
        try {
          // Getting 0th element because API returns array
          response = await get(`https://jokes.deno.dev/type/${type}/1`);
        } catch (ex) {
          response = null;
          console.log(ex);
          reject(ex);
        }
        if (response) {
          const jokeJson = response.data[0];
          await interaction.reply(
            `${type} joke: \n ${jokeJson.setup} \n ||${jokeJson.punchline}||`
          );
          resolve(json);
        }
      });
    }
  },
};
