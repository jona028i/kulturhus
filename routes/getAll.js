const db = require('../config/sql').connect();

module.exports = function (app) {
	app.get('/alle', function (req, res) {
		// db.query(`Select * from arrangement`, function (err, data) {
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
		arrangement.fk_cat = kategori.id`, function (err, data) {
			if (err) {
				console.log(err)
			} else {
				res.send(data);
			}
		})
	})
}