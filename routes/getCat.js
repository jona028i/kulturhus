const db = require('../config/sql').connect();

module.exports = function (app) {
	app.get('/alle/cat/:cat', function (req, res) {
		db.query(`SELECT
		arrangement.id,
		arrangement.navn,
		arrangement.beskrivelse,
		arrangement.længde,
		arrangement.date,
		arrangement.price,
		arrangement.ppr,
		arrangement.rækker,
		arrangement.seatsstatus,
		kategori.type
		FROM arrangement
		INNER JOIN
		kategori
		ON
		arrangement.fk_cat = kategori.id Where kategori.id = ?`, [req.params.cat], function (err, data) {
			if (err) {
				console.log(err)
			} else {
				res.send(data);
			}
		})
	})
}