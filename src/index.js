const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const schemaGraphql = require("./routes/graphql/schemaGraphql");
const rootGraphQL = require("./routes/graphql/rootGraphQL");

//cluster
const cluster = require("cluster");
const numCPU = require("os").cpus().length;
const parseArg = require("minimist");

//websocket
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const addProductsHandlers = require("./routes/webSocket/addProductsHandler");
const addMensajesHandlers = require("./routes/webSocket/addMessagesHandler");

//-----------rutas
const routeAuth2 = require("./routes/routeAuth2");
const routeNumAleatorios = require("./routes/routeNumerosAleatorios");
const routeInfo = require("./routes/routeInfo");
const routeProductosTest = require("./routes/routeProductosTest");
const routeAuth = require("./routes/routeAuth");
const routerProducts = require("./routes/routerProducts");

//otros
require("dotenv").config();
require('./passport/local-auth');
const engine = require("ejs-mate");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const objectSession = require("./config/session");
const session = require("express-session");
const flash = require("connect-flash");
// const { schema } = require("./models/schema/productModel");

//configuracion minimist
const options = { default: { port: 8080 } };
const objectMinimist = parseArg(process.argv.slice(2), options);
const PORT = objectMinimist.port; //pasar como --port=(numero)
const modoCluster = objectMinimist.modo === "cluster";

//middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(cors());

//session
app.use(session(objectSession));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signupMessage = req.flash("signupMessage");
  app.locals.signinMessage = req.flash("signinMessage");
  app.locals.user = req.user;
  next();
});

//Testing AXIOS
// const {get,post,deleteItem} = require('./Desafios/axios/http');
// get();
// post();
// deleteItem();

//global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//---------fork//cluster-----------
if (modoCluster && cluster.isMaster) {
  for (let index = 0; index < numCPU; index++) {
    cluster.fork();
  }
} else {
  //Rutas
  app.use(routeAuth2);
  app.use(routeNumAleatorios);
  app.use(routeInfo);
  app.use(routeProductosTest);
  // app.use(routeAuth);
  app.use("/products", routerProducts);
  app.use(
    "/graphql",
    graphqlHTTP({
      graphiql: true,
      schema: schemaGraphql,
      rootValue: rootGraphQL,
    })
  );

  //WEB SOCKET
  io.on("connection", async (socket) => {
    console.log("WEB SOCKET - Nuevo cliente conectado!");
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
