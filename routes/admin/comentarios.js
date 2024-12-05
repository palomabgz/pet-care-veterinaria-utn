var express = require('express');
var router = express.Router();

var comentariosModel = require('../../models/comentariosModel');

router.get('/', async function(req, res, next) {

    var comentarios = await comentariosModel.getComentarios();
    res.render('admin/comentarios', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        comentarios
    });
});

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var comentario = await comentariosModel.getComentarioById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        comentario
    });
});

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await comentariosModel.deleteComentariosById(id);
    res.redirect('/admin/comentarios');
});

router.get('/añadir', (req, res, next) => {
    res.render('admin/añadir', {
        layout: 'admin/layout'
    });
});

router.post('/anadir', async (req, res, next) => {
    try {
        if (req.body.name != "" && req.body.content != "") {
            await comentariosModel.insertComentario(req.body);
            res.redirect('/admin/comentarios');
        } else {
            res.render('admin/añadir', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son obligatorios'
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/añadir', {
            layout: 'admin/layout',
            error: true,
            message: 'Error al insertar comentario'
        });
    }
});

module.exports = router;