const db = require('../config/sql').connect();

module.exports = function (app) {
	app.del('/del/:tlf', function (req, res) {
		let sql = `delete from bestillinger where tlf = ${req.params.tlf}`;
		console.log(sql)
		db.query(sql, (err, data) => {
			if (err) {
				console.log(err)
			} else {
				// res.json(200);'
				console.log(data);
				res.send(200);
			}
		})
	})
}