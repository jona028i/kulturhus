const db = require('../config/sql').connect();

module.exports = function (app) {
	console.log('test')
	app.put('/update/:id/:seat', function (req, res) {
		console.log('put test')
		let sql = `update arrangement set seatsstatus = '${req.params.seat}' where id = ${req.params.id}`;
		// console.log(sql)
		db.query(sql, (err, data) => {
			console.log('put after test')
			if (err) {
				console.log(err)
			} else {
				// res.json(200);
				res.send(200);
			}
		})
	})
}