console.log("The bot is starting...");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

// Setup a user stream
var stream = T.stream('user');

// Anyone who tweets at me
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
  var replyto = eventMsg.in_reply_to_screen_name;
  var text = eventMsg.text;
  var from = eventMsg.user.screen_name;
  var que = /\w*\?/
  var dr = /[Dd]rink/
  var cu = /say to a cup/

  if (replyto === 'AskFatherJack') {
    checkText(text);
    //newtweet = '@' + from + ' Drink!' ;
    //console.log(newtweet);
    //tweetIt(newtweet);
  }

  function checkText(txtinput) {
    if (txtinput.match(dr)) {
      // newtweet = '@' + from + ' Drink!';
      tweetIt('@' + from + ' Drink!');
      //console.log("A drink");
    } else if (txtinput.match(cu)) {
      tweetIt('@' + from + ' Feck off Cup');
      //console.log("A cup");
    } else if (txtinput.match(que)) {
      var choice = Math.round(Math.random());
      if (choice == 0) {
        tweetIt('@' + from + ' That would be an ecumenical matter');
      }
      if (choice == 1) {
        tweetIt('@' + from + ' Yes');
      }
      //console.log("A question");
    }

    // function RandomStatement() {
    //   var t = round(random(1));
    //   if (t == 0) {
    //     tweetIt('@' + from + ' That would be an ecumenical matter');
    //   }
    //   if (t == 1) {
    //     tweetIt('@' + from + ' Yes');
    //   }
    // }
  }


  function tweetIt(txt) {
    var tweet = {
      status: txt
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
      if (err) {
        console.log("Error");
      } else {
        // console.log("It worked!");
      }
    }
  }
}
