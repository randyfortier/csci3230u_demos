$.support.cors = true;

$(document).ready(function() {
  var key = 'AIzaSyA2rJ3kuns7kM0B-qLeGl6-BLpM_9whQr0';

  $('#searchButton').click(function() {
    var keyword = $('#query').val();
    console.log(keyword);
    var url = 'https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&q=' + keyword + '&key=' + key;

    var maxVideos = 5;
    $('#results ol').html('');
    $('#videos').html('');
    $.getJSON(url, function(data) {
      $.each(data.items, function(index, item) {
        $('#results ol').append(renderResult(item));
        $('#videos').append(renderVideo(item));
      });
    });
  });
});

function renderResult(item) {
  if (item.id.kind === 'youtube#video') {
    var output = '<li><a href="http://www.youtube.com/v/';
    output +=    item.videoId + '">' + item.snippet.title + '</a></li>'
    return $(output);
  } else {
    return '';
  }
}

function renderVideo(item) {
  if (item.id.kind == 'youtube#video') {
    var text = '<div>' +
               '  <embed width="420"' +
               '         height="345"' +
               '         src="http://www.youtube.com/v/' + item.videoId + '"' +
               '         type="application/x-shockwave-flash">' +
               '  </embed>' +
               '</div>';
    return text;
  } else {
    return '';
  }
}
