

var homeImages = ["http://i.imgur.com/hYsw4TZ.jpg","http://i.imgur.com/mwIQz9Q.jpg","http://i.imgur.com/92iuV6H.jpg","http://i.imgur.com/yMP1cBX.jpg","http://i.imgur.com/GAp4lWV.jpg","http://i.imgur.com/fUsixsy.jpg","http://i.imgur.com/qrvxnNR.jpg","http://i.imgur.com/RBANoat.jpg","http://i.imgur.com/Bjvlg7B.jpg","http://i.imgur.com/tqQJpy6.jpg"];
//var imId = ["#photo1", "#photo2", "#photo3", "#photo4", "#photo5"]
currentImage1 = $("#photo1")
imageIndex = 0
fadeDuration = 3000
function rotateImage(){
  function updateImage() {
    $('#photo1').attr('src', homeImages[imageIndex])
  }
  console.log(homeImages[imageIndex]);
  $('#photo1').fadeOut(fadeDuration);
  setTimeout(updateImage, fadeDuration);
  $('#photo1').fadeIn(fadeDuration);
  imageIndex = imageIndex+1
  if (imageIndex == homeImages.length) {
    imageIndex = 0}
  }



 function setUp(){
   setInterval(rotateImage, 3*fadeDuration);



//   for(i = 5; i<10000000000000; i = i+5){
//     for(j=0; j<imId.length; j=j+1){
//       setTimeout(fadeOut, 5000);
//       setTimeout(fadeIn, 5000);
//     }
   }

$(document).ready(setUp);
$('#carouselFade').carousel();
