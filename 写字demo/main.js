var isMouseDown = false
var lastLocation = {x:0,y:0}
var lastTime 
var lastLineWidth = -1
const canvas = document.getElementById('drawing')
const context = canvas.getContext('2d')
canvas.width = Math.min(730,$(window).width()-20)
canvas.height = canvas.width
$('#controller').css('width', canvas.width+'px')

var strokeColor = 'black'


$('#clear').click(()=>{
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid()
})

$('#colors').click((e)=>{
    var cur = e.target
    $(cur).addClass('active').siblings().removeClass('active')
    strokeColor = $(cur).css("background-color")
})



window.onload = function(){  

    //绘制格子
    drawGrid()

    //鼠标事件
    canvas.onmousedown = (e)=>{
        e.preventDefault()
        beginStroke(e.clientX, e.clientY)
    }

    canvas.onmouseup = (e)=>{
        e.preventDefault()
        endStroke()
    }

    canvas.onmouseout = (e)=>{
        e.preventDefault()
        endStroke()
    }

    canvas.onmousemove = (e)=>{
        e.preventDefault()
        moveStroke(e.clientX, e.clientY)
    }

    //手机端触摸效果
    canvas.addEventListener('touchstart',(e)=>{
        e.preventDefault()
        beginStroke(e.touches[0].pageX, e.touches[0].pageY)
    })

    canvas.addEventListener('touchmove',(e)=>{
        e.preventDefault()
        moveStroke(e.touches[0].pageX, e.touches[0].pageY)
    })

    canvas.addEventListener('touchend',(e)=>{
        e.preventDefault()
        endStroke()
    })

}

function distance(loc1, loc2){
    return Math.sqrt( (loc1.x - loc2.x)*(loc1.x - loc2.x) + (loc1.y - loc2.y)*(loc1.y - loc2.y) )
}


var maxV = 10
var minV = 0.1
var maxLineWidth = 30
var minLineWidth = 1

function caclLineWidth(s, t){

    var v = s/t

    var resultLineWidth 
    if( v <= minV){
        resultLineWidth = maxLineWidth
    }else if( v>= maxV){
        resultLineWidth = minLineWidth
    }else{
        resultLineWidth = maxLineWidth - (maxLineWidth-minLineWidth)*(v-minV)/(maxV-minV)
    }

    if( lastLineWidth === -1){
        return resultLineWidth   
    }else{
        return  (lastLineWidth*2/3 + resultLineWidth*1/3)
    }
    //处理平滑问题，要根据之前的状态进行计算来过渡
}

   //提取事件函数
   function beginStroke(a, b){
    isMouseDown = true
    // lastLocation = {x:e.offsetX, y:e.offsetY}
    lastLocation = {x:a - canvas.getBoundingClientRect().left,
                    y:b - canvas.getBoundingClientRect().top    
                    }
    lastTime = new Date().getTime()
}

function endStroke(){
    isMouseDown = false
}

function moveStroke(a,b){
    if(isMouseDown){
        // var currentLocation = {x:e.offsetX, y:e.offsetY}
        var currentLocation = {x:a - canvas.getBoundingClientRect().left,
            y:b - canvas.getBoundingClientRect().top    
            }

        //根据壁画速度来调节笔画粗细
        var s = distance(currentLocation, lastLocation)
        var currentTime = new Date().getTime() + 1  //防止速度过快出现t等于0的情况，导致出现bug
        var t = currentTime - lastTime

        // 寻找bug
        // if(t === 0){
        //     alert('heihei')
        // }

        var lineWidth = caclLineWidth( s, t)

        // console.log(lineWidth)
        //draw
        context.beginPath()
        context.strokeStyle = strokeColor
        context.moveTo(lastLocation.x, lastLocation.y)
        context.lineTo(currentLocation.x, currentLocation.y)

        context.lineWidth = lineWidth

        context.lineCap = 'round'
        context.lineJoin = 'round'
        context.stroke()
        lastLocation = currentLocation
        lastTime = currentTime
        lastLineWidth = lineWidth

        // console.log(lastLineWidth)
    }
}

function drawGrid(){
    context.save()
    context.beginPath();
    context.strokeStyle = 'red'
    context.lineWidth=5;  
    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.stroke();
 
    context.beginPath()
    context.strokeStyle = 'red'
    context.lineWidth = 1
    context.moveTo(canvas.width/2 , 0)
    context.lineTo(canvas.width/2 , canvas.height)

    context.moveTo(0, canvas.height/2)
    context.lineTo( canvas.width, canvas.height/2)
    context.stroke()
    
    context.beginPath()
    context.strokeStyle = 'red'
    context.lineWidth = 1
    context.setLineDash([5, 15]) //设置虚线,⚠️这里如果不用save()和restore()存储起来，会影响笔画的连续性
    context.moveTo(0, 0)
    context.lineTo(canvas.width, canvas.height)

    context.moveTo(canvas.width, 0)
    context.lineTo(0, canvas.height)
    context.stroke()
    context.restore()
}

