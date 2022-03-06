const {fork} = require("child_process");

const getNumerosAleatoriosController = (req, res) => {
  let cantidad = req.query.cant || "100000000";
  const random = fork("src/api/apiAleatorios.js");
  random.send(cantidad);
  random.on("message", (objRepetidos) => {
    res.json(objRepetidos);
  });
};

module.exports = {getNumerosAleatoriosController}
