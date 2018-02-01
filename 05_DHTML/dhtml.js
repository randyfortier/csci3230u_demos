window.onload = function() {
  setCurrentNode(document.getElementsByTagName('p')[0]);

  var parentButton = document.getElementById('parentButton');
  parentButton.onclick = parent;

  var nextButton = document.getElementById('nextButton');
  nextButton.onclick = nextSibling;

  var previousButton = document.getElementById('previousButton');
  previousButton.onclick = previousSibling;

  var firstButton = document.getElementById('firstButton');
  firstButton.onclick = firstChild;

  var lastButton = document.getElementById('lastButton');
  lastButton.onclick = lastChild;

  var addButton = document.getElementById('addButton');
  addButton.onclick = addPlace;

  var visibilityList = document.getElementById('visibilityList');
  visibilityList.onchange = changeVisibility;
};

var currentNode;
function setCurrentNode(node) {
  if (currentNode) {
    currentNode.className = '';
  }

  node.className = 'selected';
  currentNode = node;
}

function parent() {
  if (currentNode.parentElement) {
    setCurrentNode(currentNode.parentElement);
  }
}

function nextSibling() {
  if (currentNode.nextElementSibling) {
    setCurrentNode(currentNode.nextElementSibling);
  }
}

function previousSibling() {
  if (currentNode.previousElementSibling) {
    setCurrentNode(currentNode.previousElementSibling);
  }
}

function firstChild() {
  if (currentNode.firstChild) {
    setCurrentNode(currentNode.firstElementChild);
  }
}

function lastChild() {
  if (currentNode.lastChild) {
    setCurrentNode(currentNode.lastElementChild);
  }
}

function addPlace() {
  var newPlaceField = document.getElementById('newPlaceField');
  var newPlace = newPlaceField.value;

  var coolPlacesList = document.getElementById('coolPlaces');

  // create a new DOM tree
  var content = document.createTextNode(newPlace);
  var newListItem = document.createElement('li');
  newListItem.appendChild(content);
  coolPlacesList.appendChild(newListItem);
}

function changeVisibility() {
  var visibilityList = document.getElementById('visibilityList');
  var selectedIndex = visibilityList.selectedIndex;
  var visibility = visibilityList.options[selectedIndex].text;

  currentNode.style.display = visibility;
}
