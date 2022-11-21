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
var rbgcolor = "#000000"
var rbgcolorbg = "#000000"
var alfa = 1
var alfabg = 1
var fsize = 12
var fontfam = "Helveltica"
var texttowrite
function changeFsize(){
  fsize = document.getElementById("fsize").value
}
function changeFontFam(){
  fontfam = document.getElementById("fontfam").value
}
function changeTextToWrite(){
  texttowrite = document.getElementById("texttowrite").value
}
function changeAlfa1(){
  alfa = document.getElementById("alfa1").value
  document.getElementById("alfa2").value = alfa
}
function changeAlfa2(){
  alfa = document.getElementById("alfa2").value
  document.getElementById("alfa1").value = alfa
}
function changeAlfa1bg(){
  alfabg = document.getElementById("alfa1bg").value
  document.getElementById("alfa2bg").value = alfabg
}
function changeAlfa2bg(){
  alfabg = document.getElementById("alfa2bg").value
  document.getElementById("alfa1bg").value = alfa
}
function changeColor(){
  rbgcolor = document.getElementById("rgbcol").value
}
function changeColorBg(){
  rbgcolorbg = document.getElementById("rgbcolbg").value
}
function changeWidth(){
  lineW = document.getElementById("width").value
}
function updateDisplay(event) {
  if(board.width>window.innerWidth){
  cordsx = event.pageX*(board.width/(window.innerWidth*0.99));
  cordsy = (event.pageY)*(board.width/(window.innerWidth*0.99));
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
  ctx.strokeStyle = rbgcolor
  ctx.fillStyle = rbgcolorbg
  ctx.globalAlpha = alfabg
  ctx.lineWidth = lineW
  cords1x =  cordsx
  cords1y =  cordsy
}
function squareUp(){
  cords2x =  cordsx
  cords2y =  cordsy
  ctx.fillRect(cords1x, cords1y, cords2x-cords1x, cords2y-cords1y);
  ctx.globalAlpha = alfa
  ctx.rect(cords1x, cords1y, cords2x-cords1x, cords2y-cords1y)
  ctx.stroke()
}
function activeSquare(){
  activeTool = "square"
  board.setAttribute("onmousedown", "squareDown()")
  board.setAttribute("onmouseup", "squareUp()")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "")
}
function circleDown(){
  ctx.beginPath();
  ctx.strokeStyle = rbgcolor
  ctx.fillStyle = rbgcolorbg
  ctx.globalAlpha = alfabg
  ctx.lineWidth = lineW
  cords1x =  cordsx
  cords1y =  cordsy
}
function circleUp(){
  cords2x =  cordsx
  cords2y =  cordsy
  ctx.arc(cords1x, cords1y,  Math.sqrt(Math.pow((cords2x-cords1x), 2)+Math.pow((cords2y-cords1y), 2)), 0, 2 * Math.PI);
  ctx.fill()
  ctx.globalAlpha = alfa
  ctx.stroke();
}
function activeCircle(){
  activeTool = "circle"
  board.setAttribute("onmousedown", "circleDown()")
  board.setAttribute("onmouseup", "circleUp()")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "")
}
function pencilDown(){
  ctx.beginPath();
  ctx.fillStyle = rbgcolorbg
  ctx.globalAlpha = alfabg
  cords1x =  cordsx
  cords1y =  cordsy
  ctx.fillRect(cords1x-(lineW/2), cords1y-(lineW/2), lineW, lineW);
  board.setAttribute("onmousemove", "pencilMove()")
}
function pencilMove(){
  cords1x =  cordsx
  cords1y =  cordsy
  ctx.fillRect(cords1x-(lineW/2), cords1y-(lineW/2), lineW, lineW);
}
function pencilUp(){
  board.setAttribute("onmousemove", "")
}
function activePencil(){
  activeTool = "pencil"
  board.setAttribute("onmousedown", "pencilDown()")
  board.setAttribute("onmouseup", "pencilUp()")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "")
}
function brushDown(){
  ctx.beginPath();
  ctx.fillStyle = rbgcolorbg
  ctx.globalAlpha = alfabg
  cords1x =  cordsx
  cords1y =  cordsy
  ctx.arc(cords1x, cords1y, lineW/2, 0, 2*Math.PI);
  ctx.fill()
  board.setAttribute("onmousemove", "brushMove()")
}
function brushMove(){
  ctx.beginPath();
  cords1x =  cordsx
  cords1y =  cordsy
  ctx.arc(cords1x, cords1y, lineW/2, 0, 2*Math.PI);
  ctx.fill()
}
function brushUp(){
  board.setAttribute("onmousemove", "")
}
function activeBrush(){
  activeTool = "brush"
  board.setAttribute("onmousedown", "brushDown()")
  board.setAttribute("onmouseup", "brushUp()")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "")
}
function textClick(){
  ctx.beginPath();
  cords1x =  cordsx
  cords1y =  cordsy
  ctx.lineWidth = lineW
  ctx.strokeStyle = rbgcolor
  ctx.fillStyle = rbgcolorbg
  ctx.globalAlpha = alfabg
  ctx.font = fsize+"px "+fontfam;
  ctx.fillText(texttowrite, cords1x, cords1y+(fsize/2));
  ctx.globalAlpha = alfa
  ctx.strokeText(texttowrite, cords1x, cords1y+(fsize/2));
}
function activeText(){
  activeTool = "brush"
  board.setAttribute("onmousedown", "")
  board.setAttribute("onmouseup", "")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "textClick()")
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