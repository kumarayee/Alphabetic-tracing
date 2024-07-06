function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(80);
    stroke(5, 160);
}
  
let brushColor = [86,69,186,255]
let pointPressed = []
let solutionLine = []
let touchIsPressed = false
function draw() {
  clear()


  if(mouseIsPressed || touchIsPressed)
  {
    select(".color1").mouseClicked(changecolor1)// check
    select(".color2").mouseClicked(changecolor2)
    select(".color3").mouseClicked(changecolor3)
    select(".color4").mouseClicked(changecolor4)
    select(".color5").mouseClicked(changecolor5)
    select(".color6").mouseClicked(changecolor6)
  }

   vertices = [[windowWidth*0.34,windowHeight*0.2521],
  [windowWidth*0.34,windowHeight*0.4863],
  [windowWidth*0.37,windowHeight*0.2500],
  [windowWidth*0.40,windowHeight*0.2521],
  [windowWidth*0.42,windowHeight*0.2637],
  [windowWidth*0.44,windowHeight*0.2985],
  [windowWidth*0.46,windowHeight*0.3513],
  [windowWidth*0.45,windowHeight*0.4177],
  [windowWidth*0.43,windowHeight*0.4610],
  [windowWidth*0.40,windowHeight*0.4800],
  [windowWidth*0.37,windowHeight*0.4842],
  [windowWidth*0.55,windowHeight*0.2511],
  [windowWidth*0.55,windowHeight*0.4968],
  [windowWidth*0.58,windowHeight*0.2468],
  [windowWidth*0.61,windowHeight*0.2563],
  [windowWidth*0.64,windowHeight*0.2816],
  [windowWidth*0.66,windowHeight*0.3449],
  [windowWidth*0.66,windowHeight*0.4219],
  [windowWidth*0.64,windowHeight*0.4546],
  [windowWidth*0.62,windowHeight*0.4789],
  [windowWidth*0.59,windowHeight*0.4926],
  ]

solutionPath = [ [vertices[0],vertices[1]],
  // [vertices[1],vertices[2]],
  [vertices[2],vertices[3]],
  [vertices[3],vertices[4]],
  [vertices[4],vertices[5]],
  [vertices[5],vertices[6]],
  [vertices[6],vertices[7]],
  [vertices[7],vertices[8]],
  [vertices[8],vertices[9]],
  [vertices[9],vertices[10]],
  // [vertices[10],vertices[11]],
  [vertices[11],vertices[12]],
  // [vertices[12],vertices[13]],
  [vertices[13],vertices[14]],
  [vertices[14],vertices[15]],
  [vertices[15],vertices[16]],
  [vertices[16],vertices[17]],
  [vertices[17],vertices[18]],
  [vertices[18],vertices[19]],
  [vertices[19],vertices[20]],
  ]
 
  drawVertices(vertices)
  if(mouseIsPressed || touchIsPressed){
    pp = getProximalPoint(vertices);
    if(!pointPressed.length && pp){
      pointPressed= pp
    }
    if(pointPressed.length && pp && !isEqualPair(pointPressed,pp)){
      if(checkConnection(pointPressed,pp,solutionPath)){
        solutionLine.push([pointPressed,pp])
        document.getElementById("correctanswer-audio").play();
      }
      // else{
      //   // document.getElementById("wronganswer-audio").play();
      // }
      pointPressed = []
    }
    line(pointPressed[0],pointPressed[1],mouseX,mouseY)
  }  
  drawSolutionLine(solutionLine)
  if(solutionLine.length >= solutionPath.length){
    levelCompleted();
    noLoop()
  }
}

function getProximalPoint(vertices)
{
  for(let i=0;i<vertices.length;i++)
  {
    if(dist(vertices[i][0], vertices[i][1], mouseX, mouseY) < 30)
    {
      return vertices[i]
    }
  }
}

function changecolor1 (){ brushColor = [86,69,186,255]  ; console.log("color1")}
function changecolor2 (){ brushColor = [0,255,103,255]  ; console.log("color2")}
function changecolor3 (){ brushColor = [255,151,0,255]  ; console.log("color3")}
function changecolor4 (){ brushColor = [255,0,0,255]  ; console.log("color4")}
function changecolor5 (){ brushColor = [255,0,170,255]  ; console.log("color5")}
function changecolor6 (){ brushColor = [174,0,255,255]  ; console.log("color6")}

function drawVertices(vertices){
  fill(0,255,255)
  strokeWeight(10)
  for(i=0;i<vertices.length;i++)
  {
    circle(vertices[i][0],vertices[i][1],15)
  }   

}
   
function drawSolutionLine(solutionLine){
  strokeWeight(93);
  stroke(brushColor);
  for(i=0;i<solutionLine.length;i++)
  {
    line(solutionLine[i][0][0],solutionLine[i][0][1],solutionLine[i][1][0],solutionLine[i][1][1])
  }   
  strokeWeight(80);
  stroke(5,160);
}
 
function checkConnection(source, destination,solutionLine){
  for(i=0;i<solutionLine.length;i++)
  {
    if(solutionLine[i][0][0]==source[0] && solutionLine[i][0][1]==source[1] &&  solutionLine[i][1][0] == destination[0] &&  solutionLine[i][1][1] == destination[1])
    {
      return true
    }
  }
  return false
}

function isEqualPair(pair1, pair2)
{
  if(pair1[0] == pair2[0] && pair1[1] == pair2[1])
  {
    return true
  }
  return false
}

function playInstruction() {
  playBackground()
  document.getElementById("instruction-audio").play();
}
function playBackground()
{
  document.getElementById("background-audio").volume=0.1;
  document.getElementById("background-audio").play()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function levelCompleted()
{
  await sleep(5100);
  document.getElementById("level-completed").style.display = "block";
  document.getElementById("levelcompleted-audio").play();
}


function touchStarted() {
  touchIsPressed = true
}

function touchEnded() {
  touchIsPressed = false
}