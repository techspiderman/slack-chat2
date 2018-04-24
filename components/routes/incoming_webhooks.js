var debug = require('debug')('botkit:incoming_webhooks');
var express = require('express')
var request = require('request')
var bodyParser = require('body-parser')
var app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

function sendMessageToSlackResponseURL(responseURL, JSONmessage){
    var postOptions = {
        uri: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: JSONmessage
    }
    request(postOptions, (error, response, body) => {
        if (error){
            // handle errors as you see fit
        }
    })
}

module.exports = function(webserver, controller) {

    debug('Configured /slack/receive url');
    webserver.post('/slack/receive', function(req, res) {

        // NOTE: we should enforce the token check here

        // respond to Slack that the webhook has been received.
        res.status(200);

        // Now, pass the webhook into be processed
        controller.handleWebhookPayload(req, res);

    });

    // webserver.post('/slack/send-me-button', function(req, res) {

    //     // NOTE: we should enforce the token check here

    //     // respond to Slack that the webhook has been received.
    //     res.status(200);
    //     console.log('test button');
    //     // Now, pass the webhook into be processed
    //     controller.handleWebhookPayload(req, res);

    // });


     webserver.post('/slack/send-me-button', function(req, res) {

    res.status(200).end() // best practice to respond with empty 200 status code
    var reqBody = req.body
    var responseURL = reqBody.response_url
   // if (reqBody.token != YOUR_APP_VERIFICATION_TOKEN)
    	if (1===2) {
        res.status(403).end("Access forbidden")
    }else{
        var message = {
            "text": "This is your first interactive message",
            "attachments": [
                {
                    "text": "Building buttons is easy right?",
                    "fallback": "Shame... buttons aren't supported in this land",
                    "callback_id": "button_tutorial",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "yes",
                            "text": "yes",
                            "type": "button",
                            "value": "yes"
                        },
                        {
                            "name": "no",
                            "text": "no",
                            "type": "button",
                            "value": "no"
                        },
                        {
                            "name": "maybe",
                            "text": "maybe",
                            "type": "button",
                            "value": "maybe",
                            "style": "danger"
                        }
                    ]
                }
            ]
        }
        sendMessageToSlackResponseURL(responseURL, message);
          console.log('test button');
        // Now, pass the webhook into be processed
        controller.handleWebhookPayload(req, res);
    }
});

     controller.on('interactive_message_callback', function(bot, message) {

    var ids = message.callback_id.split(/\-/);
    console.log('id' + ids);
    console.log('message:' + message);

     });


}
