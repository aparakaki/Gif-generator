var topics = ["dog", "cat", "racoon"];              //array of gif categories
var index = 0;                                      //index at which the array is at
var userInput;

function generateButton() {
    for (; index < topics.length; index++) {
        var nameBtn = $("<button>");
        nameBtn.attr("data-name", topics[index]).text(topics[index]).addClass("btn btn-info gif-btn");
        $("#btnContainer").append(nameBtn);
    }
}

generateButton();

$(document).ready(function(){
    $("#btn-submit").on("click", function(event) {
        event.preventDefault();
        userInput = $("#gifInput").val();
        $("#gifInput").val("");
        topics.push(userInput);
        generateButton();
    })

    $(document).on("click", ".gif-btn", function() {
        var name = $(this).attr("data-name");
        $.ajax({
            url: `https://api.giphy.com/v1/gifs/search?api_key=ZFORjkoW1B7ESL1Rf9WiHZsaswCFqsSe&q=${name}&limit=10`,
            method: "GET"
        }).then(function(response) {
            var gifArray = response.data;

            for(var i = 0; i < gifArray.length; i++) {
                var gifDiv = $("<div>").addClass("imgContainer");
                var pDiv = $("<p>").text("Rating: " + gifArray[i].rating);
                var imgDiv = $("<img>").attr("src", gifArray[i].images.fixed_height_still.url)
                .attr("data-srcStill", gifArray[i].images.fixed_height_still.url)
                .attr("data-srcAnimated",gifArray[i].images.fixed_height.url);

                gifDiv.append(pDiv, imgDiv);
                $("#gifContainer").append(gifDiv);
            }
            console.log(response);
        })        
    })

    $(document).on("mouseenter", "img", function() {
        $(this).attr("src", $(this).attr("data-srcAnimated"));
    });

    $(document).on("mouseleave", "img", function() {
        $(this).attr("src", $(this).attr("data-srcStill"));
    });

})