const express = require('express');
const userModel = require('../models/User');  // Import the user model

const router = express.Router();


// Route to create a new user
router.post('/create', async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userModel.createUser(userData);  // Call the createUser function from the user model
    res.status(201).json(newUser);  // Return the newly created user
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Route to get a user by ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);  // Return the found user
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

router.get('/name/:name', async (req, res) => {
  const userName = req.params.name;
  try {
    const user = await userModel.getUserTypeByUserName(userName);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);  // Return the found user
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Route to update a user by ID
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const userDetails = req.body;
  try {
    const updatedUser = await userModel.updateUser(userId, userDetails);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);  // Return the updated user
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
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
    res.status(200).json(deletedUser);  // Return the deleted user (optional)
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
