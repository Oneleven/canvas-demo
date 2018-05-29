var context = document.getElementById('drawing').getContext('2d')

context.strokeStyle = 'black'

for(let i=0; i<10; i++){
    context.beginPath()
    context.arc(50+ 100*i, 100 , 40 , 0, 2*Math.PI*((i+1)/10))
    context.closePath()
    context.stroke()
  }
  
for(var i=0; i<10; i++){
    context.beginPath()
    context.arc(50+ 100*i, 200 , 40 , 0, Math.PI*2*((i+1)/10))
    
    context.stroke()
  }