$(document).ready(function() {
  // Initial array of searches
  var starWarsTerms = ["Crawl", "Luke Skywalker", "Princess Leia", "Han shot first"];

  function renderButtons() {
    $(".buttonContainer").empty();
    $(".buttonContainer").append("<br>");
    for (var i = 0; i < starWarsTerms.length; i++) {
      var a = $("<button>");
      a.addClass("searchButton");
      a.attr("searchTerm", starWarsTerms[i]);
      a.text(starWarsTerms[i]);
      $(".buttonContainer").append(a);
    }
  }

  // This function handles events where one button is clicked
  $("#addSearch").on("click", function(event) {
    console.log($("#addSearch").val());
    event.preventDefault();
    var searchTerm = $("#starWarsInput").val().trim();
    console.log(searchTerm);
    starWarsTerms.push(searchTerm);
    console.log(starWarsTerms);
    renderButtons();
  });
  renderButtons();

  $("button").on("click", function() {
    var search = $(this).attr("searchTerm");
    console.log(search);
    search=search.replace(/ /g,"+");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=Star+Wars+" + search + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;
      for (i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div class='images'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var gifImage = $("<img>");
          gifImage.attr("src", results[i].images.fixed_height_still.url);
          gifImage.attr("imageStill",results[i].images.fixed_height_still.url);
          gifImage.attr("imageAnimated",results[i].images.fixed_height.url);
          gifImage.attr("state","still");
          gifImage.attr("class","gif");
          gifDiv.append(p);
          gifDiv.append(gifImage);
          $(".giphyContainer").prepend(gifDiv);
        }
      }
    });
  });

$(".gif").on('click',function(){
  var state=$(this).attr("state");
  if(state==="still"){
    $(this).attr("src",$(this).attr("imageAnimated"));
    $(this).attr("state","animate");
  }else{
    $(this).attr("src",$(this).attr("imageStill"));
    $(this).attr("state","still");    
  }
})
});