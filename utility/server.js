const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('🚀 Sheriff is being hosted 24/7 @ Replit with Uptimerobot!')
});

// Starts Express server
function server() {
	app.listen(port, () => {
		console.log(`🔥	Hosting server started and listening on port ${port}`);
	});
}

module.exports = server;