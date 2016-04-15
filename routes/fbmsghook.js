var express = require('express');
var router = express.Router();

router.get('/fbmsghook', function(req, res) {

	if (req.query['hub.verify_token'] === 'hello-there') {
    	res.send(req.query['hub.challenge']);
  	}

  	res.send('Error, wrong validation token');
});

module.exports = router;
