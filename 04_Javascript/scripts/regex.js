window.onload = function() {

  var jsPattern = new RegExp('javascript');
  if (jsPattern.test('Is javascript a good language?')) {
    log('The sentence contained javascript');
  } else {
    log('The sentence did not contained javascript');
  }

  var costPattern = /\$\d+(\.\d+)?/;
  var review = 'I paid $199.99 for this item';
  var newString = review.replace(costPattern, '$...');
  log(newString);

  var wordPattern = /the/ig; // case insensitive, global
  var sentence = 'The quick brown fox jumped over the lazy dog';
  var replacement = sentence.replace(wordPattern, 'a');
  log(replacement);

  var emailPattern = /^[a-zA-Z_\.]+@\w+(\.\w+)+$/;
  var userEmail = 'randy.fortier@uoit.ca';
  if (emailPattern.test(userEmail)) {
    log('That E-Mail is legit');
  }
};

function log(message) {
  var output = document.getElementById('output');
  output.innerHTML += '<div>' + message + '</div>';
}
