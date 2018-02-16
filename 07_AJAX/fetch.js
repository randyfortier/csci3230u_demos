window.onload = function() {
  var button = document.getElementById('plainTextButton');
  button.onclick = function() {
    fetch('test_data.txt')
      .then((resp) => resp.text())
      .then(function(data) {
        var div = document.getElementById('plainTextDiv');
        div.innerHTML = data;
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  var button = document.getElementById('csvButton');
  button.onclick = function() {
    fetch('test_data.csv')
      .then((resp) => resp.text())
      .then(function(data) {
        var rows = data.split('\n');
        var firstRow = rows[0].split(',');

        var firstName = document.getElementById('csvFirstName');
        var lastName = document.getElementById('csvLastName');

        firstName.setAttribute('value', firstRow[0]);
        lastName.setAttribute('value', firstRow[1]);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  var button = document.getElementById('jsonButton');
  button.onclick = function() {
    fetch('test_data.json')
      .then((resp) => resp.json())
      .then(function(data) {
        var firstName = document.getElementById('jsonFirstName');
        var lastName = document.getElementById('jsonLastName');

        firstName.setAttribute('value', data.firstName);
        lastName.setAttribute('value', data.lastName);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  var button = document.getElementById('xmlButton');
  button.onclick = function() {
    fetch('test_data.xml')
      .then((resp) => resp.text())
      .then(function(data) {
        var xmlData = parseXML(data);

        var person = xmlData.getElementsByTagName('person')[0];
        var firstNameVal = person.getAttribute('firstName');
        var lastNameVal = person.getAttribute('lastName');

        var firstName = document.getElementById('xmlFirstName');
        var lastName = document.getElementById('xmlLastName');

        firstName.setAttribute('value', firstNameVal);
        lastName.setAttribute('value', lastNameVal);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

function parseXML(xmlText) {
  var parser = new window.DOMParser();
  return parser.parseFromString(xmlText, "text/xml");
}
