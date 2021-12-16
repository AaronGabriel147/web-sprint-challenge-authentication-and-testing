/*
IMPLEMENT

1- On valid token in the Authorization header, call next.

2- On missing token in the Authorization header,
the response body should include a string exactly as follows: "token required".

3- On invalid or expired token in the Authorization header,
the response body should include a string exactly as follows: "token invalid".
*/
//  module.exports = (req, res, next) => {
//    next();
// };


// _____________

exports.checkValidRegister = async (req, res, next) => {

  await console.log('THIS WORKS?')
  try {
    const { username, password } = await req.body;
    console.log('username, password in middleware', username, password);
    const valid = Boolean(username && password); // True if username and password are not empty and password is a string

    if (valid) { // 
      next();
    } else {
      next({
        status: 422,
        message: 'fghjertydujrtyf',
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', err });
  }
};
