var express = require('express');
var router = express.Router();

var novedadesModel = require('../../models/novedadesModel');

router.get('/', async function(req, res, next) {

    var novedades
    if (req.query.q === undefined) {
        novedades = await novedadesModel.getNovedades();
    } else {
        novedades = await novedadesModel.buscarNovedad(req.query.q);
    }

    res.render('admin/novedades', {
        layout: 'admin/layout',
        novedades,
        is_search: req.query.q !== undefined,
        query: req.query.q
    });
});

module.exports = router;