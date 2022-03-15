const express = require("express");
const app = express();

//cluster
const cluster = require("cluster");
const numCPU = require("os").cpus().length;
const parseArg = require("minimist");

//websocket
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const addProductsHandlers = require('./routes/webSocket/addProductsHandler');
const addMensajesHandlers = require('./routes/webSocket/addMessagesHandler');

//-----------rutas
const routeNumAleatorios = require("./routes/routeNumerosAleatorios");
const routeInfo = require("./routes/routeInfo");
const routeProductosTest = require("./routes/routeProductosTest");
const routeAuth = require("./routes/routeAuth");
const routerProducts = require('./routes/routerProducts');

//otros
require("dotenv").config();
const path = require("path");
const  cors =require( 'cors');
const  morgan =require( 'morgan');
const objectSession = require("./config/session");
const session = require("express-session");

//configuracion minimist
const options = { default: { port: 8080 } };
const objectMinimist = parseArg(process.argv.slice(2), options);
const PORT = objectMinimist.port; //pasar como --port=(numero)
const modoCluster = objectMinimist.modo === "cluster";

//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session(objectSession));

//---------fork//cluster-----------
if (modoCluster && cluster.isMaster) {
  for (let index = 0; index < numCPU; index++) {
    cluster.fork();
  }
} else {

  //Rutas
  app.use(routeNumAleatorios);
  app.use(routeInfo);
  app.use(routeProductosTest);
  app.use(routeAuth);
  app.use('/products',routerProducts);

  //WEB SOCKET
  io.on("connection", async (socket) => {
    console.log('WEB SOCKET - Nuevo cliente conectado!');
    addProductsHandlers(socket, io.sockets);
    addMensajesHandlers(socket, io.sockets);
  });

  server.listen(PORT, () => {
    console.log(
      `El servidor se encuentra escuchando por el puerto ${
        server.address().port
      } --- PID ${process.pid}`
    );
  });
  server.on("error", (error) => console.log(`Error en servidor ${error}`));
}
