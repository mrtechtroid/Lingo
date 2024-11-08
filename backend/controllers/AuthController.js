const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success:false });
  }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const _user = await User.findOne({ email });
        if (!_user) {
            return res.status(403)
                .json({ message: 'Auth failed email', success: false });
        }
        const isPassEqual = await bcrypt.compare(password, _user.password);
        if (!isPassEqual) {
            
            return res.status(403)
                .json({ message: 'Auth failed password', success: false });
        }
        const jwtToken = jwt.sign(
            { email: _user.email, _id: _user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: _user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror" + String(err),
                success: false
            })
    }
};
module.exports = { signup, login };