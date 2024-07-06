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

  vertices = [[windowWidth*0.45,windowHeight*0.3101],
  [windowWidth*0.45,windowHeight*0.5411],
  [windowWidth*0.44,windowHeight*0.4103],
  [windowWidth*0.42,windowHeight*0.3871],
  [windowWidth*0.39,windowHeight*0.3903],
  [windowWidth*0.37,windowHeight*0.4177],
  [windowWidth*0.36,windowHeight*0.4557],
  [windowWidth*0.37,windowHeight*0.5011],
  [windowWidth*0.38,windowHeight*0.5348],
  [windowWidth*0.41,windowHeight*0.5454],
  [windowWidth*0.44,windowHeight*0.5158],
  [windowWidth*0.63,windowHeight*0.3091],
  [windowWidth*0.63,windowHeight*0.5411],
  [windowWidth*0.61,windowHeight*0.4082],
  [windowWidth*0.59,windowHeight*0.3892],
  [windowWidth*0.56,windowHeight*0.3945],
  [windowWidth*0.54,windowHeight*0.4293],
  [windowWidth*0.54,windowHeight*0.4852],
  [windowWidth*0.56,windowHeight*0.5243],
  [windowWidth*0.58,windowHeight*0.5369],
  [windowWidth*0.61,windowHeight*0.5316],
  [windowWidth*0.45,windowHeight*0.6287],
  [windowWidth*0.45,windowHeight*0.8428],
  [windowWidth*0.44,windowHeight*0.7184],
  [windowWidth*0.42,windowHeight*0.6951],
  [windowWidth*0.38,windowHeight*0.7046],
  [windowWidth*0.37,windowHeight*0.7500],
  [windowWidth*0.37,windowHeight*0.8122],
  [windowWidth*0.39,windowHeight*0.8418],
  [windowWidth*0.42,windowHeight*0.8439],
  [windowWidth*0.44,windowHeight*0.8122],
  [windowWidth*0.63,windowHeight*0.6297],
  [windowWidth*0.63,windowHeight*0.8460],
  [windowWidth*0.61,windowHeight*0.7194],
  [windowWidth*0.59,windowHeight*0.7004],
  [windowWidth*0.56,windowHeight*0.7068],
  [windowWidth*0.54,windowHeight*0.7658],
  [windowWidth*0.55,windowHeight*0.8186],
  [windowWidth*0.57,windowHeight*0.8449],
  [windowWidth*0.59,windowHeight*0.8428],
  [windowWidth*0.61,windowHeight*0.8207],
  ]

solutionPath = [ [vertices[0],vertices[1]],
 
  [vertices[2],vertices[3]],
  [vertices[3],vertices[4]],
  [vertices[4],vertices[5]],
  [vertices[5],vertices[6]],
  [vertices[6],vertices[7]],
  [vertices[7],vertices[8]],
  [vertices[8],vertices[9]],
  [vertices[9],vertices[10]],
  [vertices[10],vertices[11]],
  [vertices[11],vertices[12]],
  // [vertices[12],vertices[13]],
  [vertices[13],vertices[14]],
  [vertices[14],vertices[15]],
  [vertices[15],vertices[16]],
  [vertices[16],vertices[17]],
  [vertices[17],vertices[18]],
  [vertices[18],vertices[19]],
  [vertices[19],vertices[20]],
  [vertices[20],vertices[21]],
  [vertices[21],vertices[22]],
  // [vertices[22],vertices[23]],
  [vertices[23],vertices[24]],
  [vertices[24],vertices[25]],
  [vertices[25],vertices[26]],
  [vertices[26],vertices[27]],
  [vertices[27],vertices[28]],
  [vertices[28],vertices[29]],
  [vertices[29],vertices[30]],
  [vertices[30],vertices[31]],
  [vertices[31],vertices[32]],
  // [vertices[32],vertices[33]],
  [vertices[33],vertices[34]],
  [vertices[34],vertices[35]],
  [vertices[35],vertices[36]],
  [vertices[36],vertices[37]],
  [vertices[37],vertices[38]],
  [vertices[38],vertices[39]],
  [vertices[39],vertices[40]],
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
  strokeWeight(0)
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