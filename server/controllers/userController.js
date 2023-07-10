const { User } = require("../models");

const createUser = (req, res) => {
  
  try {
    const { name, email, password, address, phone_number } = req.body;

    if (!name || !email || !password || !address || !phone_number) {
      throw new Error('Missing Fields');
    }

    User.create({
      name,
      email,
      password,
      address,
      phone_number,
    })

    res.status(201).json({ message: 'User created successfully', name, email });
  } catch (error) {
    console.log('There was an error creating user:', error)
    res.status(500).json({error: 'Internal Server Error'});
  }
}

const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      // User with the specified ID not found
      return res.status(404).json({ error: 'User not found' });
    }

    // User found, send the user object in the response
    res.json(user);
  } catch (error) {
    // Handle any errors that occurred during the query
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { name, email, address, phone_number } = req.body;
  console.log(`THIS IS THE ID: ${userId}`);
  try {
    const [rowsUpdated] = await User.update(
      {
        name,
        email,
        address,
        phone_number,
      },
      {
        where: { user_id: userId },
      }
    );

    if (rowsUpdated === 0) {
      // User with the specified ID not found
      return res.status(404).json({ error: 'User not found' });
    }

    // User updated successfully
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error("error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  getUserById, 
  createUser,
  updateUserById
}
