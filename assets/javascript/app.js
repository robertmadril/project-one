/* PSEUDOCODE/TO-DO

Daniel: 

Robert: Display information on page
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
    responseArr = response.hits;
    console.log(responseArr[1])

    for (i=0; i<responseArr.length; i++) {
       var newImg = $("<img>");
        
        newImg.attr("src", responseArr[i].recipe.image);
        $("#meal-div").append(newImg);
    }

}, function(err) {
    console.log("error received:" + err)
})


//exercise api call
var exerciseId = 10;
var exerciseQueryUrl = "https://wger.de/api/v2/exercise/?language=2&format=json&category=" + exerciseId + "&status=2";
var exerciseImg = "https://wger.de/api/v2/exerciseimage/"

$.ajax({
    url: exerciseQueryUrl,
    method: "GET"
}).then(function(response){
    console.log(response)
    
    for (i=0; i<3; i++) {
    var newExercise = $("<div>");
    newExercise.html(response.results[i].description);
    $("#workouts-div").append(newExercise);
    ;
    }

}, function(err) {
    console.log("error received:" + err)
})