// global variables declaration here
var tile_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ' '];
var random_tile_list = [];

var num_tiles = 0;
var index_of_empty_tile = 0;
var index_of_exchange_tile = 0;

var moves = -1;
var tile = 0;

var x = 0, y = 0;
var flag = 0;
var ol = document.getElementById("list");


// initializing the playArea
function init() {
  do {
    random_integer = Math.floor(Math.random() * tile_list.length);
    rand = tile_list[random_integer];

    if (rand != -1) {
      random_tile_list.push(rand);
      tile_list[random_integer] = -1;
      num_tiles += 1;
    }
  } while (num_tiles < 16);
}

// updating each state of playArea
function updatePlayArea() {

  moves++;

  //calculating coordinates of the new tiles position
  switch (index_of_empty_tile) {
    case 0: x = 1;
      y = 1;
      break;
    case 1: x = 1;
      y = 2;
      break;
    case 2: x = 1;
      y = 3;
      break;
    case 3: x = 1;
      y = 4;
      break;
    case 4: x = 2;
      y = 1;
      break;
    case 5: x = 2;
      y = 2;
      break;
    case 6: x = 2;
      y = 3;
      break;
    case 7: x = 2;
      y = 4;
      break;
    case 8: x = 3;
      y = 1;
      break;
    case 9: x = 3;
      y = 2;
      break;
    case 10: x = 3;
      y = 3;
      break;
    case 11: x = 3;
      y = 4;
      break;
    case 12: x = 4;
      y = 1;
      break;
    case 13: x = 4;
      y = 2;
      break;
    case 14: x = 4;
      y = 3;
      break;
    case 15: x = 4;
      y = 4;
      break;
  }

  // creating moves list
  var li = document.createElement("li");
  if (random_tile_list[index_of_empty_tile] != ' ') {
    li.appendChild(document.createTextNode("Tile " + random_tile_list[index_of_empty_tile] + ' to ' + x + ',' + y));

    ol.appendChild(li);
  }


  document.getElementById('moves-count').innerHTML = moves;
  for (k = 0; k < 16; k++) {
    document.getElementsByClassName("box-cells")[k].innerHTML = random_tile_list[k];

    if (random_tile_list[k] == ' ') {
      document.getElementsByClassName("box-cells")[k].classList.add("empty-tile");
    }
    else {
      document.getElementsByClassName("box-cells")[k].classList.remove("empty-tile");
    }
  }



  if (moves < 1) {
    ol.innerHTML = '';
  }

  // scroll to bottom of div
  var objDiv = document.getElementById("moves-list");
  objDiv.scrollTop = objDiv.scrollHeight;

  reviewWin();
}

function keyPressed(e) {
  k = e.keyCode;

  if (k == 38) {
    flag = 0;
    slideUp();
  }
  if (k == 40) {
    flag = 0;
    slideDown();
  }
  if (k == 37) {
    flag = 0;
    slideLeft();
  }
  if (k == 39) {
    flag = 0;
    slideRight();
  }
}

function slideDown() {
  if (random_tile_list.indexOf(' ') >= 4) {
    index_of_empty_tile = random_tile_list.indexOf(' ');

    index_of_exchange_tile = index_of_empty_tile - 4;

    temp = random_tile_list[index_of_empty_tile];

    random_tile_list[index_of_empty_tile] = random_tile_list[index_of_exchange_tile];

    random_tile_list[index_of_exchange_tile] = temp;

    //updating playarea
    updatePlayArea();
  }
}

function slideUp() {
  if (random_tile_list.indexOf(' ') < 12) {
    index_of_empty_tile = random_tile_list.indexOf(' ');

    index_of_exchange_tile = index_of_empty_tile + 4;

    temp = random_tile_list[index_of_empty_tile];

    random_tile_list[index_of_empty_tile] = random_tile_list[index_of_exchange_tile];

    random_tile_list[index_of_exchange_tile] = temp;

    updatePlayArea();
  }
}

function slideRight() {
  index_of_empty_tile = random_tile_list.indexOf(' ');

  if (!(index_of_empty_tile == 0 || index_of_empty_tile == 4 || index_of_empty_tile == 8 || index_of_empty_tile == 12)) {
    index_of_exchange_tile = index_of_empty_tile - 1;

    temp = random_tile_list[index_of_empty_tile];

    random_tile_list[index_of_empty_tile] = random_tile_list[index_of_exchange_tile];

    random_tile_list[index_of_exchange_tile] = temp;

    updatePlayArea();
  }
}

function slideLeft() {
  index_of_empty_tile = random_tile_list.indexOf(' ');

  if (!(index_of_empty_tile == 3 || index_of_empty_tile == 7 || index_of_empty_tile == 11 || index_of_empty_tile == 15)) {

    index_of_exchange_tile = index_of_empty_tile + 1;

    temp = random_tile_list[index_of_empty_tile];

    random_tile_list[index_of_empty_tile] = random_tile_list[index_of_exchange_tile];

    random_tile_list[index_of_exchange_tile] = temp;

    updatePlayArea();
  }
}

function undo() {
  if (!flag) {
    flag = 1;

    temp = random_tile_list[index_of_exchange_tile];
    random_tile_list[index_of_exchange_tile] = random_tile_list[index_of_empty_tile];
    random_tile_list[index_of_empty_tile] = temp;

    moves = moves - 2;

    if (moves < 0) {
      moves = -1;
    }

    var list = document.getElementById("list");
    var listItems = list.getElementsByTagName("li");

    var last = listItems[listItems.length - 1];
    list.removeChild(last);

    updatePlayArea();
  }
}

function reviewWin() {
  var a = 1;
  for (k = 0; k < 14; k++) {
    if (tile_list[k] != k + 1) {
      a = 0;
    }
  }
  if (a == 1) {
    alert("You Won!!! with " + moves + " moves and in " + timer.innerHTML + " sec.");
  }
}

init();
updatePlayArea();


//script for timer starts
//script for timer starts
var fired = false;
var timer = document.getElementById("timer");

var playerObj = {
  elapsedTime: -1,
  update: function () {
    playerObj.elapsedTime += 1;
    timer.innerHTML = playerObj.elapsedTime;
  },
  startTimer: function () {
    playerObj.update();
    setInterval(playerObj.update, 1000);
  }
};

document.onkeydown = function (e) {
  var w = e.keyCode == '38',
    a = e.keyCode == '40',
    s = e.keyCode == '37',
    d = e.keyCode == '39';
  if (!fired) {
    fired = true;
    if (w || a || s || d) {
      playerObj.startTimer();
    }
  }
};
//script for timer ends
//script for timer ends

// script for selecting difficulty level starts
// script for selecting difficulty level starts

// script for selecting difficulty level ends
// script for selecting difficulty level ends
