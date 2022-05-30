const jwt = require("jsonwebtoken");
const config = require("config");
// make route to delete user
module.exports = (req, res, next) => {
  //  get the token from header
  const token = req.header("Authorization");
  if (token) token.split(" ")[1];

  // check if there is a token
  if (!token) {
    res.status(401).json({ errors: { msg: "No Token, Authorization denied" } });
  }
  try {
    // verify the token
    const verified = jwt.verify(
      token,
      "jkkjkdjfksdfjuihueirhwehfejdpsfsdfihrieruewrywer3478y3rurhweeubesuebceuhcweygrwenwe"
    )
    // set the token to the req object
    req.user = verified.user
    // call the next function
    next()
  } catch (error) {
    res.status(401).json({ errors: { msg: "Invalid token" } })
  }
};
