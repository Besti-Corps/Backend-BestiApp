const bcrypt = require("bcrypt");
const { User, RefreshToken } = require("../../../models");
const validator = require("fastest-validator");
const jwt = require("jsonwebtoken");
const v = new validator();
const {
   JWT_SECRET,
   JWT_SECRET_REFRESH_TOKEN,
   JWT_ACCESS_TOKEN_EXPIRED,
   JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

module.exports = async (req, res) => {
   const schema = {
      email: "email|empty:false",
      password: "string|min:6",
   };

   const validate = v.validate(req.body, schema);
   if (validate.length) {
      return res.status(400).json({
         status: "error",
         message: validate,
      });
   }

   const user = await User.findOne({
      where: { email: req.body.email },
   });

   if (!user) {
      return res.status(404).json({
         status: "error",
         message: "The email you entered is not registered on our platform",
      });
   }

   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if (!validPassword) {
      return res.status(404).json({
         status: "error",
         message: "The password you entered is incorrect",
      });
   }

   const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      profession: user.profession,
      phone: user.phone,
   };

   const token = jwt.sign({ data }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
   });

   const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
   });

   await RefreshToken.create({
      token: refreshToken,
      user_id: user.id,
   });

   return res.json({
      status: "success",
      data: {
         token,
      },
   });
};
