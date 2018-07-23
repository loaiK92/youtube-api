$(function() {
  const responseContainer = $("#site");

  // result dropdown event
  let boolean = true;
  $("#dropbtn").click(function(e) {
    e.preventDefault();
    if (boolean) {
      $("#dropdown-content").css({ display: "block", outline: "none" });
      boolean = !boolean;
    } else {
      $("#dropdown-content").css({ display: "none", outline: "none" });
      boolean = !boolean;
    }
  });

  $("#dropdown-content").click(function() {
    $("#dropdown-content").css({ display: "none", outline: "none" });
    boolean = !boolean;
  });

  // $('#dropbtn').blur(function(){
  //       $('#dropdown-content').css({'display': 'none', 'outline': 'none'});
  // });

  // select date(start , end) event
  $("#search-date-after")
    .focus(function() {
      $("#search-date-after").attr("type", "date");
    })
    .blur(function() {
      $("#search-date-after").attr({
        type: "text",
        placeholder: "Select start date"
      });
    });
  $("#search-date-before")
    .focus(function() {
      $("#search-date-before").attr("type", "date");
    })
    .blur(function() {
      $("#search-date-before").attr({
        type: "text",
        placeholder: "Select end date"
      });
    });

  // submit event
  $("form").on("submit", function(e) {
    e.preventDefault();
    let date = new Date();

    // handling select date
    $("#search-date-after").attr("type", "date");
    $("#search-date-before").attr("type", "date");

    if (!$("#search-date-after").val()) {
      $("#search-date-after").val("2005-01-01");
    }
    if (!$("#search-date-before").val()) {
      $("#search-date-before").val(
        `${date.getFullYear()}-0${date.getDay() + 1}-0${date.getMonth() + 1}`
      );
    }

    // YT api request of the input value
    let request = gapi.client.youtube.search.list({
      part: "snippet",
      type: "video",
      maxResults: "50",
      q: $("#search-keyword")
        .val()
        .replace(/%20/g, "+"),
      order: "viewCount",
      publishedAfter: $("#search-date-after").val() + "T00:00:00Z",
      publishedBefore: $("#search-date-before").val() + "T00:00:00Z"
    });
    request.execute(setVideo);

    function setVideo(result) {
      let htmlContent = "";
      responseContainer.html("");

      if (result.items.length > 1) {
        // handling iframe to view first video of the results
        $("#iFrame").attr(
          "src",
          `https://www.youtube.com/embed/${result.items[0].id.videoId}`
        );

        // create result dropdown content
        searchResultContent = result.items
          .map(
            article =>
              `<a href="https://www.youtube.com/embed/${
                article.id.videoId
              }?autoplay=1" target="iframe_a">* ${article.snippet.title}</a>`
          )
          .join("");

        // create search result content
        htmlContent =
          '<div class="d-flex flex-wrap justify-content-around">' +
          result.items
            .map(
              article =>
                `<div class="player d-flex">
                                    <a class="img-a" href="https://www.youtube.com/embed/${
                                      article.id.videoId
                                    }?autoplay=1" target="iframe_a"><img class="card-img-top" src="${
                  article.snippet.thumbnails.medium.url
                }" alt="Card image cap"></a>
                                    <div class="card-body position-relative">
                                          <h5 class="card-title"><a href="https://www.youtube.com/embed/${
                                            article.id.videoId
                                          }?autoplay=1" target="iframe_a">${
                  article.snippet.title
                }</a></h5>
                                          <small class="text-muted">${
                                            article.snippet.channelTitle
                                          }</small>
                                          <small class="pl-2">${article.snippet.publishedAt.substr(
                                            0,
                                            10
                                          )}</small>
                                          <p class="card-text pt-2">${
                                            article.snippet.description
                                          }</p>
                                          <span class="description">${
                                            article.snippet.description
                                          }<span class="description-span"></span></span>
                                          
                                    </div>
                              </div>`
            )
            .join("") +
          "</div>";
      } else {
        // handling iframe to view nothing if there is no results
        $("#iFrame").attr("src", `https://www.youtube.com/embed/none`);

        // create search result content if there is no results
        htmlContent = `<div class="text-center font-italic pt-5">
                                    <h3 class="font-weight-bold pt-5">Sorry There Is No Result For :<br><br>
                                    <span class="search-result">${$(
                                      "#search-keyword"
                                    ).val()}</span></h3>
                              </div>`;

        // create result dropdown content if there is no results
        searchResultContent = `<div class="text-center font-italic pt-2">
                                    <h3 class="font-weight-bold pt-5">Sorry There Is No Result For :<br><br>
                                    <span class="search-result">${$(
                                      "#search-keyword"
                                    ).val()}</span></h3>
                              </div>`;
      }
      // append search result content
      responseContainer.html(htmlContent);
      // append result dropdown content
      $("#dropdown-content").html(searchResultContent);
      $("#dropbtn").html(` Results:  ${result.items.length}`);

      // event to view the descriptions of the results
      $(".card-text")
        .mouseenter(function() {
          $(this)
            .next(".description")
            .css({ display: "block" });
        })
        .mouseleave(function() {
          $(this)
            .next(".description")
            .css({ display: "none" });
        });
    }
  });
});

