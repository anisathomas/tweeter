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
  $(".new-tweet").hide();
  $( ".compose-button" ).click(function() {
    $( ".new-tweet" ).toggle();
    $("textarea").focus().select();
  });
 $("form").on( "submit", function( event ) {
    event.preventDefault();
    var serializedData = $(this).serialize();
    var textarea = $('.new-tweet textarea')
    console.log(textarea.val());
    if( textarea.val() > 140){
      alert("Error: Your tweet content is too long");
    } else if (textarea.val() === "" ){
      alert ("Error: Your tweet content is not present")
    } else {
      //console.log(serializedData);
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


function renderTweets(tweets) {
  $('.sectionOfTweets').empty()
  //sort tweets b4 appending latest tweet
  var sortedTweets = tweets.sort(function(a, b){
    return b.created_at-a.created_at;
  })
  for (var i = 0; i < sortedTweets.length; i++){
    var $tweet = createTweetElement(sortedTweets[i]);
    ($tweet).appendTo('.sectionOfTweets')
  }

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the section of tweets container
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
//used like this: const safeHTML = `<p>${escape(textFromUser)}</p>`;
//added escape to actual tweet, user name and user handle

function createTweetElement(tweet) {
  var $tweet = $("<article>");
  var $header = $("<header>");
  ($header).appendTo($tweet);

  //first appending stuff to header
  $(`<img src=${tweet.user.avatars.regular}>`).appendTo($header);
  var $spanName = $("<span class='name'>");
  ($spanName).appendTo($header);
  $(`<b>${escape(tweet.user.name)}</b>`).appendTo($spanName);
  $(`<span class='handle'>${escape(tweet.user.handle)}</span>`).appendTo($header);

  //second append the tweet
  $(`<p class='tweetText'>${escape(tweet.content.text)}</p>`).appendTo($tweet);

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


