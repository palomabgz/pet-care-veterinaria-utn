var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var session = require('express-session');
var pool = require('./models/bd');

var indexRouter = require('./routes/index'); //routes/index.js
var serviciosRouter = require('./routes/admin/servicios'); //routes/servicios.js
var loginRouter = require('./routes/admin/login'); //routes/admin.js
var adminRouter = require('./routes/admin/comentarios'); //routes/comentarios.js
var novedadesRouter = require('./routes/admin/novedades'); //routes/novedades.js

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '1w2e3r4t5y6u7i8o9p',
  resave: false,
  saveUninitialized: true
}))

secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
}

app.use('/', indexRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/comentarios', secured, adminRouter);
app.use('/admin/novedades', novedadesRouter);
app.use('/admin/servicios', serviciosRouter);

// consulta:
pool.query('select * from comentarios_bd').then(function (resultados){
  console.log(resultados)
});

pool.query('select * from servicios_bd').then(function (resultados){
  console.log(resultados)
});

pool.query('select * from novedades_bd').then(function (resultados){
  console.log(resultados)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
