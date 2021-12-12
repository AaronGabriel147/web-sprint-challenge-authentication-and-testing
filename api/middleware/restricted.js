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

module.exports = (req, res, next) => {
  const { username, password } = req.body;
  const valid = Boolean(username && password && typeof password === "string");

  if (valid) {
    next();
  } else {
    next({
      status: 422,
      message: 'Please provide username and password and the password shoud be alphanumeric',
    });
  }
};
