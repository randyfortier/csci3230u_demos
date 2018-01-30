function Dog(name) {
  this.name = name;

  this.bark = function() {
    console.log('Woof!');
  };
}

function Cat(name) {
  this.name = name;
}

Cat.prototype.meow = function() {
  console.log('Meow!');
};

window.onload = function() {
  var dog = new Dog('Spot');
  var cat = new Cat('Boots');

  var sphynx = cat;
  sphynx.name = 'UglyCat';
  sphynx.numOfHairs = 0;
  sphynx.freakPeopleOut = function() {
    console.log('Do nothing, they do this just by existing.');
  };
  sphynx.meow = function() {
    console.log('Hairless meow!');
  };

  console.log("The dog's name is " + dog.name);
  cat.name = 'MrFluffington';
  console.log("The cat's name is " + cat.name);

  dog.bark();
  cat.meow();
  sphynx.freakPeopleOut();
  sphynx.meow();
};

function log(message) {
  var output = document.getElementById('output');
  output.innerHTML += '<div>' + message + '</div>';
}
