const jwt = require('jsonwebtoken');


module.exports = function(req, res, next){
  // check for the token in teh request headers or params
  let token = req.get('Authorization') || req.query.token;

  // if there is no token, there is no user, so move on
  if(!token) {
    req.user = null;
    return next()
  };

  // verify the token
  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.SECRET, function(err, decoded){
    if(err) {
      // if it fails to decode, or verify just clear out the user and the req expires data
      req.user = null;
      req.exp = null
      return next()
    }

    // if the token is valid, attach the user to the request
    req.user = decoded.user;
    req.exp = decoded.exp;
    return next();
  });
}

