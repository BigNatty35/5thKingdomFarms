const { User } = require("../models");

exports.createUser = (req, res) => {
  
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