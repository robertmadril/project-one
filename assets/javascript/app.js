$(document).ready(function () {

    //Initial food list populates on first page
    function getMealPlan(id) {
        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=" + id;

        $.ajax({
            method: "GET",
            url: queryURL,
            dataType: "json",
            headers: {
                'X-RapidAPI-Key': "cabf872889msh67628a4bb120a43p1a985djsn773dfb9ac0e5"
                // 'Accept: application/json' 
            }
        }).done(function (response) {
            console.log(response);
            for (i = 0; i < 3; i++) {
                var newFood = $("<div>");
                var foodImg = $("<img>");
                newFood.attr("id", response.meals[i].id);
                newFood.addClass("food-display");
                foodImg.attr("src", "https://spoonacular.com/recipeImages/" + response.meals[i].image);

                newFood.append(response.meals[i].title);
                newFood.append(foodImg);


                $("#meal-div").append(newFood);
                ;
            }

        }).fail(function (err) {
            console.log(err);
        });

    };

    //function that will populate recipe info 
    function getRecipeInfo(id) {

        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/information/";

        $.ajax({
            method: "GET",
            url: queryURL,
            dataType: "json",
            headers: {
                'X-RapidAPI-Key': "cabf872889msh67628a4bb120a43p1a985djsn773dfb9ac0e5"
                // 'Accept: application/json' 
            }
        }).done(function (response) {
            console.log(response);
            var jQuerySelect = "#" + recipeId;

            $(jQuerySelect).html(response)


        }).fail(function (err) {
            console.log(err)
        });

    };

    function getExercise() {

        //exercise api call
        var exerciseId = 10;
        var exerciseQueryUrl = "https://wger.de/api/v2/exercise/?language=2&format=json&category=" + exerciseId + "&status=2";
        var exerciseImg = "https://wger.de/api/v2/exerciseimage/";
    
        $.ajax({
            url: exerciseQueryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response)
    
            for (i = 0; i < 3; i++) {
                var newExercise = $("<div>");
                newExercise.html(response.results[i].description);
                $("#workouts-div").append(newExercise);
                ;
            }
    
        }, function(err) {
            console.log("error received:" + err);
        })
    };

    //carousel functionality for materialize
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });


    //Functions for slider

    $("#start-button").on("click", function () {
        $('.carousel').carousel('next')

    });

    //button functions

    $(".goal-buttons").on("click", function () {
        //food api call
        var calories = ($(this).attr("value"));
        getMealPlan(calories);
        getExercise();



    });

    $("body").on("click", ".food-display", function() {
        var recipeId = $(this).attr("id");
        console.log(recipeId);
        //Placeholder for save buttons and recipe display
       // getRecipeInfo(recipeId);


    });

});
