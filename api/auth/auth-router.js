const router = require('express').Router();
const Users = require('./auth-model')

const restricted = require('../middleware/restricted');
// const checkAuthPayload = require('../middleware/restricted');

const bcrypt = require('bcryptjs'); // This goes wherever we use bcrypt
const jwt = require('jsonwebtoken'); // installed this library // used in tokenbuilder

const { JWT_SECRET } = require('../../config/secrets'); // Some have BCRYPT_ROUNDS, not sure why




// Gets all users = localhost:3300/api/auth
router.get('/', (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to get users', error })
    })
});

/* 
IMPLEMENT
You are welcome to build additional middlewares to help with the endpoint's functionality.
DO NOT EXCEED 2^8 ROUNDS OF HASHING!

1- In order to register a new account the client must provide `username` and `password`:
{
  "username": "Captain Marvel", // must not exist already in the `users` table
  "password": "foobar"          // needs to be hashed before it's saved
}

2- On SUCCESSFUL registration,
the response body should have `id`, `username` and `password`:
{
  "id": 1,
  "username": "Captain Marvel",
  "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
}

3- On FAILED registration due to `username` or `password` missing from the request body,
the response body should include a string exactly as follows: "username and password required".

4- On FAILED registration due to the `username` being taken,
the response body should include a string exactly as follows: "username taken".
*/


// Works = Creates a new user with a hashed PW
router.post('/register', restricted, async (req, res) => {

  const { username, password } = req.body;       // Take whatever the user types
  const hash = bcrypt.hashSync(password, 8);     // Hashes the user's password
  const user = { username, password: hash }      // Create a user object with the username and hashed password

  try {
    const createdUser = await Users.create(user) // create = Knex* db('users').insert(user)
    // console.log(createdUser)
    res.status(201).json(createdUser)            // json = createdUser
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', err });
  }
})






/*
IMPLEMENT
You are welcome to build additional middleware to help with the endpoint's functionality.

1- In order to log into an existing account the client must provide `username` and `password`:
{
  "username": "Captain Marvel",
  "password": "foobar"
}

2- On SUCCESSFUL login,
the response body should have `message` and `token`:
{
  "message": "welcome, Captain Marvel",
  "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
}

3- On FAILED login due to `username` or `password` missing from the request body,
the response body should include a string exactly as follows: "username and password required".

4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
the response body should include a string exactly as follows: "invalid credentials".
*/
// router.post('/login', (req, res) => {
//   res.end('implement login, please!');
// });




router.post('/login', restricted, (req, res, next) => {
  let { username, password } = req.body;

  Users.findBy({ username })             // db('users').where(ARGUMENT); // No sure why it is an object
    // console.log('username', { username })
    .then((user) => {
      console.log('user', user)        // user = [{id: 3, username: 'Epictetus', password: '2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG'}]
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenBuilder(user);

        res.status(200).json({
          message: `Welcome back ${user.username}!`,
          token,
        });
      } else {
        next({ status: 401, message: 'Invalid Credentials' });
      }
    })
    .catch(next);
});






//----------------------------------------------------------------------------//
// This is a helper method that handles token signing. This is where we create
// a new token. JWT consists of a Header, a Payload and a Signature. Note that
// by default, the Payload (as well as the Header) are not encrypted. They are
// base64 encoded which can be easily decoded by anyone without the secret.
// Be sure not to store any sensitive data in the Payload (unless you encrypt
// it first).
//----------------------------------------------------------------------------//

function tokenBuilder(user) {
  const payload = {
    sub: user.id,               // standard - subject, normally the user id
    username: user.username,    // custom property
    role: user.role,            // standard - The Date the token was issued, expressed in seconds since epoch.
  }
  const options = {
    expiresIn: '5d',
  }
  return jwt.sign(payload, JWT_SECRET, options); // jwt.sign(payload, JWT_SECRET, options)
};






module.exports = router;
