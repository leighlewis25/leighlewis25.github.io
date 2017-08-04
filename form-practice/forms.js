function showInCaps(){
  var userText = $('#message').val();
  $('#result').text(userText.toUpperCase());
}
function fToC(){
  var f = $('#fahrenheit').val();
  $('#result2').text((f-32)/1.8)
}
function setUp(){
$('#message').on('input',showInCaps);
$('#fahrenheit').on('input',fToC);
}

$(document).ready(setUp);
$('#carouselHacked').carousel();
