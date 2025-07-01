const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const user = new User({ email: 'test@example.com', password: 'test1234' });
    await user.save();
    console.log('Utilisateur créé');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
