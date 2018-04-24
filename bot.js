/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var env = require('node-env-file');
env(__dirname + '/.env');


if (!process.env.clientId || !process.env.clientSecret || !process.env.PORT) {
  console.log('Error: Specify clientId clientSecret and PORT in environment');
  usage_tip();
  process.exit(1);
}

console.log('port:' + process.env.PORT);
var Botkit = require('botkit');
var debug = require('debug')('botkit:main');

var bot_options = {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    // debug: true,
    scopes: ['bot']
};

bot_options.json_file_store = __dirname + '/.data/db/'; // store user data in a simple JSON format

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.slackbot(bot_options);

controller.startTicking();

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')(controller);

// Set up a simple storage backend for keeping a record of customers
// who sign up for the app via the oauth
require(__dirname + '/components/user_registration.js')(controller);

// Send an onboarding message when a new team joins
require(__dirname + '/components/onboarding.js')(controller);

var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./skills/" + file)(controller);
});



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

   //  res.status(200).end() // best practice to respond with empty 200 status code
   //  var reqBody = req.body
   //  var responseURL = reqBody.response_url
   // // if (reqBody.token != YOUR_APP_VERIFICATION_TOKEN)
   //   if (1===2) {
   //      res.status(403).end("Access forbidden")
   //  }else{
   //      var message = {
   //          "text": "This is your first interactive message",
   //          "attachments": [
   //              {
   //                  "text": "Building buttons is easy right?",
   //                  "fallback": "Shame... buttons aren't supported in this land",
   //                  "callback_id": "button_tutorial",
   //                  "color": "#3AA3E3",
   //                  "attachment_type": "default",
   //                  "actions": [
   //                      {
   //                          "name": "yes",
   //                          "text": "yes",
   //                          "type": "button",
   //                          "value": "yes"
   //                      },
   //                      {
   //                          "name": "no",
   //                          "text": "no",
   //                          "type": "button",
   //                          "value": "no"
   //                      },
   //                      {
   //                          "name": "maybe",
   //                          "text": "maybe",
   //                          "type": "button",
   //                          "value": "maybe",
   //                          "style": "danger"
   //                      }
   //                  ]
   //              }
   //          ]
   //      }
   //      sendMessageToSlackResponseURL(responseURL, message);
   //        console.log('test button');
   //      // Now, pass the webhook into be processed
   //      controller.handleWebhookPayload(req, res);
   //  }

 bot.reply(message, {
        attachments:[
            {
                title: 'Do you want to interact with my buttons?',
                callback_id: '123',
                attachment_type: 'default',
                actions: [
                    {
                        "name":"yes",
                        "text": "Yes",
                        "value": "yes",
                        "type": "button",
                    },
                    {
                        "name":"no",
                        "text": "No",
                        "value": "no",
                        "type": "button",
                    }
                ]
            }
        ]
    });



});

     controller.on('interactive_message_callback', function(bot, message) {

   bot.replyInteractive(message, {
        text: '...',
        attachments: [
            {
                title: 'My buttons',
                callback_id: '123',
                attachment_type: 'default',
                actions: [
                    {
                        "name":"yes",
                        "text": "Yes!",
                        "value": "yes",
                        "type": "button",
                    },
                    {
                       "text": "No!",
                        "name": "no",
                        "value": "delete",
                        "style": "danger",
                        "type": "button",
                        "confirm": {
                          "title": "Are you sure?",
                          "text": "This will do something!",
                          "ok_text": "Yes",
                          "dismiss_text": "No"
                        }
                    }
                ]
            }
        ]
    });
});
