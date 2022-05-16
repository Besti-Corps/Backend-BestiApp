const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
   const schema = {
      name: "string|empty:false",
      email: "email|empty:false",
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
};
