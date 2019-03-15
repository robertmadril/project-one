/* PSEUDOCODE/TO-DO

Daniel: 

Robert:
Create AJAX calls to exercise API
Research data collection and output
*/
var queryurl = ""
$.ajax({
    url: queryurl,
    method: "GET"
}).then(function(response){
    var results = response.data;

    console.log(results);

}, function(err) {
    console.log("error received:" + err)
})