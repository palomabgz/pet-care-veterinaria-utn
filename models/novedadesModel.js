var pool = require('./bd');

async function getNovedades() {
        var query = "select * from novedades_bd";
        var rows = await pool.query(query);
        return rows;
}

async function buscarNovedad(busqueda) {
        var query = "select * from novedades_bd where titulo like ? OR subtitulo like ? OR contenido like ?";
        var rows = await pool.query(query, ["%" + busqueda + "%", "%" + busqueda + "%", "%" + busqueda + "%"]);
        return rows;
}

module.exports = { getNovedades, buscarNovedad }