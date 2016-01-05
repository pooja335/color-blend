$(function () {
    
  $('#startgame').click(function() {
    var num_squares = setUpGame();
    $('#main').on('sortupdate', function() {
      var win = detectWin(num_squares);
      if (win) {
        $('#main').prepend("<h1 id='wintext'>YOU WIN</h1>");
        $('#main').append("<button id='newgame'>Play Again</button>");
        $('#newgame').click(function() {
          num_squares = setUpGame();
        });
      }
    });
  });

});

// makes squares sortable
var setUpGame = function() {
  $('#startgame').hide();
  $('#main').empty();
  // generates random number between 6 and 9 inclusive
  var num_squares = Math.floor(Math.random() * 4 + 6);
  createBoard(num_squares);
  $('#main').sortable({
    items: '> .board-squares'
  });
  return num_squares;
};

// generate colors of squares
var generateColors = function() {
  var colors = { 
    red: 0, 
    green: 0, 
    blue: 0,
    which: ''
  };
  colors.red = Math.floor(Math.random() * 155);
  colors.green = Math.floor(Math.random() * 155);
  colors.blue = Math.floor(Math.random() * 155);
  var whichColor = Math.floor(Math.random() * 3);
  colors.which = _.keys(colors)[whichColor];
  return colors;
};

// creates board layout
var createBoard = function(num_squares) {
  $('#main').empty();
  var base_colors = generateColors();
  colors = [];
  colors.push({
    id: 0,
    rgb: 'rgb(' + base_colors.red + ',' + base_colors.green + ',' + base_colors.blue + ')'
  });
  for (var ii = 1; ii < num_squares; ii++) {
    base_colors[base_colors.which] += 20;
    colors.push({
      id: ii,
      rgb: 'rgb(' + base_colors.red + ',' + base_colors.green + ',' + base_colors.blue + ')'
    });
  }
  colors = _.shuffle(colors);
  for (ii = 0; ii < num_squares; ii++) {
    $('#main').append("<div style=background-color:" + colors[ii].rgb + 
      " class='board-squares' id=" + colors[ii].id + "></div>");
  }
};

// detects if order is winning order
var detectWin = function(num_squares) {
  var order = $('#main').sortable('toArray');
  _.each(order, function(num, index) {
    order[index] = parseInt(num);
  });
  var is_win = _.every(order, function(num, index) {
    // if sorted by reverse ids
    if (order[0]) {
      return order[index] == num_squares - index - 1;
    }
    // if sorted by ids
    else {
      return order[index] == index;
    }
  });
  return is_win;
};


