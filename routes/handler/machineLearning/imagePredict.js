const tf = require("@tensorflow/tfjs-node");

module.exports = async (req, res) => {
   const models =
      "https://raw.githubusercontent.com/Besti-Corps/MachineLearning-BestiApp/main/Model/JSON/model.json";

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
   const model = await tf.loadGraphModel(models);
   console.log(model);

   const prediction = model.predict(
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
            value: predict,
         };
      })
      .sort(function (a, b) {
         return b.value - a.value;
      })
      .slice(0, 1);

   return res.json({
      status: "success",
      data: result,
   });
};
