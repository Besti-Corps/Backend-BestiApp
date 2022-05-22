const { User } = require("../../../models");

module.exports = async (req, res) => {
   const allUser = await User.findAll({
      attributes: ["id", "name", "email", "gender", "profession", "phone"],
   });

   return res.json({
      status: "success",
      data: allUser,
   });
};
