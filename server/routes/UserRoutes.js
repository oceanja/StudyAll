const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");

// POST /api/users/firebase-register
router.post("/firebase-register", verifyFirebaseToken, async (req, res) => {
  try {
    const { email, uid } = req.user;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (!user) {
      // Create new user in DB
      user = new User({
        name,
        email,
        password: uid, // just a placeholder
      });
      await user.save();
    }

    res.status(200).json({
      message: "User authenticated and stored",
      user,
    });
  } catch (error) {
    console.error("Firebase Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
