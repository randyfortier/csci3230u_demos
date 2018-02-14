window.onload = function() {
  var button = document.getElementById('plainTextButton');
  button.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      console.log('readyState: ' + request.readyState);
      if (request.readyState == 4 && request.status == 200) {
        var div = document.getElementById('plainTextDiv');
        div.innerHTML = request.responseText;
      }
    };
    request.open('GET', 'test_data.txt', true);
    request.send();
  };

  var button = document.getElementById('csvButton');
  button.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var rows = request.responseText.split('\n');
        var firstRow = rows[0].split(',');
        var firstName = document.getElementById('csvFirstName');
        var lastName = document.getElementById('csvLastName');
        firstName.setAttribute('value', firstRow[0]);
        lastName.setAttribute('value', firstRow[1]);
      }
    };
    request.open('GET', 'test_data.csv', true);
    request.send();
  };

  var button = document.getElementById('jsonButton');
  button.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText);
        var firstName = document.getElementById('jsonFirstName');
        var lastName = document.getElementById('jsonLastName');
        firstName.setAttribute('value', data.firstName);
        lastName.setAttribute('value', data.lastName);
      }
    };
    request.open('GET', 'test_data.json', true);
    request.send();
  };

  var button = document.getElementById('xmlButton');
  button.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var person = request.responseXML.getElementsByTagName('person')[0];
        var firstNameVal = person.getAttribute('firstName');
        var lastNameVal = person.getAttribute('lastName');

        var firstName = document.getElementById('xmlFirstName');
        var lastName = document.getElementById('xmlLastName');
        firstName.setAttribute('value', firstNameVal);
        lastName.setAttribute('value', lastNameVal);
      }
    };
    request.open('GET', 'test_data.xml', true);
    request.send();
  };
};
