let mouseIsClicked = false
let mouseIsDragged = false
let mouseWheelup = false
let mouseWheeldown = false
let strokeSelectedWeight = 120;
function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(80);
    stroke(255,0,0,200);


    checkbox = createCheckbox('',true);
    checkbox.position(windowWidth/2, windowHeight*0.9);


    checkbox1 = createCheckbox('clip',false);
    checkbox1.position(windowWidth/2*0.9, windowHeight*0.9);



    let button = createButton('Download');
    button.position(windowWidth/2, windowHeight*0.93);
    button.mousePressed(downloadVertices);

    let button1 = createButton('Save path');
    button1.position((windowWidth/2)*1.1, windowHeight*0.90);
    button1.mousePressed(breakClipPath);
   
}
  
var pointsPressed = []
var pointPressed = []
var strokePointPressed = []
function draw() {
  clear()

//  background(255,255,0,160)
  if(mouseIsClicked){

    if(checkbox.checked()){
      if(!getProximalPoint(pointPressed)){
        if(mouseY/windowHeight<0.9){
          pointPressed.push([mouseX/windowWidth,mouseY/windowHeight])
        }
      }
    }
    else{
      selection = getProximalPoint(pointPressed)
      if(selection){
        pointPressed.splice(pointPressed.indexOf(selection), 1);
        // strokePointPressed.splice(pointPressed.indexOf(selection), 1);
      }
      
    }
    mouseIsClicked = false
  }  

  if(mouseIsDragged){
    if(checkbox.checked()){
      ppoint = getProximalPoint(pointPressed)
      id_ppoint = pointPressed.indexOf(ppoint)
      pointPressed[id_ppoint]=[mouseX/windowWidth,mouseY/windowHeight]
    }
  }


  if(mouseIsDragged && mouseWheelup){
    // strokeSelectedWeight += 1
    if(checkbox.checked()){
      ppoint = getProximalPoint(pointPressed)
      id_ppoint = pointPressed.indexOf(ppoint)
      strokeSelectedWeight += 1
    }
    mouseWheelup = false
  }

  if(mouseIsDragged && mouseWheeldown){
    if(checkbox.checked()){
      ppoint = getProximalPoint(pointPressed)
      id_ppoint = pointPressed.indexOf(ppoint)
      strokeSelectedWeight -= 1
      // strokePointPressed[id_ppoint]-= 1
    }
    mouseWheeldown = false
  }

 
  drawClipPath(pointPressed) 

  
 
 

  drawClipPaths(pointsPressed)
  drawVertices(pointPressed)
  executeCheckBoxEvents()


}

function mouseWheel(event) {
  event.preventDefault();

  if(event.delta > 0)
  {
    mouseWheelup =  true
    mouseWheeldown = false
  }
  else
  {
    mouseWheeldown = true
    mouseWheelup = false
  }

}

function eraseClipPath(solutionLine){
  noFill();
  erase();
  for(i=0;i<solutionLine.length;i++)
    {
      strokeWeight(strokeSelectedWeight);
      curveVertex(solutionLine[i][0]*windowWidth, solutionLine[i][1]*windowHeight );
    }
  noErase();
}

function drawClipPath(solutionLine){
  noFill();
  beginShape();
  for(i=0;i<solutionLine.length;i++)
    {
      strokeWeight(strokeSelectedWeight);
      curveVertex(solutionLine[i][0]*windowWidth, solutionLine[i][1]*windowHeight );
    }
  endShape();
}

function drawClipPaths(solutionLines){
  noFill();
  blendMode(BLEND)
  // stroke(255)
  for(j=0;j<solutionLines.length;j++){
    solutionLine = solutionLines[j]
    strokeLength = strokePointPressed[j]
    beginShape();
    strokeWeight(strokeLength);
    for(i=0;i<solutionLine.length;i++)
    {      
      curveVertex(solutionLine[i][0]*windowWidth, solutionLine[i][1]*windowHeight );
    }
    endShape();
  }
  blendMode(BLEND)

}


function drawSolutionLine(solutionLine){
  
  stroke(brushColor);
  for(i=1;i<solutionLine.length;i++)
  {
    strokeWeight(strokePointPressed[i]);
    line(solutionLine[i-1][0]*windowWidth,solutionLine[i-1][1]*windowHeight,solutionLine[i][0]*windowWidth,solutionLine[i][1]*windowHeight)

  }
    
  strokeWeight(80);
  stroke(5,160);
}

function mouseClicked(){
  mouseIsClicked = true
  mouseIsDragged = false
}

function mouseDragged(){
  mouseIsDragged = true
}
function executeCheckBoxEvents(){
  
  

    if(checkbox.checked())
  {
    strokeWeight(1)
    text("add",(windowWidth/2)+20, (windowHeight*0.9+10))
    strokeWeight(80)
  }
  else{
    strokeWeight(1)
    text("delete",(windowWidth/2)+20, (windowHeight*0.9+10))
    strokeWeight(80)
  }

}


function drawVertices(vertices){
    fill(0,255,255)
    strokeWeight(10)
    for(i=0;i<vertices.length;i++)
    {
      circle(vertices[i][0]*windowWidth,vertices[i][1]*windowHeight,15)
      strokeWeight(1)
      text(i,vertices[i][0]*windowWidth,(vertices[i][1]*windowHeight)+25)
      strokeWeight(10)
    }   
  }

function getProximalPoint(vertices)
{
  for(let i=0;i<vertices.length;i++)
  {
    if(dist(vertices[i][0], vertices[i][1], mouseX/windowWidth,mouseY/windowHeight) < 0.025)
    {
      return vertices[i]
    }
  }
}



function breakClipPath(){
  pointsPressed.push(pointPressed)
  strokePointPressed.push(strokeSelectedWeight)
  strokeSelectedWeight = 90
  pointPressed = []
}

function downloadVertices(){
   clipPath = "ClipPath = ["
   for(let j=0; j< pointsPressed.length; j++){
    pointPressed = pointsPressed[j]
    row = "["
    for(let i=0;i<pointPressed.length;i++){
          row = row + "[windowWidth*"+str(pointPressed[i][0].toFixed(4))+",windowHeight*"+str(pointPressed[i][1].toFixed(4))+`],
          `
    }
    row = row + "],"
    clipPath = clipPath + row
   }
   clipPath = clipPath + `]
   `

   strokePath = []
   for(let k = 0; k < strokePointPressed.length; k++){
    strokePath.push(strokePointPressed[k]/windowWidth )

   }
   strokeContent = JSON.stringify(strokePath);

   content = clipPath + strokeContent
   
  console.log(content)


  var file = new File(["\ufeff"+content], 'myFile.txt', {type: "text/plain:charset=UTF-8"});

  //create a ObjectURL in order to download the created file
  url = window.URL.createObjectURL(file);

  //create a hidden link and set the href and click it
  var a = document.createElement("a");
  a.style = "display: none";
  a.href = url;
  a.download = file.name;
  a.click();
  window.URL.revokeObjectURL(url);


}
