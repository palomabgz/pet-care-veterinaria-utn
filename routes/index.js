var express = require('express');
var router = express.Router();
var comentariosModel = require('../models/comentariosModel');

var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var comentarios = await comentariosModel.getComentarios();
  res.render('index' , {
    comentarios
  });
});


router.post('/', async (req, res, next) => {
  var email = req.body.email;
  var phone = req.body.phone;

  var obj = {
    to: 'palomabgz@gmail.com',
    subjet: 'newsletter',
    html: email + phone + "se suscribió al newsletter"
  } // cierra OBJ

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }); // cierra TRANSPORTER

  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: '¡Suscripcion exitosa!',
  })
}); // cierra petición del POST

module.exports = router;
