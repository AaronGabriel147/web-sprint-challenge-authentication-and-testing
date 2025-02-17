const router = require('express').Router();
const Users = require('./auth-model')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const { JWT_SECRET, NUM } = require('../../config/secrets') // I think????



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
// router.post('/register', (req, res) => {
//   res.status(200).json({
//     message: 'Registering user',
//     user: req.body
//   });
// });

router.post('/register', async (req, res, next) => {
  // console.log('reg')
  try {
    const newUser = await Users.create(req.body); // req.body is the object that was sent in the request
    if (!newUser) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      })
    } else {
      res.status(200).json(newUser)
    }
  } catch (err) {
    next(err);
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

router.post('/login', (req, res) => {
  res.end('implement login, please!');
});

module.exports = router;
