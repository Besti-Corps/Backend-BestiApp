const { Review } = require("../../../models");
const validator = require("fastest-validator");
const v = new validator();

module.exports = async (req, res) => {
   const schema = {
      comment: "string|optional",
   };

   const validate = v.validate(req.body, schema);

   if (validate.length) {
      return res.status(400).json({
         status: "error",
         message: validate,
      });
   }

   const user_id = req.user.data.id;

   const data = {
      comment: req.body.comment,
      userId: user_id,
   };

   const userComment = await Review.create(data);

   return res.json({
      status: "success",
      data: {
         id: userComment.id,
      },
   });
};
