window.onload = function() {
  var message = '<p>Hello from JS!</p>';
  log(message);

  // to read values with popup (please, no)
  //var input = window.prompt('Enter your name:');
  var age = 25;

  if (age < 18) {
    log('You can not vote, child!');
  } else {
    log('With great power...');
  }

  for (var i = 0; i < 4; i++) {
    log('Something 10 times');
  }

  var howMany = 0;
  var n = 1;
  while (howMany < 5) {
    if ((n % 9) == 0) {
      howMany++;
      log('' + n + ' is divisible by 9.');
    }
    n++;
  }

  var sentence = 'the quick brown fox jumped over';
  var words = sentence.split(' ');
  for (var i = 0; i < words.length; i++) {
    log('word: ' + words[i]);
  }

  var grades = [49.5, 55.0, 74.25, 63, 90];
  var sortedGrades = grades.sort(ascending);
  console.log(sortedGrades);
  log('Worst grade: ' + Math.floor(sortedGrades[0]));

  var student = {sid: '100200300',
                 firstName: 'Roberta',
                 lastName: 'Jones',
                 gpa: 3.75,
                 grades: ['A+', 'B-', 'A-', 'B+']};
 console.log('Roberta has a GPA of ' + student.gpa);
 console.log('Roberta has a last name of ' + student['lastName']);

  var sayHiButton = document.getElementById('sayHi');
  sayHiButton.onclick = sayHi;
};

function ascending(val1, val2) {
  return val1 - val2;
}

function sayHi() {
  var nameField = document.getElementById('name');
  var name = nameField.value;

  var ageField = document.getElementById('age');
  var age = parseInt(ageField.value);

  if (age < 18) {
    log('Hello, ' + name + '!');
  } else {
    log('Hello adult, ' + name + '!');
  }
}

function isPrime(number) {
  for (var div = 2; div < number/2; div++) {
    if ((number % div) == 0) {
      return false;
    }
    return true;
  }
}

function fibonacci(n) {
  if (n == 0 || n == 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

function log(message) {
  // sloppy, where does it insert?
  //document.writeln(message);

  var div = document.getElementById('output');
  console.log(div);
  div.innerHTML += '<div>' + message + '</div>';
}
