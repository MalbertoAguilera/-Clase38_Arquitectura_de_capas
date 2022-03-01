const express = require("express");
const { Router } = express;
const route = new Router();

const {
  getHomeController,
  redirectHomeController,
  getLoginController,
  postLoginController,
  getLogoutController
} = require("../controllers/routeAuthController");

route.get("/", redirectHomeController);

route.get("/home", getHomeController);

route.get("/login", getLoginController);

route.post("/login", postLoginController);

route.get("/logout", getLogoutController);

module.exports = route;
