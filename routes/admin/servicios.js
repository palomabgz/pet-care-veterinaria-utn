var express = require('express');
var router = express.Router();

var serviciosModel = require('../../models/serviciosModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);

router.get('/', async function(req, res, next) {

    var servicios = await serviciosModel.getServicios();
    res.render('admin/servicios', {
        layout: 'admin/layout',
        servicios
    });
});

router.get('/citas', (req, res, next) => {
    const message = req.session.message;
    delete req.session.message; 

    res.render('admin/citas', {
        layout: 'admin/layout',
        message: message || null
    });
});

router.post('/citas', async (req, res, next) => {
    try {
        var img_id = '';
        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.name != "" && req.body.content != "") {
            await serviciosModel.insertCita({ 
                ...req.body,
                img_id
            });

            req.session.message = 'Cita enviada';
            res.redirect('/admin/servicios/citas');

        } else {
            res.render('admin/citas', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son obligatorios',
                errorType: 'missing_fields'
            });
        }

    } catch (error) {
        console.log(error);
        res.render('admin/citas', {
            layout: 'admin/layout',
            error: true,
            message: 'Error al reservar tu cita',
            errorType: 'send_error'
        });
    }
});

module.exports = router;