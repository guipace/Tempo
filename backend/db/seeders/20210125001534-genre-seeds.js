'use strict';

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
    return queryInterface.bulkInsert('Genres', [
      { name: 'Ambient'},
      { name: 'Drum and bass'},
      { name: 'Dub'},
      { name: 'Jungle'},
      { name: 'Hardcore'},
      { name: 'House'},
      { name: 'Acid House'},
      { name: 'Deep House'},
      { name: 'Tech House'},
      { name: 'Techno'},
      { name: 'Trance'},
      { name: 'Psytrance'},
      { name: 'Psytrance Full-On'},
      { name: 'Psytrance Dark'},
      { name: 'Psytrance progressive'},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
