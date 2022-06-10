module.exports = (sequelize, DataTypes) => {
   const Review = sequelize.define(
      "Review",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
         },
         userId: {
            field: "user_id",
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         comment: {
            type: DataTypes.TEXT,
            allowNull: true,
         },
         createdAt: {
            field: "created_at",
            type: DataTypes.DATE,
            allowNull: false,
         },
         updatedAt: {
            field: "updated_at",
            type: DataTypes.DATE,
            allowNull: false,
         },
      },
      {
         tableName: "review",
         timestamps: true,
      }
   );

   return Review;
};
