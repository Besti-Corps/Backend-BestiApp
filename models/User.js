module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define(
      "User",
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncerement: true,
            primaryKey: true,
            allowNull: false,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         gender: {
            type: DataTypes.ENUM,
            values: ["laki-laki", "perempuan"],
            allowNull: false,
            defaultValue: "laki-laki",
         },
         profession: {
            type: DataTypes.STRING,
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
         tableName: "users",
         timestamps: true,
      }
   );

   return User;
};
