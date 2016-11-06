// The following code is meant to provide example and guidance if you get stuck.
// Try not to just copy it. That won't help you learn. :)
//
// Flickr Public Feeds and $.getJSON()
//
// This example uses the $.getJSON() method. Feeds are
// useful for getting publicly available photos and related information, but
// they do not support nearly all of the features of the full API. With an API
// Key and using a more complex approach, you can write apps that allow nearly
// all of the functions Flickr offers.
$(document).on('ready', function(){
  var searchImages = function(tags) {
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    console.log(tags);
    $('#images').innerHTML = '<li class="search-throbber">Searching...</li>';
    $.getJSON( flickrAPI, {
      tags: tags,
      tagmode: "any",
      format: "json"
    }).done(function( data ) {
      $('#images').empty();
      $('h1.search-title').first()[0].innerHTML = "Search for: " + tags;
      $.each( data.items, function( i, item ) {
        var newListItem = $("<li>")
        // If you're not doing the modal, then show info about the image.
        var newTitle = $('<p class="image-title">').html(item.title).appendTo(newListItem);
        var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newListItem);
        var newDescription = $('<p class="image-description">').html(item.description).appendTo(newListItem);
        var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').appendTo(newListItem);

        newListItem.appendTo( "#images" );
        if ( i === 15 ) {
          return false;
        }
      });
    });
  };

  
  
  
  
  $('button.search').on('click', function(event){
    event.preventDefault();
    var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    console.log(searchTextInput);
    searchImages(searchTextInput.value);
  });
});