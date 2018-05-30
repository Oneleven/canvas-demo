var radius = 8
const marginTop = 60
const matginLeft = 30
// var endTime = new Date(2018,5,2,1,22,33)  //月份是从0开始的
var currentSeconds = 0
var balls = []
var colors = ['#CCE894','#247BA0','#F294C8','#A796C2','#F8F222','#EF3D61','#F7CB2C','#50514F']

window.onload = function(){
  var context = document.getElementById('drawing').getContext('2d')
  currentSeconds = getCurrentSeconds()

  // 动画简易框架
  setInterval(()=>{
     render( context )
     update()
  },50)
}


function update(){
     var nextSeconds = getCurrentSeconds()
     var neHours = parseInt(nextSeconds / 3600)
     var neMinutes = parseInt((nextSeconds - neHours*3600)/60)
     var neSeconds = parseInt(nextSeconds % 60)

     var curHours = parseInt(currentSeconds / 3600)
     var curMinutes = parseInt((currentSeconds - curHours*3600)/60)
     var curSeconds = parseInt(currentSeconds % 60)

     if( neSeconds !== curSeconds){
      if(parseInt(curHours/10) !== parseInt(neHours/10)){
        addBalls(matginLeft, marginTop, parseInt(curHours/10))
      }
      if(parseInt(curHours%10) !== parseInt(neHours%10)){
        addBalls(matginLeft + 15*(radius+1), marginTop, parseInt(curHours%10))
      }

      if(parseInt(curMinutes/10) !== parseInt(neMinutes/10)){
        addBalls(matginLeft + 39*(radius+1), marginTop, parseInt(curMinutes/10) )
      }
      if(parseInt(curMinutes%10) !== parseInt(neMinutes%10)){
        addBalls(matginLeft + 54*(radius+1), marginTop, parseInt(curMinutes%10) )
      }

      if(parseInt(curSeconds/10) !== parseInt(neSeconds/10)){
        addBalls(matginLeft + 78*(radius+1), marginTop, parseInt(curSeconds/10) )
      }
      if(parseInt(curSeconds%10) !== parseInt(neSeconds%10)){
        addBalls(matginLeft + 93*(radius+1), marginTop, parseInt(curSeconds%10) )
      }


      currentSeconds = nextSeconds
     }

     updateBalls()
}


function updateBalls(){
  for(var i=0;i<balls.length;i++){

    balls[i].x += balls[i].vx
    balls[i].y += balls[i].vy
    balls[i].vy += balls[i].g

    if(balls[i].y >= 700- radius){
      balls[i].y = 700- radius
      balls[i].vy = -balls[i].vy*0.64
    }
  }
}

// 创建彩色动画小球并push到数组
function addBalls(x, y,num){
  for(var i=0;i<digit[num].length;i++){
    for(var j=0;j<digit[num][i].length;j++){
      if(digit[num][i][j] === 1){
        var aBall = {
          x: x+2*j*(radius+1)+(radius+1),
          y: y+2*i*(radius+1)+(radius+1),
          g:2 + Math.random(),
          vx:Math.pow(-1,Math.floor(Math.random()*1000))*4, // vx取随机正负4
          vy:-5,
          color:colors[Math.floor(Math.random()*colors.length)]
        }
        balls.push(aBall)
      }
    }
  }
}

function getCurrentSeconds(){
  var currentTime = new Date()
  var endTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate()+1, 00, 00, 00)
  var now = endTime.getTime() - currentTime.getTime()
  var nowSeconds = Math.round(now/1000)  //四舍五入取整
  return nowSeconds >=0 ? nowSeconds : 0
}

function render( ctx ){

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height) //对矩形内进行刷新
   
    var hours = parseInt(currentSeconds / 3600)
    var minutes = parseInt((currentSeconds - hours*3600)/60)
    var seconds = parseInt(currentSeconds % 60)

    renderDigit(matginLeft, marginTop, parseInt(hours/10) , ctx)
    renderDigit(matginLeft + 15*(radius+1), marginTop, parseInt(hours%10) , ctx)
    renderDigit(matginLeft + 30*(radius+1), marginTop, 10 , ctx)
    renderDigit(matginLeft + 39*(radius+1), marginTop, parseInt(minutes/10) , ctx)
    renderDigit(matginLeft + 54*(radius+1), marginTop, parseInt(minutes%10) , ctx)
    renderDigit(matginLeft + 69*(radius+1), marginTop, 10 , ctx)
    renderDigit(matginLeft + 78*(radius+1), marginTop, parseInt(seconds/10) , ctx)
    renderDigit(matginLeft + 93*(radius+1), marginTop, parseInt(seconds%10) , ctx)


    // 绘制动画小球
    for(var i=0; i<balls.length; i++){
      ctx.fillStyle = balls[i].color

      ctx.beginPath()
      ctx.arc(balls[i].x, balls[i].y , radius, 0, 2*Math.PI)
      ctx.closePath()

      ctx.fill()
    }

}

function renderDigit(x, y, num , ctx){  //通过canvas绘制一个数字
    ctx.fillStyle = '#6AC1D4'
    for(var i=0; i<digit[num].length; i++){
      for(var j=0;j<digit[num][i].length; j++){
        if(digit[num][i][j] === 1){
          ctx.beginPath()    
          ctx.arc(x+2*j*(radius+1)+(radius+1), y+2*i*(radius+1)+(radius+1), radius, 0 , 2*Math.PI)
          ctx.closePath()
          ctx.fill()

        }
      }
    }
}