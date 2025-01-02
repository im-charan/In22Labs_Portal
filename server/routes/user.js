const express = require('express');
const userModel = require('../models/User'); // Import the user model
const pool = require("../config/database");
const router = express.Router();


// Route to create a new user
router.post('/create', async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userModel.createUser(userData); // Call the createUser function from the user model
    res.status(201).json(newUser); // Return the newly created user
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Route to get all users in LIFO order
router.get('/all', async (req, res) => {
  try {
    const users = await userModel.getAllUsers(); // Call the getAllUsers function from the user model
    // The model function is already updated to return results in LIFO order
    res.status(200).json(users); // Return the list of users
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});



// Route to get a user by username
router.get('/name/:name', async (req, res) => {
  const userName = req.params.name;
  try {
    const user = await userModel.getUserTypeByUserName(userName);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user); // Return the found user
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});
//Route to get a user by ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user); // Return the found user
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// //Route to update a user by ID
// router.put("/:id", async (req, res) => {
//   const userId = req.params.id; // Get userId from request parameters
//   const userDetails = req.body; // Get user details from the request body

//   try {
//     const updatedUser = await updateUser(userId, userDetails); // Call updateUser function

//     res.status(200).json(updatedUser); // Return the updated user data
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ error: error.message || "Error updating user" });
//   }
// });

// Route to update a user by ID
router.put("/:id", async (req, res) => {
  const userId = req.params.id; // Get userId from request parameters
  const userDetails = req.body; // Get user details from the request body

  try {
    const updatedUser = await userModel.updateUser(userId, userDetails); // Correct call to updateUser function

    res.status(200).json(updatedUser); // Return the updated user data
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message || "Error updating user" });
  }
});
//disable user 
router.put("/status/disable", async (req, res) => {
  const { selectedUserIds } = req.body;

  // Validate input
  if (!Array.isArray(selectedUserIds) || selectedUserIds.length === 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const result = await userModel.disableUser(selectedUserIds);

    // If no users were updated, return an error
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No users found with the given IDs" });
    }

    // Successfully disabled users, return success response
    res.json({success: true, message:` ${result.rowCount} users disabled successfully `});
  } catch (error) {
    console.error("Error disabling users:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/status/disablebyorg", async (req, res) => {
  const { selectedOrgIds } = req.body;

  // Validate input
  if (!Array.isArray(selectedOrgIds) || selectedOrgIds.length === 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const result = await userModel.disableUserByOrg(selectedOrgIds);

    // If no users were updated, return an error
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No users found with the given IDs" });
    }

    // Successfully disabled users, return success response
    res.json({ success: true, message:` ${result.rowCount} users disabled successfully `});
  } catch (error) {
    console.error("Error disabling users:", error);
    res.status(500).json({ error: error.message });
  }
});



router.put("/status/activate", async (req, res) => {
  const { selectedUserIds } = req.body;

  // Validate input
  if (!Array.isArray(selectedUserIds) || selectedUserIds.length === 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const result = await userModel.activateUser(selectedUserIds);
    
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "No users found with the given IDs" });
      }
      res.json({ success: true, message: `${result.rowCount} users activated successfully `});
    }

  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/status/activatebyorg", async (req, res) => {
  const { selectedOrgIds } = req.body;

  // Validate input
  if (!Array.isArray(selectedOrgIds) || selectedOrgIds.length === 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const result = await userModel.activateUserByOrg(selectedOrgIds);
    
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "No users found with the given IDs" });
      }
      res.json({ success: true, message: `${result.rowCount} users activated successfully `});
    }

  catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// Route to delete a user by ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await userModel.deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(deletedUser); // Return the deleted user (optional)
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
