var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); //routes/index.js
var usersRouter = require('./routes/users'); //routes/users.js

// manejador de ruta 1:
var contactoRouter = require('./routes/contacto'); //routes/contacto.js

// manejador de ruta 2:
var pruebaRouter = require('./routes/prueba'); //routes/prueba.js

// manejador de ruta 3:
var novedadesRouter = require('./routes/novedades'); //routes/novedades.js

// manejador de ruta 4:
var destacadosRouter = require('./routes/destacados'); //routes/destacados.js

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// rutas:
app.use('/contacto', contactoRouter);
app.use('/prueba', pruebaRouter);
app.use('/novedades', novedadesRouter);
app.use('/destacados', destacadosRouter);

// ruta 1:
app.get('/contacto', function(req, res) {
  res.send('pantalla de contacto')
})

// ruta 2:
app.get('/prueba', function(req, res) {
  res.send('pantalla de prueba')
})

// ruta 3:
app.get('/novedades', function(req, res) {
  res.send('pantalla de novedades')
})

// ruta 4:
app.get('/destacados', function(req, res) {
  res.send('pantalla de destacados')
})


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
