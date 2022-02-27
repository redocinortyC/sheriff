const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('🚀 Sheriff is being hosted 24/7 @ Replit with Uptimerobot!')
});

function host() {
	app.listen(3000, () => {
		console.log('🔥	Hosting server started');
	});
}

module.exports = host;