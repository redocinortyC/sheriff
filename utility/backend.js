const express = require("express");
const { get } = require("axios");

const app = express();
const port = 3000;

app.get("/", (res) => {
  res.send("🚀 Sheriff is being hosted 24/7 @ Replit with Uptimerobot!");
});

// Starts Express server
function server() {
  app.listen(port, () => {
    console.log(`🔥	Hosting server started and listening on port ${port}`);
  });
}

// Checks CoinGecko APIs server status
function crypto() {
  let response = null;

  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      response = await get(`https://api.coingecko.com/api/v3/ping`);
    } catch (ex) {
      response = null;
      // Error logging
      console.log(ex);
      reject(ex);
    }
    if (response) {
      // Upon success
      const json = response.data;
      console.log(`🔥	CoinGecko API status: ${json.gecko_says}`);
      resolve(json);
    }
  });
}

module.exports = { server, crypto };
