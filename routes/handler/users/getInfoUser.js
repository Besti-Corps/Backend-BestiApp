const { User } = require("../../../models");

module.exports = async (req, res) => {
   const id = req.user.data.id;
   const user = await User.findByPk(id, {
      attributes: ["id", "name", "phone", "email", "gender", "profession"],
   });
   if (!user) {
      return res.status(404).json({
         status: "error",
         message: "User not found",
      });
   }

   return res.json({
      status: "success",
      data: user,
   });
};
