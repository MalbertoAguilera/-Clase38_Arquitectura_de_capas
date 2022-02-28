const express = require("express");
const { Router } = express;
const routerLogin = new Router();
const path = require("path");

routerLogin.get("/", (req, res) => {
  res.redirect("/home");
});

routerLogin.get("/home", (req, res) => {
  const nombre = req.session.nombre;
  console.log(nombre);
  if (!nombre) {
    return res.redirect("/login");
  }

  // res.render(path.join(process.cwd(), "views/index.ejs"), {
  //   nombre: req.session.nombre,
  // });
  res.render("index.ejs", { nombre: req.session.nombre });
});

routerLogin.get("/login", (req, res) => {
  const nombre = req.session.nombre;
  if (nombre) {
    res.redirect("/");
  } else {
    res.render("login");
    // res.sendFile(path.join(process.cwd(), "public/views/login.html"));
  }
});

routerLogin.post("/login", (req, res) => {
  req.session.nombre = req.body.nombre;
  res.redirect("/home");
});

routerLogin.get("/logout", (req, res) => {
  const nombre = req.session.nombre;
  if (nombre) {
    req.session.destroy((err) => {
      if (!err) {
        res.render('pages/logout.ejs',{nombre})
        // res.render(path.join(process.cwd(), "src/views/pages/logout.ejs"), {
        //   nombre,
        // });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

module.exports = routerLogin;
