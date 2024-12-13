var pool = require('./bd');

async function getServicios() {
        var query = "select * from servicios_bd";
        var rows = await pool.query(query);
        return rows;
}

module.exports = { getServicios }