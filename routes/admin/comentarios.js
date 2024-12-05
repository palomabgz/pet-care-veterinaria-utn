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

module.exports = router;