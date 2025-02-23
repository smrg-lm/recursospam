const express = require('express');
const router = express.Router();

// A middleware function with no mount path.
// This code is executed for every request to the router.
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

router.get('/user', (req, res) => {
  console.log('sub ruta /user');
  res.send('<h1>Ruta de usuario</h1>');
});

router.get('/user/:dato', (req, res) => {
  console.log('sub ruta /user');
  res.send('<h1>Sub ruta variable</h1>');
});

module.exports = router;
