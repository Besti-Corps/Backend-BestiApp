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
               phone: "081213345645",
               email: "besti@gmail.com",
               password: await bcrypt.hash("besti", 15),
               created_at: new Date(),
               updated_at: new Date(),
            },
            {
               name: "Doe",
               profession: "Mahasiswa",
               gender: "perempuan",
               phone: "081213346768",
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
