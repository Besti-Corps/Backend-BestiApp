const { Review, User, sequelize } = require("../../../models");

User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

module.exports = async (req, res) => {
   const user = await User.findAll({ include: Review });

   // Display data with inner join
   // const reviewUser = await User.findAll({
   //    include: Review,
   //    attributes: "name",
   // });

   const [results, metadata] = await sequelize.query(
      "SELECT review.user_id, users.name, review.comment, review.created_at  FROM review JOIN users ON review.user_id = users.id"
   );

   return res.json({
      status: "success",
      data: results,
   });
};
