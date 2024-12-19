var pool = require('./bd');

async function getCitas() {
        var query = "select * from citas_bd";
        var rows = await pool.query(query);
        return rows;
}

async function insertCita(obj) {
        try {
                var query = "insert into citas_bd set ?";
                var rows = await pool.query(query, [obj]);
                return rows;
        } catch (error) {
                console.log(error);
                throw error;
        }
}

module.exports = { getCitas, insertCita }