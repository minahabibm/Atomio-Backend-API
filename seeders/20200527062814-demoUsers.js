'use strict';

module.exports = {
  up: (queryInterface) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    // eslint-disable-next-line implicit-arrow-linebreak
    queryInterface.bulkInsert('users', [{
      uid: '01234567',
      name: 'John',
      role: 'superAdmin',
      defaultLocationId: null

    }, {
      uid: '1234567',
      name: 'Doe',
      role: 'admin',
      defaultLocationId: null
    }, {
      uid: '123456712',
      name: 'smith',
      role: 'user',
      defaultLocationId: null
    }], {}),


  down: (queryInterface) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    // eslint-disable-next-line implicit-arrow-linebreak
    queryInterface.bulkDelete('users', null, {})

};
