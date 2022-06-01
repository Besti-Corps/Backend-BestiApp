require("dotenv").config();
const { ModelPredictML } = process.env;
const tf = require("@tensorflow/tfjs-node");

module.exports = async (req, res) => {
   const image = req.file;

   if (!image) {
      res.send("No image found");
      return;
   }

   const imageSize = [224, 224];

   const pattern = /image\/(jpeg|png|jpg)/;
   if (!pattern.test(image.mimetype)) {
      throw new Error("File type not supported");
   }

   const tensor = tf.node.decodeImage(image.buffer);
   const loadModel = await tf.loadGraphModel(ModelPredictML);

   const prediction = loadModel.predict(
      tensor.resizeBilinear(imageSize).expandDims(0)
   );

   const predictionArray = Array.from(prediction.dataSync());
   const label = [
      "Battery",
      "Biological",
      "Brown Glass",
      "Cardboard",
      "Clothes",
      "Green Glass",
      "Metal",
      "Paper",
      "Plastic",
      "Shoes",
      "Trash",
      "White Glass",
   ].sort();

   const result = predictionArray
      .map((predict, index) => {
         return {
            label: label[index],
            accuracy: Math.round(predict * 100),
         };
      })
      .sort(function (a, b) {
         return b.accuracy - a.accuracy;
      })
      .slice(0, 1);

   let typeTrash;
   switch (result[0].label) {
      case "Biological":
         typeTrash = "Organik";
         break;
      case "Plastic":
      case "Metal":
      case "Shoes":
      case "Clothes":
         typeTrash = "Anorganik";
         break;
      case "Battery":
      case "Brown Glass":
      case "White Glass":
      case "Green Glass":
         typeTrash = "B3";
         break;
      case "Paper":
      case "Cardboard":
         typeTrash = "Kertas";
         break;
      default:
         typeTrash = "Residu";
         break;
   }

   return res.json({
      status: "success",
      predict: result,
      type: typeTrash,
   });
};
