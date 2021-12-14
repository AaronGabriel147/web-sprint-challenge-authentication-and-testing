require("dotenv").config();
const { PORT } = require('./config/secrets');
const server = require('./api/server');


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
