var p1 =prompt("Player One: Enter your name, you will be blue");
var p1color = 'rgb(86, 151, 255)';

var p2=prompt("Player Two : Enter your name, you will be red");
var p2color = 'rgb(237, 45, 73)';

var game_on=true;
table =$('table tr')

function changeColor(rowIndex,colIndex,color){
  table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color)
}

function returnColor(rowIndex,colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')
}

function checkBottom(colIndex){
    var colorReport= returnColor(5,colIndex);
    for (var row= 5; row >-1;row--) {
      colorReport=returnColor(row,colIndex);
      if (colorReport ==='rgb(128, 128, 128)'){
        return row
      }
    }
}

function colorMatchCheck(one,two,three,four){
  return(one !== "rgb(128, 128, 128)" && one === two && one === three && one === four && one !== undefined)
}

function horizontalWinCheck(){
  for (var row = 0; row < 6 ; row++) {
    for (var col = 0; col < 4 ; col++) {
      if (colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
        console.log('horizontal win');
        return true;
    }
    else{
      continue;
    }
    }
  }
}

function diagWinCheck(){
  for (var col = 0 ; col < 5 ; col++) {
    for (var row = 0 ; row < 7 ; row++) {
      if (colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
      console.log('Diagonal win');
      return true;
    }
    else if (colorMatchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))) {
      console.log('Diag');
      return true;
    }
    else{
      continue;
    }
    }
  }
}

function verticalWinCheck(){
  for (var col= 0 ; col < 7 ; col++) {
    for (var row = 0 ; row < 3 ; row++) {
      if (colorMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
      console.log('vertical win');
      return true;
    }
    else{
      continue;
    }
    }
  }
}

var currentPlayer = 1;
var currentName = p1;
var currentColor = p1color;

$('p').text(p1+": it is your turn, pick a column to drop the chip");
$('.board button').on("click",function (){
  var col = $(this).closest('td').index();
  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail,col,currentColor);

  if(horizontalWinCheck() || verticalWinCheck() || diagWinCheck() )
  {
    $('h1').text(currentName+" has won the game !");
    $('p').fadeOut('fast');
    $('h2').fadeOut('fast');
    game_on=false;
  }
  currentPlayer= currentPlayer* -1;
  if(currentPlayer === 1){
    currentName=p1;
    $('p').text(currentName+": Its your turn")
    currentColor=p1color;
  }
  else {
    currentName=p2;
    $('p').text(currentName+": Its your turn")
    currentColor=p2color;
  }
})
