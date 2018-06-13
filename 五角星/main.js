
window.onload = function(){
    var canvas = document.getElementById('drawing')
    var context = canvas.getContext('2d')
    
    canvas.width = 1200
    canvas.height = 800
    
    
    // function fivePointStar(ctx, x, y, R, r, rotate){  //加入旋转效果
    
    //     // ctx.moveTo(x + R*Math.cos(Math.PI/180*18), y-R*Math.sin(Math.PI/180*18))
    //     ctx.strokeStyle = 'black'
    //     ctx.lineWidth = 5
    //     ctx.miterLimit = 20  //默认值为10
    //     ctx.beginPath()
    //     for(let i = 0;i<5;i++){
    //         ctx.lineTo(x + R*Math.cos(Math.PI/180*(18+ 72*i + rotate)), y - R*Math.sin(Math.PI/180*(18 + 72*i + rotate)))
    //         ctx.lineTo(x + r*Math.cos(Math.PI/180*(54+ 72*i + rotate)), y - r*Math.sin(Math.PI/180*(54 + 72*i + rotate)))
    //     }
    //     ctx.closePath()
    //     ctx.stroke()
    // }
    
    // fivePointStar(context, 400, 400, 300, 30, 30)
    
 



//画一片星星
// function fivePointStar(ctx, x, y, R, r, rotate){ 

//     ctx.fillStyle = 'yellow'
//     ctx.lineWidth = 3
//     ctx.beginPath()
//     for(let i = 0;i<5;i++){
//         ctx.lineTo(x + R*Math.cos(Math.PI/180*(18+ 72*i + rotate)), y - R*Math.sin(Math.PI/180*(18 + 72*i + rotate)))
//         ctx.lineTo(x + r*Math.cos(Math.PI/180*(54+ 72*i + rotate)), y - r*Math.sin(Math.PI/180*(54 + 72*i + rotate)))
//     }
//     ctx.closePath()
//     ctx.fill()

// }

// context.fillStyle = 'black'
// context.fillRect(0, 0, canvas.width, canvas.height)


// for(let i = 0; i<150 ; i++){
//     var x = Math.random()
//     var R = Math.random()*10 + 15
//     var x = Math.random()*canvas.width
//     var y = Math.random()*canvas.height
//     fivePointStar(context, x, y, R, R/2, 30)
// }


// 重构

//线性渐变背景色
// var skyStyle = context.createLinearGradient(0, 0, 0, canvas.height)
// skyStyle.addColorStop(0.0, 'black')
// skyStyle.addColorStop(1.0, '#035')
// context.fillStyle = skyStyle
// context.fillRect(0, 0, canvas.width, canvas.height)
//-----------------

//径向渐变背景色
var skyStyle = context.createRadialGradient(canvas.width/2, canvas.height, 0 , canvas.width/2, canvas.height, canvas.height)
skyStyle.addColorStop( 0.0, '#035')
skyStyle.addColorStop( 1.0, 'black')
context.fillStyle = skyStyle
context.fillRect(0, 0, canvas.width, canvas.height)


function drawStar(ctx, x, y, r, rotate){

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate( Math.PI/180 * rotate)
    ctx.scale(r, r)

    fivePointStar(ctx)
    // 先绘制标准的五角星，然后根据变形绘制x, y偏移量，大小为r， 旋转角度为rotate的五角星
    ctx.fillStyle = '#fb3'
    // ctx.strokeStyle = '#fd5'
    // ctx.lineWidth = 3
    // ctx.lineJoin = 'round'
    ctx.fill()
    // ctx.stroke()

    ctx.restore()
}


for(let i = 0; i<150 ; i++){
    var x = Math.random()
    var r = Math.random()*5 +5 
    var x = Math.random()*canvas.width
    var y = Math.random()*canvas.height*0.65
    drawStar(context, x, y, r, 30)
}

fillMoon(context, 850, 200, 100, 2, 30)

}

//标准的五角星
function fivePointStar(ctx){ 
    ctx.lineWidth = 3
    ctx.beginPath()
    for(let i = 0;i<5;i++){
        ctx.lineTo(Math.cos(Math.PI/180*(18+ 72*i)), -Math.sin(Math.PI/180*(18 + 72*i )))
        ctx.lineTo(0.5*Math.cos(Math.PI/180*(54+ 72*i)), -0.5*Math.sin(Math.PI/180*(54 + 72*i )))
    }
    ctx.closePath()
}




//月亮
function fillMoon(ctx, x, y, radius, d, rotate){
    ctx.save()
    ctx.fillStyle='#fd5'
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