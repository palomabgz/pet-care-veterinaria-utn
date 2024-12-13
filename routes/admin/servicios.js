var express = require('express');
var router = express.Router();

var serviciosModel = require('../../models/serviciosModel');

router.get('/', async function(req, res, next) {

    var servicios = await serviciosModel.getServicios();
    res.render('admin/servicios', {
        layout: 'admin/layout',
        servicios
    });
});

module.exports = router;