const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const validator = require("fastest-validator");
const v = new validator();

module.exports = async (req, res) => {
   const schema = {
      name: "string|empty:false",
      email: "email|empty:false",
      gender: {
         type: "enum",
         values: ["laki-laki", "perempuan"],
         optional: true,
      },
      password: "string|min:6",
      profession: "string|optional",
   };

   const validate = v.validate(req.body, schema);
   if (validate.length) {
      return res.status(400).json({
         status: "error",
         message: validate,
      });
   }

   const id = req.user.data.id;
   const user = await User.findByPk(id);
   if (!user) {
      return res.status(404).json({
         status: "error",
         message: "User not found",
      });
   }

   const email = req.body.email;
   if (email) {
      const checkEmail = await User.findOne({
         where: { email },
      });

      if (checkEmail && email !== user.email) {
         return res.status(409).json({
            status: "error",
            message: "Email already exists",
         });
      }
   }

   const password = await bcrypt.hash(req.body.password, 15);
   const { name, profession, phone, gender } = req.body;

   await user.update({
      email,
      password,
      name,
      profession,
      phone,
      gender,
   });

   return res.json({
      status: "success",
      data: {
         id: user.id,
         name,
         email,
         profession,
         phone,
         gender,
      },
   });
};
