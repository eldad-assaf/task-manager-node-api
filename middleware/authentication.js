const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  console.log('auth middleware');
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ msg: "token is missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = { userId: payload.userId, name: payload.name };
    console.log(req.user);

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Bad request! . please try again later" });
  }
};

module.exports = auth;
