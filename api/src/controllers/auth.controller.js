import userService from "../services/user.database.service.js";
import { comparePassword } from "../services/password.service.js";
import { userTokenGenerator } from "../services/token.service.js";

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      status: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    if (!error.code == 11000) {
      console.error("An error occurred", error.message);
      return res.status(500).json({ status: false, message: error.message });
    }
    res.status(409).json({
      status: false,
      message: "An error occurred Because of Duplicate Creation",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);
    const comparedPassword = await comparePassword(
      req.body.password,
      user.password,
    );
    if (!user || !comparedPassword) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid credentials" });
    }
    //if password is correct generate the access token
    const accessToken = await userTokenGenerator(user);
    res.status(200).json({
      status: true,
      message: "User Login Successful",
      data: {
        token: accessToken,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: false, message: err.message });
  }
};

export default { createUser, loginUser };
