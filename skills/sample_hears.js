/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/

module.exports = function(controller) {


    controller.hears(['^'], 'direct_message,direct_mention,mention', function(bot, message) {
        //bot.reply(message, " " + message.team);
       
       // bot.reply(message,"Congratulations on your success! Your success:" + message.text + " has been added to your success log.");
        bot.replyAcknowledge();

bot.reply(message, {
        attachments:[
            {
                title: 'Congratulations on your success:'+ message.text + '. Which of your traits helped you in achieving this success?',
                callback_id: '123',
                attachment_type: 'default',
                actions: [
                    {
                        "name":"knowledge",
                        "text": "Knowledge",
                        "value": "Knowledge",
                        "type": "button",
                    },
                    {
                        "name":"speed",
                        "text": "Speed",
                        "value": "Speed",
                        "type": "button",
                    },
                    {
                        "name":"focus",
                        "text": "focus",
                        "value": "focus",
                        "type": "button",
                    }
                ]
            }
        ]
    });



// bot.createConversationInThread(message, function(err, convo) {

//     // create a path for when a user says YES
//     convo.addMessage({
//             text: 'How nice you gained motivation from this.',
//     },'yes_thread');

//     // create a path for when a user says NO
//     convo.addMessage({
//         text: 'You said no, that is too bad.',
//     },'no_thread');

//     // create a path where neither option was matched
//     // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
//     convo.addMessage({
//         text: 'Sorry I did not understand.',
//         action: 'default',
//     },'bad_response');

//     // Create a yes/no question in the default thread...
//     convo.addQuestion('Congratulations on your success! What did you gain from this success?', [
//         {
//             pattern: 'motivation',
//             callback: function(response, convo) {
//                 convo.gotoThread('yes_thread');
//             },
//         },
//         {
//             pattern: 'no',
//             callback: function(response, convo) {
//                 convo.gotoThread('no_thread');
//             },
//         },
//         {
//             default: true,
//             callback: function(response, convo) {
//                 convo.gotoThread('bad_response');
//             },
//         }
//     ],{},'default');

//     convo.activate();
// });


    });

controller.on('slash_command',function(bot,message) {

    // reply to slash command

   // console.log('test command');
    bot.replyAcknowledge();

    if (message.command === '/success')
    {
   
    bot.reply(message, {
        attachments:[
            {
                title: 'Congratulations on your success.' + JSON.stringify(message.actions) + ' What traits helped you?',
                callback_id: '123',
                attachment_type: 'default',
                actions: [
                    {
                        "name":"Speed",
                        "text": "Speed",
                        "value": "Speed",
                        "type": "button",
                    },
                    {
                        "name":"Focus",
                        "text": "Focus",
                        "value": "Focus",
                        "type": "button",
                    }
                ]
            }
        ]
    });

    }

});



// receive an interactive message, and reply with a message that will replace the original
controller.on('interactive_message_callback', function(bot, message) {

    // check message.actions and message.callback_id to see what action to take...
    bot.replyAcknowledge();

    if (message.callback_id === '123'   ){

    bot.replyInteractive(message, {
      
        attachments: [
            {
                title: 'Great. Good to know that ' + JSON.stringify(message) + ' helped you achieve this success. What skills helped you?',
                callback_id: '456',
                attachment_type: 'default',
                actions: [
                    {
                        "name":"Creativity",
                        "text": "Creativity",
                        "value": "Creativity",
                        "type": "button",
                    },
                    {
                       "text": "Positivity",
                        "name": "Positivity",
                        "value": "Positivity",
                       
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

}
} );

};
