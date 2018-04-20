const db = require('../config/sql').connect();

module.exports = function (app) {
	app.get('/getsal/:tlf', function (req, res) {
		console.log('put test')
		let sql = `select * from bestillinger where tlf = ${parseInt(req.params.tlf)}`;
		console.log('getdata')
		console.log(sql)
		db.query(sql, (err, data) => {
			console.log('getdata after test')
			if (err) {
				console.log(err)
			} else {
				// res.json(200);
				res.send(data);
			}
		})
	})
}