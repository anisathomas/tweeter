/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


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


$(document).ready(function () {
  renderTweets(data);
// var $tweet = createTweetElement(tweetData);
// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('.sectionOfTweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});