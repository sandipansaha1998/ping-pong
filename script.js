// canvas object
const canvas = document.getElementById("canvas");
//the context object
const ctx = canvas.getContext("2d");

//Max Score Div
const maxScoreDiv = document.querySelector(".max-score");
// Play Button
const buttonPlay = document.querySelector(".play");
//GameOver
const gameOver = document.querySelector(".game-over");


let level = {
    amateur:5,
    pro:6,
    world:7
}



//Ball object
let ball = {
    x:0,
    y:0,
    size:5,
    dx:level.amateur,
    dy:level.amateur
};
//Bar object
let bar = {
    width:100,
    height:10,
    x:canvas.width/2,
    dx:80,
    dy:80
}
// Score

let stats = {
    score:0,
    max_score:0
}







// Setting the height and width of the canvas to that of the canvasConatiner object

let canvasConatiner = document.querySelector('.panel');
canvas.width = canvasConatiner.offsetWidth/2;
canvas.height = canvasConatiner.offsetHeight-10;

//Container
const containerWalls = {
    x1:canvasConatiner.offsetLeft,
    x2:+canvasConatiner.offsetLeft+canvas.width,
    y1:canvasConatiner.offsetTop,
    y2:canvasConatiner.offsetTop+canvas.height

}




//Draws the ball
function drawBall(){
ctx.beginPath();
ctx.arc(ball.x,ball.y,ball.size,0,Math.PI*2);
ctx.stroke();
ctx.fill();
}

// Draw bars
function drawBar()
{
    ctx.fillRect(bar.x, 2, bar.width, bar.height);//Top bar
    ctx.fillRect(bar.x, canvas.height-bar.height-2, bar.width, bar.height);//Bottom bar
}

//Movement Animation of the ball
function update()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawBar();

    ball.x+=ball.dx;
    ball.y+=ball.dy;

     //Check Bars
  
     if(ball.y > canvas.height-bar.height || ball.y<bar.height)
     {
        
        if((ball.x>bar.x && ball.x<bar.x+bar.width) || (ball.x>bar.x && ball.x<bar.x+bar.width))
        {
    
         ball.dy*=-1;
         stats.score+=1;
         animate();
         stats.max_score=Math.max(stats.score,stats.max_score);

        }
     }


    // Detect walls

    // Side Walls
    if(ball.x-ball.size<0 || ball.x+ball.size>canvas.width  ) 
    {
        ball.dx*=-1;
    }
    //Top and Bottom Walls 
    if(ball.y-ball.size<0 || ball.y+ball.size/2>canvas.height)
    {
        stats.max_score = Math.max(stats.max_score,stats.score);
        maxScoreDiv.innerHTML = "Max:"+stats.max_score;
        gameOver.style.display='block';
        gameOver.querySelector('.curr_score').innerHTML='You Scored :'+stats.score;
        stats.score=0;

        return;
    }
    requestAnimationFrame(update);
}

// Movement Animation of the bar
function movementDetection(event){
    if(event.which == 37)
    {
       if(bar.x>0) 
       bar.x-=bar.dx;
    }
   

    if(event.which == 39)
    {
        if(bar.x+bar.width<canvas.width) 
        bar.x+=bar.dx;
    }
   
}
document.addEventListener('keydown',movementDetection);


// counter animation
var curr = document.querySelector(".curr");
var next = document.querySelector(".next");
function animate()
{
  
 
   
   setTimeout(function(){
      next.innerHTML=stats.score;
      next.classList.add('animate');
   setTimeout(()=>{curr.innerHTML=stats.score;},300);
   setTimeout(()=>{
                  next.classList.remove('animate')},400);

   });
}


function resetGame(){
    ball.x=0;
    ball.y=0;
    if(document.getElementById('amateur').checked) {
        ball.dx = level.amateur;
        ball.dy = level.amateur;
      }else if(document.getElementById('pro').checked) {
        ball.dx = level.pro;
        ball.dy = level.pro;
      }
      else{
        ball.dx = level.world;
        ball.dy = level.world;
      }

    //Bar object
    bar = {
    width:100,
    height:10,
    x:canvas.width/2-50,
    dx:80,
    dy:80
}
stats.score=0;
curr.innerHTML=stats.score;
gameOver.style.display='none';
}



function begin(){
    if(document.getElementById('amateur').checked) {
        ball.dx = level.amateur;
        ball.dy = level.amateur;
      }else if(document.getElementById('pro').checked) {
        ball.dx = level.pro;
        ball.dy = level.pro;
      }
      else{
        ball.dx = level.world;
        ball.dy = level.world;
      }

    resetGame();
    drawBall();
    drawBar();
    update();
    
}



buttonPlay.addEventListener('click',begin);
