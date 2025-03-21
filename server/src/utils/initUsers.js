const User = require("../models/User");

async function initializeUsers() {
  try {
    // Create admin user if not exists
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: "admin",
      });
      console.log("Admin user created successfully");
    }

    // Create parking owner if not exists
    const ownerExists = await User.findOne({
      email: process.env.PARKING_OWNER_EMAIL,
    });
    if (!ownerExists) {
      await User.create({
        name: "Parking Owner",
        email: process.env.PARKING_OWNER_EMAIL,
        password: process.env.PARKING_OWNER_PASSWORD,
        role: "parking_owner",
      });
      console.log("Parking owner created successfully");
    }

    // Create demo user if not exists
    const userExists = await User.findOne({
      email: process.env.DEMO_USER_EMAIL,
    });
    if (!userExists) {
      await User.create({
        name: "Demo User",
        email: process.env.DEMO_USER_EMAIL,
        password: process.env.DEMO_USER_PASSWORD,
        role: "user",
      });
      console.log("Demo user created successfully");
    }
  } catch (error) {
    console.error("Error initializing users:", error);
  }
}

module.exports = initializeUsers;
