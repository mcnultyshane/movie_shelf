const sequelize = require('../config/connection');
const { User, Movie, Shelf } = require('../models');

const userData = require('./userData.json');
const movieData = require('./movieData.json');
const shelfData = require('./shelfData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const shelf = await Shelf.bulkCreate(shelfData, {
    individualHooks: true,
    returning: true,
  });

  for (const movie of movieData) {
    await Movie.create({
      ...movie,
      // shelf_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
