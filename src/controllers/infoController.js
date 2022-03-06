const numCPU = require("os").cpus().length;
const objectInfo = require("../config/ObjectInfo");

const getInfoController = (req, res) => {
  objectInfo["qtyOfCPU"] = numCPU;
  res.json(objectInfo);
};

module.exports = { getInfoController };
