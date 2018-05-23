$(document).ready(function() {

 $('.new-tweet textarea').on('keyup', function(){
  let input = $(this).val()
  let remainingChars = 140 - (input.length);
  //Test: console.log(remainingChars);
  if (remainingChars < 0) {
  $('.counter').text(remainingChars).css('color', 'red');
  } else {
  $('.counter').text(remainingChars);
  }

  });

});




