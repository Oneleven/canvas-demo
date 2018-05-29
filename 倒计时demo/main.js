var radius = 8

window.onload = function(){
  var context = document.getElementById('drawing').getContext('2d')
  render( context )
}


function render( ctx ){
   
    var hours = 12
    var minutes = 2
    var seconds = 3

    renderDigit(0, 0, parseInt(hours/10) , ctx)
}

function renderDigit(x, y, num , ctx){
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