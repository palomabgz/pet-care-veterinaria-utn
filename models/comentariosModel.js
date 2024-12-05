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

async function insertComentario(obj) {
    try {
        var query = "insert into comentarios set ?";
        var rows = await pool.query(query, [obj]);
        return rows;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getComentarios, deleteComentariosById, insertComentario }