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

router.get('/citas', (req, res, next) => {
    res.render('admin/citas', {
        layout: 'admin/layout'
    });
});

router.post('/citas', async (req, res, next) => {
    try {
        if (req.body.name != "" && req.body.content != "") {
            await serviciosModel.insertCita(req.body);
            res.redirect('/admin/servicios');
        } else {
            res.render('admin/citas', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son obligatorios'
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/citas', {
            layout: 'admin/layout',
            error: true,
            message: 'Error al enviar tu consulta'
        });
    }
});

module.exports = router;