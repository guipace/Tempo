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
        email: 'Erik.Webb@gmail.com',
        username: 'User1',
        firstName: 'Erick',
        lastName: 'Webb',
        websiteUrl: 'www.erickwebb.com',
        avatarUrl: 'https://drive.google.com/uc?export=view&id=12TXIa0cQwZtwq98CcXpZl8bRVqiVLYWO',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'Clara.Crawford@gmail.com',
        username: 'User2',
        firstName: 'Clara',
        lastName: 'Crawford',
        websiteUrl: 'www.claracrawford.com',
        avatarUrl: 'https://drive.google.com/uc?export=view&id=1a7beSah0zAjNwO8f8fwMaGEFwZJbxMOm',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'Robert.Williams@gmail.com',
        username: 'User3',
        firstName: 'Robert',
        lastName: 'Williams',
        websiteUrl: 'www.robertwilliams.com',
        avatarUrl: 'https://drive.google.com/uc?export=view&id=1piv-mThm-l1fInCUPYMYpsE8NTyDTwZ_',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'Erica.Adams@gmail.com',
        username: 'User4',
        firstName: 'Erica',
        lastName: 'Adams',
        websiteUrl: 'www.ericaadams.com',
        avatarUrl: 'https://drive.google.com/uc?export=view&id=1NXvgO77YOHVs9ZsXh_kGM58RbqgV6NP4',
        hashedPassword: bcrypt.hashSync('password'),
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
