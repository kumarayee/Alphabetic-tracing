
function olddrawClipPaths(solutionLines,strokePointPressed){
    noFill();
    stroke(5, 160);
    for(j=0;j<solutionLines.length;j++){
      solutionLine = solutionLines[j]
      strokeLength = strokePointPressed[j]*windowWidth
      beginShape();
      strokeWeight(strokeLength);
      for(i=0;i<solutionLine.length;i++)
      {      
        curveVertex(solutionLine[i][0], solutionLine[i][1] );
      }
      endShape();
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
  
  
  function drawVertices(vertices){
    fill(0,255,255)
    strokeWeight(0)
    for(i=0;i<vertices.length;i++)
    {
      circle(vertices[i][0],vertices[i][1],15)
    }   
  
  }
     
  function drawSolutionLine(solutionLine){
    strokeWeight(180);
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
  

  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  
  function touchStarted() {
    touchIsPressed = true
  }
  
  function touchEnded() {
    touchIsPressed = false
  }