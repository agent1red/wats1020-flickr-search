// Kevin Hudson 3020 2016



$(document).on('ready', function() {

  // click event function 
  $('button.search').click(function() {
    // searchbox input = variable tags 
    var tags = $('input[name="searchText"]').val();
    searchImages(tags);
    return false; // prevent a reload of the page which causes null in search box 
  });

  function searchImages(tags) {
    // create variable to shorten long API string 
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    //get tags from Flickr and datatype 

    $.getJSON(flickerAPI, {
        tags: tags,
        tagmode: "any",
        format: "json"
      })
      // after ajax do this bellow 
      .done(function(data) {
        $('#images').empty();
        //function for each items pulled from Flickr then return count and item 
        $.each(data.items, function(i, item) {
          var newList = $('<li class="item">'); // Creates new list with a class item in the HTML. Will be used for CSS styling as well 

          // setting list item to new list 

          $('<img>').attr("src", item.media.m).attr("title", item.title).attr("alt", item.description).appendTo(newList);

          $('<p></p>').text("Title : " + item.title).appendTo(newList);
          $('<p></p>').text("Date/Time : " + item.date_taken).appendTo(newList);
          $('<p></p>').text("Author : " + item.author).appendTo(newList);
          $('<a></a>').attr('href', item.link).text('View on Flickr.').appendTo(newList);


          // then appent the list to the image here
          newList.appendTo("#images");
          // after 10 pictures discontinue list 
          if (i === 11) {
            return false;
          }
        });
      });
  }
  // I changed the footer text with Jquery.
  $("footer").text("Kevin Hudson, WATS3020, Fall 2016.");

});