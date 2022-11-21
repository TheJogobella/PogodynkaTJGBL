var activeTool = null;
const board = document.getElementById('canvas');
const ctx = board.getContext('2d');
var cordsx
var cordsy
var cords1x
var cords1y
var cords2x
var cords2y
var lineW = 1
var rbgcolor = document.getElementById("rgbcol").value
var alfa = 255
function changeAlfa1(){
  alfa = document.getElementById("alfa1").value
  document.getElementById("alfa2").value = alfa
}
function changeAlfa2(){
  alfa = document.getElementById("alfa2").value
  document.getElementById("alfa1").value = alfa
}
function changeColor(){
  rbgcolor = document.getElementById("rgbcol").value
}
function changeWidth(){
  lineW = document.getElementById("width").value
}
function updateDisplay(event) {
  if(board.width>window.innerWidth){
  cordsx = event.pageX*(board.width/window.innerWidth);
  cordsy = (event.pageY)*(board.width/window.innerWidth);
  }else{
    cordsx = event.pageX
    cordsy = event.pageY
  }
}
function lineDown(){
  ctx.beginPath();
  ctx.lineWidth = lineW
  ctx.strokeStyle = rbgcolor
  ctx.globalAlpha = alfa
  cords1x =  cordsx
  cords1y =  cordsy
  ctx.moveTo(cords1x, cords1y);
}
function lineUp(){
  cords2x =  cordsx
  cords2y =  cordsy
  ctx.lineTo(cords2x, cords2y);
  ctx.stroke();
}
function activeLine(){
  activeTool = "line"
  board.setAttribute("onmousedown", "lineDown()")
  board.setAttribute("onmouseup", "lineUp()")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "")
}
function squareDown(){
  ctx.beginPath();
  ctx.fillStyle = rbgcolor
  ctx.globalAlpha = alfa
  cords1x =  cordsx
  cords1y =  cordsy
}
function squareUp(){
  cords2x =  cordsx
  cords2y =  cordsy
  ctx.fillRect(cords1x, cords1y, cords2x-cords1x, cords2y-cords1y);
}
function activeSquare(){
  activeTool = "square"
  board.setAttribute("onmousedown", "squareDown()")
  board.setAttribute("onmouseup", "squareUp()")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "")
}
document.getElementById('inp').onchange = function(e) {
  var img = new Image();
  img.onload = drawImage;
  img.onerror = failedImage;
  img.src = URL.createObjectURL(this.files[0]);
};
function drawImage() {
  board.width = this.width;
  board.height = this.height;
  ctx.drawImage(this, 0,0);
}
function failedImage() {
  console.error("The provided file couldn't be loaded as an Image media");
}
board.addEventListener("mousemove", updateDisplay, false);
board.addEventListener("mouseenter", updateDisplay, false);
board.addEventListener("mouseleave", updateDisplay, false);