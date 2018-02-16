$.support.cors = true;

$(document).ready(function() {
  var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22oshawa%2Con%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

  $.getJSON(url, function(data) {
    var channel = data.query.results.channel;
    var humidity = channel.atmosphere.humidity;
    var temperature = toCelcius(channel.item.condition.temp);
    var description = channel.item.condition.text;
    var sunrise = channel.astronomy.sunrise;
    var sunset = channel.astronomy.sunset;
    $('#results').append('<li>Temperature: ' + temperature + '&deg;C</li>')
    $('#results').append('<li>Humidity: ' + humidity + '%</li>')
  });
});

function toCelcius(farenheit) {
  return (farenheit - 32) * 5.0/9;
}
