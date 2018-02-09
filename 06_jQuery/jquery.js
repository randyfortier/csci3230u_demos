var provinces = {Canada: ['Alberta', 'BC', '...'],
                 USA: ['Alabama', 'Alaska', '...']};

$(document).ready(function() {
  $('#btnRegister').click(function() {
    log('register button clicked');
  });
  $('#btnRegister').dblclick(function() {
    log('register button double clicked');
  });
  /*
  $('#btnRegister').toggle(function() {
    log('register button toggled on');
  }, function() {
    log('register button toggled off');
  });
  */
  $('form').submit(function() {
    log('form submitted');
    return false;
  });
  $('#txtFirstName').mouseenter(function() {
    log('mouse entered text field');
  });
  $('#txtFirstName').mouseleave(function() {
    log('mouse left text field');
  });
  $('#txtFirstName').focus(function() {
    log('user focused the text field');
  });
  $('#txtFirstName').change(function() {
    log('user changed the text field content');
    var userInput = $('#txtFirstName').val();
    if (userInput === '') {
      $('#txtFirstName').css({backgroundColor: 'red'});
    } else {
      $('#txtFirstName').css({backgroundColor: 'green'});
    }
  });

  $('#lstCountry').change(function() {
    var country = $('#lstCountry').val();
    log('changed the country selection:' + country);
    var provs = provinces[country];
    var content = '';
    $.each(provs, function(index, value) {
      content += '<option>' + value + '</option>'
    });
    $('#lstProvince').html(content);
  }).change();
});

function log(message) {
  var newDiv = $('<div />');
  newDiv.text(message);
  newDiv.attr('style', 'background-color: lightBlue');
  $('#output').append(newDiv);
}
