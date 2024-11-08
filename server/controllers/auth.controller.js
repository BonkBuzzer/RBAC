const { Employee } = require("../models/emp.model");
const { options, generateAccessAndRefereshTokens } = require("../constants");

const login = async (req, res) => {
  const { empUsername, password } = req.body;
  try {
    const loginUser = await Employee.findOne({ empUsername });
    if (loginUser && loginUser.validPassword(password)) {
      const { accessToken, refreshToken } =
        await generateAccessAndRefereshTokens(loginUser._id);
      return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .status(200)
        .json({
          message: "ok!",
          accessToken,
          refreshToken,
          menuItems: loginUser.empPerms,
        });
    }
    return res
      .status(401)
      .json({ message: "user not found or invalid password" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {  login };
