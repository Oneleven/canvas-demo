window.onload = function(){

    var canvas = document.getElementById('drawing')
    var context = canvas.getContext('2d')

    canvas.width = 1200
    canvas.height = 800


    // 使用图片
    // var image = new Image()
    // image.src = './233.png'

    // image.onload = function(){
    //     var pattern = context.createPattern( image, 'repeat-x')
    //     context.fillStyle = pattern
    //     context.fillRect(0, 0, canvas.width, canvas.height)
    // }



    // 绘制圆角矩形
    function strokeRoundRect(ctx, x, y, width, height, radius , /*optional*/color){
        if(width < 2*radius || height < 2*radius){
            return
        }

        ctx.save()
        ctx.translate(x, y)
        singleRoundRect(ctx, width, height, radius)
        ctx.strokeStyle = color || 'black'  //可选参数
        ctx.stroke()
        ctx.restore()
    }

    function fillRoundRect(ctx, x, y, width, height, radius , /*optional*/color){
        if(width < 2*radius || height < 2*radius){
            return
        }

        ctx.save()
        ctx.translate(x, y)
        singleRoundRect(ctx, width, height, radius)
        ctx.fillStyle = color || 'black'  //可选参数
        ctx.fill()
        ctx.restore()
    }


    function singleRoundRect(ctx, width, height, radius){
        ctx.beginPath()
        ctx.arc(radius, radius, radius, Math.PI, Math.PI*1.5)
        ctx.lineTo(width-radius,0)
        ctx.arc(width - radius, radius, radius, Math.PI*1.5, Math.PI*2)
        ctx.lineTo(width, height - radius)
        ctx.arc(width - radius, height-radius, radius, 0, Math.PI*0.5)
        ctx.lineTo(radius, height)
        ctx.arc(radius, height - radius, radius, Math.PI*0.5, Math.PI)
        ctx.closePath()
    }

    


    //2048棋盘
    fillRoundRect(context, 150 ,150 ,500, 500, 10, '#bbada0')
    for( let i = 0; i<4 ; i++){
        for( let j=0 ; j<4 ; j++){
            fillRoundRect(context, 170+120*i ,170+120*j ,100, 100, 8, '#ccc0b3')
        }
    }

}