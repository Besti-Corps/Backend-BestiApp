"use strict";

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("review", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         comment: {
            type: Sequelize.TEXT,
            allowNull: true,
         },
         created_at: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
         },
      });
      await queryInterface.addConstraint("review", {
         type: "foreign key",
         name: "REVIEW_USER_ID_FK",
         fields: ["user_id"],
         references: {
            table: "users",
            field: "id",
         },
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("review");
   },
};
