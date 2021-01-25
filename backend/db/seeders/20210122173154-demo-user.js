'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'DemoUser',
        firstName: 'Demo User',
        lastName: 'Demo User',
        websiteUrl: 'www.demo.user',
        avatarUrl: 'https://drive.google.com/uc?export=view&id=12FNJt4xVnS1fMpExa4d-Pc7XIYD7tKOQ',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        firstName: 'John',
        lastName: 'Doe',
        websiteUrl: 'www.johndoe.com',
        avatarUrl: 'https://drive.google.com/uc?export=view&id=12FNJt4xVnS1fMpExa4d-Pc7XIYD7tKOQ',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        firstName: 'Jane',
        lastName: 'Doe',
        websiteUrl: 'www.janedoe.com',
        avatarUrl: 'https://drive.google.com/uc?export=view&id=12FNJt4xVnS1fMpExa4d-Pc7XIYD7tKOQ',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['DemoUser', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
