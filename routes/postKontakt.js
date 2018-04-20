const db = require('../config/sql').connect();

module.exports = function (app) {
	app.put('/beksed/:navn/:email/:tlf/:emne/:besked', function (req, res) {
		let sql = `insert into bestillinger set navn = '${req.params.navn}',email = '${req.params.email}',tlf = ${req.params.tlf},emne='${req.params.emne}',besked='${req.params.besked}'`;
		console.log(sql)
		db.query(sql, (err, data) => {
			if (err) {
				console.log(err)
			} else {
				// res.json(200);'
				console.log(data)
				res.send(200);
			}
		})
	})
}