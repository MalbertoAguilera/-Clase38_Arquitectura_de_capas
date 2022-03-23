const express = require('express');
const passport = require('passport');
const router = express.Router();
const isAuthenticated = require('../auth/objectAuth');


router.get('/',(req, res, next) => {
      res.render('pages/registerForm/index');
})

router.get('/signup', (req, res, next) => {
      res.render('pages/registerForm/signup');
})

router.post('/signup', passport.authenticate('local-signup',{
      successRedirect:'/profile',
      failureRedirect:'/signup',
      passReqToCallback: true

}))

router.get('/signin', (req, res, next) => {
      res.render('pages/registerForm/signIn');
})

router.post('/signin', passport.authenticate('local-signin',{
      successRedirect: '/profile',
      failureRedirect:'/signin',
      passReqToCallback:true
}))

//MIDDLEWARE DE USUARIOS AUTENTICADOS
//DE ACA EN ADELANTE SOLO ACCEDEN SI ESTAN LOGUEADOS
router.use((req, res, next) => {
      isAuthenticated(req, res, next);
})

router.get('/profile', (req, res, next) => {
      res.render('pages/registerForm/profile');
})

router.get('/logout', (req, res, next) => {
      req.logOut();
      res.redirect('/');
})

module.exports = router;