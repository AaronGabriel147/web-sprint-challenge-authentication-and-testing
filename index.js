// const server = require('./api/server.js');

// const PORT = process.env.PORT || 3300;
// server.listen(PORT, () => {
//   console.log(`\n=== Server listening on port ${PORT} ===\n`);
// });


// ___________


// require("dotenv").config();

const server = require("./api/server.js");

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
