window.onload = function(){

    const canvas = document.getElementById('drawing')
    const context = canvas.getContext('2d')

    canvas.width = 1200
    canvas.height = 800

    // context.beginPath()
    // context.moveTo(150, 150);
    // context.arcTo(650, 150, 650, 650, 300);
    // context.strokeStyle='red';
    // context.stroke()
    
    
    fillMoon(context, 400, 400, 300, 2, 30)
    
    
}

function fillMoon(ctx, x, y, radius, d, rotate){
    ctx.save()
    ctx.fillStyle='yellow'
    ctx.translate(x, y)
    ctx.rotate(Math.PI/180 * rotate)
    ctx.scale(radius, radius)

    pathMoon(ctx, d)

    ctx.fill()
    ctx.restore()
}

function pathMoon(ctx, d){
    ctx.beginPath();
    ctx.arc(0, 0, 1, Math.PI*0.5, Math.PI* 1.5, true);
    ctx.moveTo(0,-1)
    ctx.arcTo(d, 0, 0, 1, Radius(0, -1, d, 0)/d);   
    ctx.closePath();
}

function Radius(x1, y1, x2, y2){
    return Math.sqrt((y2-y1)*(y2-y1) + (x2-x1)*(x2-x1))
}