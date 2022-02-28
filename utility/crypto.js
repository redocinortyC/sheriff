const axios = require('axios');

// Checks API server status
function cryptoAPICheck(){
	let response = null;
	
	new Promise(async (resolve, reject) => {
	  try {
	    response = await axios.get(`https://api.coingecko.com/api/v3/ping`);
	  } catch(ex) {
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

module.exports = cryptoAPICheck;