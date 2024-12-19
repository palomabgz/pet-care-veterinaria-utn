var express = require('express');
var router = express.Router();

var citasModel = require('../../models/citasModel');

router.get('/', async function(req, res, next) {

    var citas = await citasModel.getCitas();
    res.render('admin/citas', {
        layout: 'admin/layout',
        citas
    });
});

router.post('/citas', async (req, res, next) => {
    try {
        if (req.body.name != "" && req.body.content != "") {
            await citasModel.insertCita(req.body);
            res.redirect('/admin/citas');
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