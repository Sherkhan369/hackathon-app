const User = require("../models/User");

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        skills: req.body.skills,
        interests: req.body.interests,
        location: req.body.location,
      },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};