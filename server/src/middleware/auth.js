const Iron = require("@hapi/iron");
const { userExists } = require("../lib/users");

const isLoggedIn = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log("header", req.headers);
  if (!authorization) {
    res.send({ success: false, message: "Missing authorization token" });
  } else {
    console.log("authorization", authorization);
    const token = authorization;
    if (!token) {
      res.send({ success: false, message: "Invalid authorization token" });
    }
    try {
      const { email } = await Iron.unseal(
        token,
        process.env.IRON_KEY,
        Iron.defaults
      );
      const validUser = userExists(email);
      if (validUser) {
        next();
      } else {
        res.send({ success: false, message: "Invalid authorization token" });
      }
    } catch (error) {
      console.error(error.message);
      res.send({ success: false, message: "Invalid authorization token" });
    }
  }
};

module.exports = {
  isLoggedIn
};
