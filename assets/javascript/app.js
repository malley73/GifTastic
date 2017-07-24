$(document).ready(function() {
  // Initial array of searches
  var starWarsTerms = ["Obi-Wan Kenobi", "Luke Skywalker", "Princess Leia", "Han shot first"];
  renderButtons();

  function readystate() {
    $("button").on("click", function() {
      var search = $(this).attr("searchterm");
      search = search.replace(/ /g, "+");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=Star+Wars+" + search + "&api_key=dc6zaTOxFJmzC&limit=10";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        var results = response.data;
        for (i = 0; i < results.length; i++) {
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            var gifDiv = $("<div class='gif'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("class", "gif");
            gifImage.attr("imagestill", results[i].images.fixed_height_still.url);
            gifImage.attr("imageanimated", results[i].images.fixed_height.url);
            gifImage.attr("gifstate", "still");
            gifDiv.append("<br>");
            gifDiv.append(p);
            gifDiv.append(gifImage);
            $(".giphycontainer").prepend(gifDiv);
          }
        }
        $(".gif").on("click", function() {
          var currentState = $(this).attr("gifstate");
          if (currentState === "still") {
            $(this).attr("src", $(this).attr("imageanimated"));
            $(this).attr("gifstate", "animate");
          } else {
            $(this).attr("src", $(this).attr("imagestill"));
            $(this).attr("gifstate", "still");
          }
        });
      });
    });
  }
  // This function handles events where one button is clicked
  $("#addsearch").on("click", function(event) {
    event.preventDefault();
    var searchTerm = $("#starwarsinput").val().trim();
    if (searchTerm != ""){
      starWarsTerms.push(searchTerm);
    }
    renderButtons();
  });

  function renderButtons() {
    $(".buttoncontainer").empty();
    $(".buttoncontainer").append("<br>");
    for (var i = 0; i < starWarsTerms.length; i++) {
      var a = $("<button>");
      a.addClass("searchbutton");
      a.attr("searchterm", starWarsTerms[i]);
      a.text(starWarsTerms[i]);
      $(".buttoncontainer").append(a);
    }
    readystate();
  }

});