var topics = ["dog", "cat", "monkey", "bird"];              //array of gif categories
var index = 0;                                      //index at which the array is at
var userInput;

function generateButton() {
    for (; index < topics.length; index++) {
        var newDiv = $("<div>").addClass("btn-group");
        var nameBtn = $("<button>");
        nameBtn.attr("data-name", topics[index]).text(topics[index]).addClass("btn btn-info gif-btn");
        newDiv.append(nameBtn)
        $("#btnContainer").append(newDiv);
    }
}

generateButton();

$(document).ready(function(){
    $("#btn-submit").on("click", function(event) {
        event.preventDefault();
        userInput = $("#gifInput").val();
        if (!(userInput === "")) {                  //create a button if value exists
            $("#gifInput").val("");
            topics.push(userInput);
            generateButton();    
        }
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
                .attr("data-srcAnimated", gifArray[i].images.fixed_height.url)
                .attr("data-srcOriginal", gifArray[i].images.original.url);

                gifDiv.append(pDiv, imgDiv);
                $("#gifContainer").prepend(gifDiv);
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

    $(document).on("click", "img", function() {
        $("#myModal").css("display", "block");
        $("#imgModal").attr("src", $(this).attr("data-srcOriginal"));
    });

    $(".close").on("click", function() {
        $("#myModal").css("display", "none");
    })

})