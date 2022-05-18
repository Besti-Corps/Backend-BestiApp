const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const validator = require("fastest-validator");
const v = new validator();

module.exports = async (req, res) => {
   const schema = {
      name: "string|empty:false",
      email: "email|empty:false",
      gender: { type: "enum", values: ["laki-laki", "perempuan"] },
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

   const id = req;
};
