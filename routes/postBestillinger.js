const db = require('../config/sql').connect();

module.exports = function (app) {
	app.put('/bestilling/:navn/:email/:tlf/:sal/:plads', function (req, res) {
		console.log('put test')
		let sql = `insert into bestillinger set navn = '${req.params.navn}',email = '${req.params.email}',tlf = ${req.params.tlf},sal=${req.params.sal},plads='${req.params.plads}'`;
		console.log('bestill')
		console.log(sql)
		db.query(sql, (err, data) => {
			console.log('bestill after test')
			if (err) {
				console.log(err)
			} else {
				// res.json(200);
				res.send(200);
			}
		})
	})
}