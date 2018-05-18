
module.exports = function(controller) {


    controller.hears(['^'], 'direct_message,direct_mention,mention', function(bot, message) {
        //bot.reply(message, " " + message.team);
       
       // bot.reply(message,"Congratulations on your success! Your success:" + message.text + " has been added to your success log.");
        bot.replyAcknowledge();

bot.reply(message, {
        attachments:[
            {
                title: 'Congratulations on your success:'+ JSON.stringify(message)+ '. Which of your traits helped you in achieving this success?',
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
                title: 'Congratulations on your success:' + message.raw_message.text + '. What traits helped you?',
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
                title: 'Great. Good to know that trait:' + message.actions[0].value + ' helped you achieve this success. What skills helped you?',
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

if (message.callback_id === '456'   ){

    bot.replyInteractive(message, {
      
        attachments: [
            {
                title: 'Great. Good to know that skill:' + message.actions[0].value + ' helped you achieve this success.' ,
                callback_id: '789',
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
