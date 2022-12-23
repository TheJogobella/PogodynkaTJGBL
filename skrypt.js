var activeTool = null;
const board = document.getElementById('canvas');
const ctx = board.getContext('2d');
var displaySquare
var cordsx
var cordsy
var cords1x
var cords1y
var cords2x
var cords2y
var truex
var truey
var true1x
var true1y
var true2x
var true2y
var lineW = 1
var rbgcolor = "#000000"
var rbgcolorbg = "#000000"
var alfa = 1
var alfabg = 1
var fsize = 12
var fontfam = "Helveltica"
var texttowrite
var imgload
var activeid = "hidden"
var dropDown = document.getElementsByClassName("weather-dropdown")[0]
var iconSize = 64
var temperatura = 0
var tempSize = 32
var miasto
var borderW
document.getElementById("proporcje").addEventListener("change", (event) => {
  document.getElementById("wektor1").disabled = !event.target.checked;
  document.getElementById("wektor2").disabled = !event.target.checked;
}, false);
document.getElementById("miasto-check").addEventListener("change", (event) => {
  document.getElementById("miasto").disabled = !event.target.checked;
}, false);
function changeToolName(){
  document.getElementById("tool-options-h1").innerHTML = "Opcje dla narzędzia: "+activeTool
}
function changeMiasto(){
  miasto = document.getElementById("miasto").value
}
function tempSizeChange(){
  tempSize = document.getElementById("temp-size").value
}
function tempChange(){
  temperatura = document.getElementById("temperatura").value
}
function changeIconSize(){
  iconSize = document.getElementById("icon-size").value
}
function dropdownLeave(){
  dropDown.style.display = "none"
}
function dropDownShow(){
  if(dropDown.style.display == "none"){
    dropDown.style.display = "flex"
  }else{
    dropDown.style.display = "none"
  }
}
function changeIcon(icon){
  document.getElementById('weather-value').setAttribute("value", icon.id)
  document.getElementById('weather-icon').src = icon.src
}
function hideToolBar(){
  document.getElementsByClassName("toolbar")[0].setAttribute("class", "toolbar animate__animated animate__fadeOutDownBig")
  document.getElementsByClassName("baropen")[0].setAttribute("class", "baropen animate__animated animate__fadeInUp")
}
function showToolBar(){
  document.getElementsByClassName("toolbar")[0].setAttribute("class", "toolbar animate__animated animate__fadeInUpBig")
  document.getElementsByClassName("baropen")[0].setAttribute("class", "baropen animate__animated animate__fadeOutDown")
}
function changeActiveColor(){
  document.getElementById(activeid).style.color = "white"
  activeid = document.getElementById(activeTool+"svg").id
  document.getElementById(activeid).style.color = "darkslategray"
}
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
function updateCords(event){
  truex = event.pageX
  truey = event.pageY
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
  changeActiveColor()
  board.setAttribute("onmousedown", "lineDown()")
  board.setAttribute("onmouseup", "lineUp()")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "")
  changeToolName()
  document.getElementById("color-div").style.display="block"
  document.getElementById("bg-div").style.display="none"
  document.getElementById("width-div").style.display="block"
  document.getElementById("form-div").style.display="none"
  document.getElementById("text-div").style.display="none"
  document.getElementById("image-div").style.display="none"
  document.getElementById("imgsize-div").style.display="none"
  document.getElementById("icon-div").style.display="none"
  document.getElementById("temper-div").style.display="none"
  document.getElementById("miasto-div").style.display="none"
  document.getElementById("endShape").style.display="none"
}
function squareDown(){
  board.setAttribute("onmousemove", "squareMove()")
  board.setAttribute("onmouseleave", "squareLeave()")
  displaySquare= document.createElement("div")
  true1x = truex
  true1y = truey
  if(board.width>window.innerWidth){
    borderW = lineW*((window.innerWidth*0.99)/board.width)
  } else{
    borderW = lineW
  }
  displaySquare.style = "position: absolute; border: "+borderW+"px solid "+rbgcolor+"; background-color: "+rbgcolorbg+";"
  document.body.appendChild(displaySquare)
  ctx.beginPath();
  ctx.strokeStyle = rbgcolor
  ctx.fillStyle = rbgcolorbg
  ctx.globalAlpha = alfabg
  ctx.lineWidth = lineW
  cords1x =  cordsx
  cords1y =  cordsy
}
function squareMove(){
  true2x = truex
  true2y = truey
  if(true2y-true1y>0){
    displaySquare.style.height = true2y-true1y+"px"
    displaySquare.style.top = true1y+"px"
  } else {
    displaySquare.style.top = true2y+"px"
    displaySquare.style.height = true1y-true2y+"px"
  }
  if(true2x-true1x>0){
    displaySquare.style.width = true2x-true1x+"px"
    displaySquare.style.left = true1x+"px"
  }else{
    displaySquare.style.width = true1x-true2x+"px"
    displaySquare.style.left = true2x+"px"
  }
}
function squareLeave(){
  if(board.width>window.innerWidth){
    if(truex>=window.innerWidth*0.99-5){
      board.setAttribute("onmousemove", "")
      displaySquare.remove()
    }else if(truey>=board.height*((window.innerWidth*0.99)/board.width)-5){
      board.setAttribute("onmousemove", "")
      displaySquare.remove()
    }
  }else if(truex>=board.width-5){
    board.setAttribute("onmousemove", "")
    displaySquare.remove()
  }else if(truey>=board.height-5){
    board.setAttribute("onmousemove", "")
    displaySquare.remove()
  }else if(truey<=15){
    board.setAttribute("onmousemove", "")
    displaySquare.remove()
  }else if(truex<=15){
    board.setAttribute("onmousemove", "")
    displaySquare.remove()
  }
}
function squareUp(){
  board.setAttribute("onmousemove", "")
  cords2x =  cordsx
  cords2y =  cordsy
  ctx.fillRect(cords1x, cords1y, cords2x-cords1x, cords2y-cords1y);
  ctx.globalAlpha = alfa
  ctx.rect(cords1x, cords1y, cords2x-cords1x, cords2y-cords1y)
  ctx.stroke()
  displaySquare.remove()
}
function activeSquare(){
  activeTool = "square"
  changeActiveColor()
  board.setAttribute("onmousedown", "squareDown()")
  board.setAttribute("onmouseup", "squareUp()")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "")
  changeToolName()
  document.getElementById("color-div").style.display="block"
  document.getElementById("bg-div").style.display="block"
  document.getElementById("width-div").style.display="block"
  document.getElementById("form-div").style.display="none"
  document.getElementById("text-div").style.display="none"
  document.getElementById("image-div").style.display="none"
  document.getElementById("imgsize-div").style.display="none"
  document.getElementById("icon-div").style.display="none"
  document.getElementById("temper-div").style.display="none"
  document.getElementById("miasto-div").style.display="none"
  document.getElementById("endShape").style.display="none"
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
  ctx.arc(cords1x, cords1y, Math.sqrt(Math.pow((cords2x-cords1x), 2)+Math.pow((cords2y-cords1y), 2)), 0, 2 * Math.PI);
  ctx.fill()
  ctx.globalAlpha = alfa
  ctx.stroke();
}
function activeCircle(){
  activeTool = "circle"
  changeActiveColor()
  board.setAttribute("onmousedown", "circleDown()")
  board.setAttribute("onmouseup", "circleUp()")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "")
  changeToolName()
  document.getElementById("color-div").style.display="block"
  document.getElementById("bg-div").style.display="block"
  document.getElementById("width-div").style.display="block"
  document.getElementById("form-div").style.display="none"
  document.getElementById("text-div").style.display="none"
  document.getElementById("image-div").style.display="none"
  document.getElementById("imgsize-div").style.display="none"
  document.getElementById("icon-div").style.display="none"
  document.getElementById("temper-div").style.display="none"
  document.getElementById("miasto-div").style.display="none"
  document.getElementById("endShape").style.display="none"
}
function pencilDown(){
  ctx.beginPath();
  ctx.fillStyle = rbgcolor
  ctx.globalAlpha = alfa
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
  changeActiveColor()
  board.setAttribute("onmousedown", "pencilDown()")
  board.setAttribute("onmouseup", "pencilUp()")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "")
  changeToolName()
  document.getElementById("color-div").style.display="block"
  document.getElementById("bg-div").style.display="none"
  document.getElementById("width-div").style.display="block"
  document.getElementById("form-div").style.display="none"
  document.getElementById("text-div").style.display="none"
  document.getElementById("image-div").style.display="none"
  document.getElementById("imgsize-div").style.display="none"
  document.getElementById("icon-div").style.display="none"
  document.getElementById("temper-div").style.display="none"
  document.getElementById("miasto-div").style.display="none"
  document.getElementById("endShape").style.display="none"
}
function brushDown(){
  ctx.beginPath();
  ctx.fillStyle = rbgcolor
  ctx.globalAlpha = alfa
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
  changeActiveColor()
  board.setAttribute("onmousedown", "brushDown()")
  board.setAttribute("onmouseup", "brushUp()")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "")
  changeToolName()
  document.getElementById("color-div").style.display="block"
  document.getElementById("bg-div").style.display="none"
  document.getElementById("width-div").style.display="block"
  document.getElementById("form-div").style.display="none"
  document.getElementById("text-div").style.display="none"
  document.getElementById("image-div").style.display="none"
  document.getElementById("imgsize-div").style.display="none"
  document.getElementById("icon-div").style.display="none"
  document.getElementById("temper-div").style.display="none"
  document.getElementById("miasto-div").style.display="none"
  document.getElementById("endShape").style.display="none"
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
  activeTool = "font"
  changeActiveColor()
  board.setAttribute("onmousedown", "")
  board.setAttribute("onmouseup", "")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "textClick()")
  changeToolName()
  document.getElementById("color-div").style.display="block"
  document.getElementById("bg-div").style.display="block"
  document.getElementById("width-div").style.display="block"
  document.getElementById("form-div").style.display="block"
  document.getElementById("text-div").style.display="block"
  document.getElementById("image-div").style.display="none"
  document.getElementById("imgsize-div").style.display="none"
  document.getElementById("icon-div").style.display="none"
  document.getElementById("temper-div").style.display="none"
  document.getElementById("miasto-div").style.display="none"
  document.getElementById("endShape").style.display="none"
}
function imageDown(){
  imgload= new Image()
  imgload.src = URL.createObjectURL(document.getElementById('imagesend').files[0]);
  cords1x =  cordsx
  cords1y =  cordsy
}
function imageUp(){
  cords2x =  cordsx
  cords2y =  cordsy
  if(!document.getElementById('proporcje').checked == true){
    ctx.drawImage(imgload, 0,0, imgload.width, imgload.height, cords1x, cords1y, cords2x-cords1x, cords2y-cords1y)
  }else if(document.getElementById('proporcje').checked==true && document.getElementById('wektor1').checked==true){
    ctx.drawImage(imgload, 0,0, imgload.width, imgload.height, cords1x, cords1y, imgload.width*((cords2y-cords1y)/imgload.height), cords2y-cords1y)
  }else if(document.getElementById('proporcje').checked==true && document.getElementById('wektor2').checked==true){
    ctx.drawImage(imgload, 0,0, imgload.width, imgload.height, cords1x, cords1y, cords2x-cords1x, imgload.height*((cords2x-cords1x)/imgload.width))
  }
}
function activeImage(){
  activeTool = "image"
  changeActiveColor()
  board.setAttribute("onmousedown", "imageDown()")
  board.setAttribute("onmouseup", "imageUp()")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "")
  changeToolName()
  document.getElementById("color-div").style.display="none"
  document.getElementById("bg-div").style.display="none"
  document.getElementById("width-div").style.display="none"
  document.getElementById("form-div").style.display="none"
  document.getElementById("text-div").style.display="none"
  document.getElementById("image-div").style.display="block"
  document.getElementById("imgsize-div").style.display="block"
  document.getElementById("icon-div").style.display="none"
  document.getElementById("temper-div").style.display="none"
  document.getElementById("miasto-div").style.display="none"
  document.getElementById("endShape").style.display="none"
}
function weatherClick(){
  var myIcon = new Image()
  myIcon.src = document.getElementById("weather-icon").src
  cords1x = cordsx
  cords1y = cordsy
  ctx.font = tempSize+"px Arial";
  ctx.fillStyle = rbgcolorbg
  ctx.globalAlpha = alfabg
  myIcon.width = iconSize
  myIcon.height = iconSize
  if(document.getElementById("miasto-check").checked){
    ctx.fillRect(cords1x+ctx.measureText(miasto+" ").width-5, cords1y+parseInt(iconSize)*1.25+10, ctx.measureText(temperatura+"°C").width+10, parseInt(tempSize)+10)
  }else{
    ctx.fillRect(cords1x-5, cords1y+parseInt(iconSize)*1.25+10, ctx.measureText(temperatura+"°C").width+10, parseInt(tempSize)+10)
  }
  console.log(myIcon)
  ctx.globalAlpha = 1
ctx.drawImage(myIcon, 0, 0, board.width, board.width, cords1x, cords1y, iconSize*2, iconSize*2)
  ctx.lineWidth = 1
  ctx.strokeStyle = "#000000"
  if(temperatura == 0){
    ctx.fillStyle = "#ffffff"
  } else if(temperatura>0 && temperatura <=10){
    ctx.fillStyle = "rgb(255, "+(255-(temperatura*0.1*(255-125)))+", "+(255-(temperatura*0.1*255))+")"
  } else if(temperatura>10 && temperatura <=20){
    ctx.fillStyle = "rgb(255, "+(125-(temperatura-10)*0.1*125)+", 0)"
  } else if(temperatura>20){
    ctx.fillStyle = "#ff0000"
  } else if(temperatura<0 && temperatura>=(-10)){
    ctx.fillStyle = "rgb("+(255-(0-(temperatura))*0.1*255)+", "+(255-(0-(temperatura))*0.1*255)+", 255)"
  } else if(temperatura<(-10)){
    ctx.fillStyle= "#0000ff"
  }  
  ctx.globalAlpha = 1
  
  
  if(document.getElementById("miasto-check").checked){
    ctx.fillText(miasto+' '+temperatura+"°C", cords1x, cords1y+parseInt(iconSize)*1.25+parseInt(tempSize)+5);
    ctx.strokeText(miasto+' '+temperatura+"°C", cords1x, cords1y+parseInt(iconSize)*1.25+parseInt(tempSize)+5);
  }else{
    ctx.fillText(temperatura+"°C", cords1x, cords1y+parseInt(iconSize)*1.25+parseInt(tempSize)+5);
    ctx.strokeText(temperatura+"°C", cords1x, cords1y+parseInt(iconSize)*1.25+parseInt(tempSize)+5);
  }
  
}
function activeWeather(){
  activeTool = "weather"
  changeActiveColor()
  board.setAttribute("onmousedown", "")
  board.setAttribute("onmouseup", "")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "weatherClick()")
  changeToolName()
  document.getElementById("color-div").style.display="none"
  document.getElementById("bg-div").style.display="block"
  document.getElementById("width-div").style.display="none"
  document.getElementById("form-div").style.display="none"
  document.getElementById("text-div").style.display="none"
  document.getElementById("image-div").style.display="none"
  document.getElementById("imgsize-div").style.display="none"
  document.getElementById("icon-div").style.display="block"
  document.getElementById("temper-div").style.display="block"
  document.getElementById("miasto-div").style.display="block"
  document.getElementById("endShape").style.display="none"
}
function shapeClick(){
  ctx.beginPath();
  cords1x =  cordsx
  cords1y =  cordsy
  ctx.strokeStyle = rbgcolor
  ctx.globalAlpha = alfa
  ctx.fillRect (cords1x, cords1y, 1, 1)
  ctx.moveTo(cords1x, cords1y);
  board.setAttribute("onclick", "continueClick()")
}
function continueClick(){
  cords2x = cordsx
  cords2y = cordsy
  ctx.strokeStyle = rbgcolor
  ctx.globalAlpha = alfa
  ctx.fillRect (cords2x, cords2y, 1, 1)
  ctx.lineTo(cords2x, cords2y)
}
function endShape(){
  ctx.lineTo(cords1x, cords1y)
  ctx.fillStyle = rbgcolorbg
  ctx.globalAlpha = alfabg
  ctx.fill()
  ctx.lineWidth = lineW
  ctx.strokeStyle = rbgcolor
  ctx.globalAlpha = alfa
  ctx.stroke()
  board.setAttribute("onclick", "shapeClick()")
}
function activeShape(){
  activeTool = "shape"
  changeActiveColor()
  board.setAttribute("onmousedown", "")
  board.setAttribute("onmouseup", "")
  board.setAttribute("onmousemove", "")
  board.setAttribute("onclick", "shapeClick()")
  changeToolName()
  document.getElementById("color-div").style.display="block"
  document.getElementById("bg-div").style.display="block"
  document.getElementById("width-div").style.display="block"
  document.getElementById("form-div").style.display="none"
  document.getElementById("text-div").style.display="none"
  document.getElementById("image-div").style.display="none"
  document.getElementById("imgsize-div").style.display="none"
  document.getElementById("icon-div").style.display="none"
  document.getElementById("temper-div").style.display="none"
  document.getElementById("miasto-div").style.display="none"
  document.getElementById("endShape").style.display="block"
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
function DownloadCanvasAsImage(){
  let downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', 'pogoda.png');
  let dataURL = canvas.toDataURL('image/png');
  let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
  downloadLink.setAttribute('href', url);
  downloadLink.click();
}
board.addEventListener("mousemove", updateDisplay, false);
board.addEventListener("mouseenter", updateDisplay, false);
board.addEventListener("mouseleave", updateDisplay, false);
document.body.addEventListener("mousemove", updateCords, false);
document.body.addEventListener("mouseenter", updateCords, false);
document.body.addEventListener("mouseleave", updateCords, false);
