var aBall = {
    x:600 ,
    y:400,
    radius: 150,
    vx:Math.random()*5 + 10,
    vy:Math.random()*5 + 10,
    rotate:1
}

window.onload = function(){

    const canvas = document.getElementById('drawing')
    const context = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 800


    setInterval(()=>{
        draw(context)
        update()
    },50)

}

function draw(ctx){
    ctx.save()
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height)

    // ctx.beginPath()
    // ctx.fillStyle = "white"
    // ctx.arc(aBall.x, aBall.y, aBall.radius, 0, Math.PI*2)
    // ctx.fill()

    drawStar(ctx, aBall.x, aBall.y, aBall.radius, aBall.rotate)
    ctx.clip()
    



    ctx.beginPath()
    ctx.shadowColor = 'black'
    ctx.shadowOffsetX = 3
    ctx.shadowOffsetY = 3
    ctx.shadowBlur = 2
    ctx.fillStyle = '#888888'
    ctx.font = 'bold 120px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('canvs!', ctx.canvas.width/2, ctx.canvas.height*1/4)
    ctx.fillText('canvs!', ctx.canvas.width/2, ctx.canvas.height*1/2)
    ctx.fillText('canvs!', ctx.canvas.width/2, ctx.canvas.height*3/4)
    ctx.restore()
}

function drawStar(ctx, x, y, r, rotate){
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = "white"
    for(let i=0; i<5; i++){ 
        ctx.lineTo(x + r*Math.cos(Math.PI/180*(rotate+18+ 72*i)), y-r*Math.sin(Math.PI/180*(rotate+18 + 72*i )))
        ctx.lineTo(x + r/2*Math.cos(Math.PI/180*(rotate+54+ 72*i)),y -r/2*Math.sin(Math.PI/180*(rotate+54 + 72*i )))
    }
    ctx.closePath()
    ctx.fill()
    ctx.restore()
    
    // ctx.beginPath()
    // ctx.fillStyle = "white"
    // ctx.arc(x, y, r, 0, Math.PI*2)
    // ctx.fill()

}

function update(){
    aBall.rotate += 1
    aBall.x = aBall.x + aBall.vx
    aBall.y += aBall.vy
    if(aBall.x <= aBall.radius || aBall.x>=800-aBall.radius){
        aBall.vx = - aBall.vx
    }
    if(aBall.y <= aBall.radius || aBall.y>=800-aBall.radius){
        aBall.vy = - aBall.vy
    }
}