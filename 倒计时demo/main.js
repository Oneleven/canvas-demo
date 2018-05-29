var radius = 8
const marginTop = 60
const matginLeft = 30
var endTime = new Date(2018,4,30,1,22,33)  //月份是从0开始的
var currentSeconds = 0

window.onload = function(){
  var context = document.getElementById('drawing').getContext('2d')

  currentSeconds = getCurrentSeconds()
  render( context )
}

function getCurrentSeconds(){
  var currentTime = new Date()
  var now = endTime.getTime() - currentTime.getTime()
  var nowSeconds = Math.round(now/1000)  //四舍五入取整
  return nowSeconds >=0 ? nowSeconds : 0
}

function render( ctx ){
   
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
}

function renderDigit(x, y, num , ctx){  //绘制一个数字
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