/* PSEUDOCODE/TO-DO

Daniel: 

Robert: Create AJAX calls to food API
Create AJAX calls to exercise API
Research data collection and output
*/

$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });


//food api call
var foodKey = "857e05a4f7c6d5050482bf2837e74da2";
var foodId = "102f2f2e";
var foodQueryUrl = "https://api.edamam.com/search?q=breakfast&app_id=" + foodId + "&app_key=" + foodKey + "&from=0&to=3&calories=591-722";

$.ajax({
    url: foodQueryUrl,
    method: "GET"
}).then(function(response){

    console.log(response);

}, function(err) {
    console.log("error received:" + err)
})


//exercise api call
var exerciseKey = "";
var exerciseQueryUrl = "";

$.ajax({
    url: exerciseQueryUrl,
    method: "GET"
}).then(function(response){

    console.log(response);

}, function(err) {
    console.log("error received:" + err)
})