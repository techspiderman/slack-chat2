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
    
bot.createConversationInThread(message, function(err, convo) {

    // create a path for when a user says YES
    convo.addMessage({
            text: 'How nice you gained motivation from this.',
    },'yes_thread');

    // create a path for when a user says NO
    convo.addMessage({
        text: 'You said no, that is too bad.',
    },'no_thread');

    // create a path where neither option was matched
    // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
    convo.addMessage({
        text: 'Sorry I did not understand.',
        action: 'default',
    },'bad_response');

    // Create a yes/no question in the default thread...
    convo.addQuestion('Congratulations on your success! What did you gain from this success?', [
        {
            pattern: 'motivation',
            callback: function(response, convo) {
                convo.gotoThread('yes_thread');
            },
        },
        {
            pattern: 'no',
            callback: function(response, convo) {
                convo.gotoThread('no_thread');
            },
        },
        {
            default: true,
            callback: function(response, convo) {
                convo.gotoThread('bad_response');
            },
        }
    ],{},'default');

    convo.activate();
});


    });



};
