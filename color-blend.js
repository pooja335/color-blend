$(function () {
    
  var num_squares = 6;
  var variant_color = createBoard(num_squares);
  $('#main').sortable({
    items: '> .board-squares'
  });

});

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
  $("#main").empty();
  var base_colors = generateColors();
  colors = [];
  colors.push("rgb(" + base_colors.red + "," + base_colors.green + "," + base_colors.blue + ")");
  for (var ii = 1; ii < num_squares; ii++) {
    base_colors[base_colors.which] += 20;
    colors.push("rgb(" + base_colors.red + "," + base_colors.green + "," + base_colors.blue + ")");
  }
  colors = _.shuffle(colors);
  for (var ii = 0; ii < num_squares; ii++) {
    $("#main").append("<div style=background-color:" + colors[ii] + " class='board-squares'></div>");
  }
  return base_colors.which;
};