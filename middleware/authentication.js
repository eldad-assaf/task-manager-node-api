
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  console.log('auth middleware');
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {

   
   return res.status(401).json({ msg: 'token is missing' })
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = { userId: payload.userId, name: payload.name };
    console.log(req.user);
    next()
  } catch (error) {
    return res.status(500).json({ msg: 'Bad request! . please try again later' })

  }
};

module.exports = auth





// const jwt = require('jsonwebtoken');
// const { UnauthenticatedError} = require('../errors/index');
// const secretKey = 'your-secret-key'; // Replace with your actual secret key


// const auth = async (req, res, next) => {
//   try {
//     // 1. Get the token from the request headers
//     const token = req.headers.authorization;

//     // 2. Check if a token is provided
//     if (!token) {
//       //return res.status(401).json({ message: 'Authorization token is missing' });
//      // throw new UnauthenticatedError('Authorization token is missing')
//      throw new UnauthenticatedError('Invalid Credentials')

//     }
//     // 3. Verify and decode the token
//     const decoded = jwt.verify(token, secretKey);

//     // 4. Attach user information to the request for later use in route handlers
//     req.user = decoded;

//     // 5. Continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     console.log(error);
//     // Handle token verification errors
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

// module.exports = auth;
