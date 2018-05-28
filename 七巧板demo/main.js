var points =[{
    color:'#CCE894',
    p:[{x:0,y:0},{x:400,y:400},{x:0,y:800}]
},{
    color:'#6AC1D4',
    p:[{x:0,y:0},{x:800,y:0},{x:400,y:400}]
},{
    color:'#F294C8',
    p:[{x:800,y:0},{x:800,y:400},{x:600,y:600},{x:600,y:200}]
},{
    color:'#A796C2',
    p:[{x:400,y:400},{x:600,y:200},{x:600,y:600}]
},{
    color:'#F8F222',
    p:[{x:800,y:400},{x:800,y:800},{x:400,y:800}]
},{
    color:'#EF3D61',
    p:[{x:0,y:800},{x:200,y:600},{x:400,y:800}]
},{
    color:'#F7CB2C',
    p:[{x:400,y:400},{x:200,y:600},{x:400,y:800},{x:600,y:600}]
}]

var context = document.getElementById('drawing').getContext('2d')



for(item of points){
    context.beginPath()
    context.moveTo(item.p[0].x,item.p[0].y)

    for(point of item.p){
        context.lineTo(point.x, point.y)
    } 

    context.fillStyle=item.color
    context.closePath()
    context.lineWidth = 5
    context.strokeStyle = 'white'
    context.fill()
    context.stroke()
}

  
    
