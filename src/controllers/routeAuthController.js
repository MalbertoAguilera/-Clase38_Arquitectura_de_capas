const redirectHomeController = (req, res) => {
  res.redirect("/home");
};

const getHomeController = async (req, res) => {
  const nombre = req.session.nombre;
  if (!nombre) {
    return res.redirect("/login");
  }
  res.render("index.ejs", { nombre: req.session.nombre });
  // res.render(path.join(process.cwd(), "views/index.ejs"), {
  //   nombre: req.session.nombre,
  // });
};

const getLoginController = async (req, res) => {
  const nombre = req.session.nombre;
  if (nombre) {
    res.redirect("/");
  } else {
    res.render("login");
    // res.sendFile(path.join(process.cwd(), "public/views/login.html"));
  }
};
const postLoginController = (req, res) => {
  req.session.nombre = req.body.nombre;
  res.redirect("/home");
};
const getLogoutController = (req, res) => {
  const nombre = req.session.nombre;
  if (nombre) {
    req.session.destroy((err) => {
      if (!err) {
        res.render("pages/logout.ejs", { nombre });
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
};

module.exports = {
  getHomeController,
  redirectHomeController,
  getLoginController,
  postLoginController,
  getLogoutController
};
