var pool = require('./bd');

async function getComentarios() {
        var query = "select * from comentarios_bd";
        var rows = await pool.query(query);
        return rows;
}

async function deleteComentariosById(id) {
    var query = "delete from comentarios_bd where id = ?";
    var rows = await pool.query(query, [id]);
    return rows;
}

module.exports = { getComentarios, deleteComentariosById }