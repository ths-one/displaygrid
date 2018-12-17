
function drawFrame( gx, gy , gw , gh)
{
  var canvas = document.getElementById("IVCCanvas");
  var ctx = canvas.getContext("2d");

  var  th = 20 ;
  canvas.width      = gw;
  canvas.height     = gh;
  canvas.style.left = gx + "px";
  canvas.style.top  = gy + "px";
  canvas.style.position = "absolute";

  var w=canvas.width ;
  var h=canvas.height - th ;
  var x  = 0 ;
  var y  = th ;
  var d  = 2 ;
  var dx = 80 ;
  var dy = 40 ;

  ctx.shadowBlur=0;
  ctx.shadowOffsetX=0;
  ctx.shadowColor="black";
  ctx.fillStyle="#808080";
  ctx.strokeStyle="#808080";
  ctx.lineWidth=1;
  ctx.globalAlpha=1;
  ctx.font = '8pt Courier';
  ctx.clearRect( x, y, w, h);
  ctx.strokeRect(x+1, y+1, w-2, h-2);
}

function updateCanvas()
{
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) 
  {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } 
  else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) 
  {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } 
  else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) 
  {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  drawFrame(20,300,myWidth-40,myHeight-320)
}

//on page load run the game

window.onload = function () { updateCanvas(); }
window.resize = function () { updateCanvas() ; }
