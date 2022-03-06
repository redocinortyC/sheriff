const axios = require('axios')

function jokes() {
	let response = null;
	new Promise (async(resolve, reject) =>{
		try {
			// No ping function, so it will get random joke
			response = await axios.get('https://jokes.deno.dev')
		} catch(ex) {
			response = null;
			// Error Log
			console.log(ex)
			reject(ex)
		}
		if (response) {
			const json = response.data;
			console.log("All jokes go!")
			resolve(json);
		}
	});

}