function start() {
  // setting APIKEY
  const apikey = "AIzaSyBu7EoINePfdRd8x5omvta9CosQ6rUcl7U";
  gapi.client.setApiKey(apikey);
  gapi.client.load("youtube", "v3", function() {
    const responseContainer = $("#site");
    // create an array for query request
    let arr = [
      "surfing",
      "adele",
      "germanynews",
      "fun",
      "music",
      "animals",
      "new",
      "أغاني",
      "nasifzaiton",
      "withintemptation"
    ];

    // YT api request when you load the page
    let request = gapi.client.youtube.search.list({
      part: "snippet",
      type: "video",
      maxResults: "25",
      q:
        arr[Math.floor(Math.random() * arr.length)] +
        "|" +
        arr[Math.floor(Math.random() * arr.length)],
      order: "viewCount"
    });
    request.execute(setVideo);

    function setVideo(result) {
      let htmlContent = "";
      let searchResultContent = "";

      if (result.items.length > 1) {
        // handling iframe to view any video of the results using random number
        $("#iFrame").attr(
          "src",
          `https://www.youtube.com/embed/${
            result.items[Math.floor(Math.random() * 25 + 1)].id.videoId
          }`
        );

        // create result dropdown content
        searchResultContent = result.items
          .map(
            article =>
              `<a href="https://www.youtube.com/embed/${
                article.id.videoId
              }?autoplay=1" target="iframe_a">* ${article.snippet.title}</a>`
          )
          .join("");

        // create search result content
        htmlContent =
          '<div class="d-flex flex-wrap justify-content-around">' +
          result.items
            .map(
              article =>
                `<div class="player d-flex">
                                    <a class="img-a" href="https://www.youtube.com/embed/${
                                      article.id.videoId
                                    }?autoplay=1" target="iframe_a"><img class="card-img-top" src="${
                  article.snippet.thumbnails.medium.url
                }" alt="Card image cap"></a>
                                    <div class="card-body position-relative">
                                          <h5 class="card-title"><a href="https://www.youtube.com/embed/${
                                            article.id.videoId
                                          }?autoplay=1" target="iframe_a">${
                  article.snippet.title
                }</a></h5>
                                          <small class="text-muted">${
                                            article.snippet.channelTitle
                                          }</small>
                                          <small class="pl-2">${article.snippet.publishedAt.substr(
                                            0,
                                            10
                                          )}</small>
                                          <p class="card-text pt-2">${
                                            article.snippet.description
                                          }</p>
                                          <span class="description">${
                                            article.snippet.description
                                          }<span class="description-span"></span></span>
                                    </div>
                              </div>`
            )
            .join("") +
          "</div>";
      }
      // append search result content
      responseContainer.html(htmlContent);
      // append result dropdown content
      $("#dropdown-content").html(searchResultContent);
      $("#dropbtn").html(` Results:  ${result.items.length}`);

      // event to view the descriptions of the results
      $(".card-text")
        .mouseenter(function() {
          $(this)
            .next(".description")
            .css({ display: "block" });
        })
        .mouseleave(function() {
          $(this)
            .next(".description")
            .css({ display: "none" });
        });
    }
  });
}
