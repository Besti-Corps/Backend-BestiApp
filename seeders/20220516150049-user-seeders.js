"use strict";
const bcrypt = require("bcrypt");

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
         "users",
         [
            {
               name: "John Doe",
               profession: "Engineer",
               gender: "laki-laki",
               email: "besti@gmail.com",
               password: await bcrypt.hash("besti", 15),
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "Doe",
               profession: "Mahasiswa",
               gender: "laki-laki",
               email: "corps@gmail.com",
               password: await bcrypt.hash("besti", 15),
               created_at: new Date(),
               updated_at: new Date(),
            },
         ],
         {}
      );
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("users", null, {});
   },
};
