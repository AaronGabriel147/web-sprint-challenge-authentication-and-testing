const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!


server.use(errorHandling) // will trap "".catch/500 errors" happening above

module.exports = server;




// *catch all 500 errors middleware* 
function errorHandling(err, req, res, next) {
    console.log('@@@***inside catch all 500***@@@'),
        res.status(err.status || 500).json({
            message: err.message,
            status: 500
        })
}