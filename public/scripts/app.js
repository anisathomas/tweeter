/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function loadTweets (){
    $.ajax({
          url: 'http://localhost:8080/tweets',
          method: 'GET',
          success: function (tweets) {
            renderTweets(tweets);
          }
     });
  }


$(document).ready(function () {

   $("form").on( "submit", function( event ) {
    event.preventDefault();
    var serializedData = $(this).serialize();
    if(serializedData.length > 140){
      alert("Error: Your tweet content is too long");
    } else if (serializedData === "text=" ){
      alert ("Error: Your tweet content is not present")
    } else {
      console.log(serializedData);
      $.ajax({
            url: 'http://localhost:8080/tweets',
            method: 'POST',
            data: serializedData,
            success: function () {
              loadTweets();
            }
      });
    }
  });

 loadTweets();

});



// The form should not be cleared
// The form should not submit


// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];


function renderTweets(tweets) {
  for (var i = 0; i < tweets.length; i++){
    var $tweet = createTweetElement(tweets[i]);
    ($tweet).appendTo('.sectionOfTweets')
  }
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the section of tweets container
}

function createTweetElement(tweet) {
  var $tweet = $("<article>");
  var $header = $("<header>");
  ($header).appendTo($tweet);

  //first appending stuff to header
  $(`<img src=${tweet.user.avatars.regular}>`).appendTo($header);
  var $spanName = $("<span class='name'>");
  ($spanName).appendTo($header);
  $(`<b>${tweet.user.name}</b>`).appendTo($spanName);
  $(`<span class='handle'>${tweet.user.handle}</span>`).appendTo($header);

  //second append the tweet
  $(`<p class='tweetText'>${tweet.content.text}</p>`).appendTo($tweet);

  var $footer = $("<footer>");
  ($footer).appendTo($tweet);

  //third append stuff the footer
  $(`<p class='time'><small>${tweet.created_at} days ago</small></p>`).appendTo($footer);

  var $div = $("<div class='clearfix'>");
  ($div).appendTo($footer);
  $("<i class='icon fas fa-flag'></i>").appendTo($div);
  $("<i class='icon fas fa-heart'></i>").appendTo($div);
  $("<i class='icon fas fa-retweet'></i>").appendTo($div);

  return $tweet;
}

