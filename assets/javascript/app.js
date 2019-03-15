/* PSEUDOCODE/TO-DO

Daniel: 

Robert:
Create AJAX calls to exercise API
Research data collection and output
*/

var key = "857e05a4f7c6d5050482bf2837e74da2"
var id = "102f2f2e"
var queryurl = "https://api.edamam.com/search?q=breakfast&app_id=" + id + "&app_key=" + key + "&from=0&to=3&calories=591-722";
$.ajax({
    url: queryurl,
    method: "GET"
}).then(function(response){
;
    console.log(queryurl)
    console.log(response);

}, function(err) {
    console.log("error received:" + err)
})