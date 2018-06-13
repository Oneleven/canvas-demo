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
    function roundRect(ctx, x, y, width, height, radius){
        ctx.save()

        ctx.translate(x, y)
        singleRoundRect(ctx, width, height, radius)
        ctx.strokeStyle = 'black'
        ctx.stroke()
        ctx.restore()
    }


    function singleRoundRect(ctx, width, height, radius){
        ctx.beginPath()
        ctx.arc(radius, radius, Math.PI, Math.PI*1.5)
        ctx.lineTo(width-radius,0)
        ctx.closePath()
    }

}