const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { password, email } = req.body;
    const found = await User.findOne({ email });
    if (found) {
      return res.status(409).json({
        message: "email Already Exist",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const result = await User.create({
      ...req.body,
      password: hashPass,
    });
    res.json({
      message: "user register success",
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went Wrong",
      error,
    });
  }
};
exports.fetchUsers = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.json({ message: "provide Token" });
    }
    jwt.verify(token, process.env.JWT_KEY);
    const result = await User.find();
    res.json({
      message: "user Fetch success",
      result,
    });
  } catch (error) {
    res.json({
      message: "Something went Wrong",
      error,
    });
  }
};
exports.login = async (req, res) => {
  try {
    // email exist
    const { email, password } = req.body;
    const result = await User.findOne({ email });
    if (!result) {
      return res
        .status(401)
        .json({ message: "Email is not registerd with us" });
    }

    const match = await bcrypt.compare(password, result.password);
    if (!match) {
      return res.status(401).json({ message: "password do not match" });
    }
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY);

    res.cookie("token", token);
    res.json({
      message: "login success",
      result: {
        _id: result._id,
        name: result.name,
        email: result.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went Wrong" + error,
    });
  }
};
exports.destroy = async (req, res) => {
  try {
    await User.deleteMany();
    res.json({ message: "user Destroy success" });
  } catch (error) {
    res.json({
      message: "Something went Wrong" + error,
    });
  }
};
