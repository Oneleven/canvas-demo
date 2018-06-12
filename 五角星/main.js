var canvas = document.getElementById('drawing')
var context = canvas.getContext('2d')

canvas.width = 800
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

context.fillStyle = 'black'
context.fillRect(0, 0, canvas.width, canvas.height)


function drawStar(ctx, x, y, r, rotate){

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate( Math.PI/180 * rotate)

    fivePointStar(ctx)
    // 先绘制标准的五角星，然后根据变形绘制x, y偏移量，大小为r， 旋转角度为rotate的五角星
    ctx.fillStyle = '#fb3'
    ctx.strokeStyle = '#fd5'
    ctx.lineWidth = 3
    ctx.lineJoin = 'round'
    ctx.fill()
    ctx.stroke()

    ctx.restore()
}

//标准的五角星
function fivePointStar(ctx){ 
    ctx.lineWidth = 3
    ctx.beginPath()
    for(let i = 0;i<5;i++){
        ctx.lineTo(20*Math.cos(Math.PI/180*(18+ 72*i)), -20*Math.sin(Math.PI/180*(18 + 72*i )))
        ctx.lineTo(10*Math.cos(Math.PI/180*(54+ 72*i)), -10*Math.sin(Math.PI/180*(54 + 72*i )))
    }
    ctx.closePath()
}


for(let i = 0; i<100 ; i++){
    var x = Math.random()
    var r = Math.random()*10 + 15
    var x = Math.random()*canvas.width
    var y = Math.random()*canvas.height
    drawStar(context, x, y, r, 30)
}
