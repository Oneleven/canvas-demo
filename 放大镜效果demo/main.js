
const canvas = document.getElementById('drawing')
const context = canvas.getContext('2d')

var magnifierCanvas = document.getElementById('magnifier')
var magnifierContext = magnifierCanvas.getContext('2d')

var image = new Image()
var isMousedown = false
var scale

window.onload = ()=>{
    canvas.width = 1280
    canvas.height = 800

    image.src = './machine.jpg'
    image.onload = ()=>{
        magnifierCanvas.width = image.width
        magnifierCanvas.height = image.height
        scale = magnifierCanvas.width/canvas.width

        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        magnifierContext.drawImage(image, 0, 0)
    }
    
}

//获取canvas画布上的点的坐标，可以直接用e.offsetX 和 e.offsetY来表示，也可以通过下面的计算公式得到
// function canvasPoint(x, y){
//     var box = canvas.getBoundingClientRect()
//     return {x:x - box.left, y:y - box.top}
// }
// canvasPoint( e.clientX, e.clientY) 

canvas.onmousedown = (e)=>{
    e.preventDefault()
    isMousedown = true
    drawMagnifier(true, e)
}

canvas.onmousemove = (e)=>{
    e.preventDefault()
    if(isMousedown === true){
        drawMagnifier(true, e)
    }
}

canvas.onmouseup = (e)=>{
    e.preventDefault()
    isMousedown = false
    drawMagnifier(false)
}

canvas.onmouseout = (e) =>{
    e.preventDefault()
    isMousedown = false
    drawMagnifier(false)
}

function drawMagnifier(boolean, point){
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage( image, 0, 0, canvas.width, canvas.height)
    if(boolean === true){
        drawCircle( point )
    }
}

function drawCircle(point){
    var r = 150
    var sx = point.offsetX * scale - r
    var sy = point.offsetY * scale - r
    var dx = point.offsetX - r
    var dy = point.offsetY - r

    context.save()
    context.beginPath()
    context.lineWidth = 5
    context.strokeStyle = '#069'
    context.arc( point.offsetX, point.offsetY, r, 0, Math.PI*2 )
    context.stroke()
    context.clip()  //下面的绘图操作都在上面这个圆中进行
    context.drawImage(magnifierCanvas, sx, sy, 2*r, 2*r, dx, dy, 2*r, 2*r)
    context.restore()
}