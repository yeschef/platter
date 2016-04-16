var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

	if (req.query['hub.verify_token'] === 'hello-there') {
    	res.send(req.query['hub.challenge']);
  	}

  	res.send('Error, wrong validation token');
});

var token = "EAAIrrETR0hQBAFf4HY0PVu86hq7JndZCaUdtOZCz8I5l08nZBaIw2GoAH3O4LycgFSZBADSsrscqPFmBH3fZBRIRYz0EP8qzFDWPR1nXYFeWMaC1mF6KWIsxxIDTuggWPTcIwZCZBmhfv2RW1am2RwidG4chNuPYu8WmMdFQVwDWwZDZD";

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
};

router.post('/', function(req, res, next) {
	messaging_events = req.body.entry[0].messaging;

	for (i = 0; i < messaging_events.length; i++) {
	    event = req.body.entry[0].messaging[i];
	    sender = event.sender.id;
	    if (event.message && event.message.text) {
	      text = event.message.text;
	      // Handle a text message from this sender
	      // console.log(text);
	      sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
	    }
  	}

  	next();
},function(req, res){
  	res.sendStatus(200);
});



module.exports = router;
