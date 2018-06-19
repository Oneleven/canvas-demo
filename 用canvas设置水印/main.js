var canvas = document.getElementById('drawing')
var context = canvas.getContext( '2d')
var image = new Image()
var slider = document.getElementById('range')

//设置水印
var waterMarkCanvse = document.getElementById('waterMark')
var waterMarkContext = waterMarkCanvse.getContext('2d')

window.onload = ()=>{
    canvas.width = 1263
    canvas.height = 768

    var scale = slider.value //滑杆range的值

    image.src = './cartoon.jpg'

    image.onload = ()=>{
        //context.drawImage(image, 0, 0, canvas.width, canvas.height)
        drawImage(scale)
        // slider.onchange = ()=>{
        //     scale = slider.value
        //     drawImage(scale)
        // }

        slider.onmousemove = ()=>{
            scale = slider.value
            drawWaterMark(scale)
            drawImage(scale)
        }
    }

    drawWaterMark(scale)
    // //设置水印
    // waterMarkCanvse.width = 350
    // waterMarkCanvse.height = 100

    // var textSize = 50*scale
    // waterMarkContext.font = `bold ${textSize}px Arial`
    // waterMarkContext.fillStyle = 'rgba(250, 250, 250, 0.5)'
    // waterMarkContext.textBaseline = 'middle'
    // waterMarkContext.fillText('==daodao==', 20, 50)
    
}

function drawWaterMark(scale){
     //设置水印


     if(scale < 1){
        var textSize = 50*scale*0.9
        //console.log('textSize: '+ textSize)
        waterMarkCanvse.width = 350*scale
        waterMarkCanvse.height = 100*scale
        waterMarkContext.font = `bold ${textSize}px Arial`
        waterMarkContext.fillStyle = 'rgba(250, 250, 250, 0.5)'
        waterMarkContext.textBaseline = 'middle'
        waterMarkContext.fillText('==daodao==', 20*scale, 50*scale)
     }else{
        waterMarkCanvse.width = 350
        waterMarkCanvse.height = 100
        waterMarkContext.font = `bold 50px Arial`
        waterMarkContext.fillStyle = 'rgba(250, 250, 250, 0.5)'
        waterMarkContext.textBaseline = 'middle'
        waterMarkContext.fillText('==daodao==', 20, 50)
     }
   

    //  waterMarkCanvse.width = 350
    //  waterMarkCanvse.height = 100
    //  waterMarkContext.font = `bold 50px Arial`
     
    //  waterMarkContext.fillText('==daodao==', 20, 50)
}

function drawImage(scale){
    var imageWidth = 1263* scale
    var imageHeight = 768 * scale
    var dx = (canvas.width - imageWidth)/2
    var dy = (canvas.height - imageHeight)/2
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, dx, dy, imageWidth, imageHeight )
    //设置水印，drawImage里面第一个参数可以是另外一个canvas

    if(scale <1){
        //这里的dx和dy是根据父canvas来定位的，不是waterMarkCanvas来决定的，坑死我了
        context.drawImage(waterMarkCanvse, canvas.width-(canvas.width-imageWidth)/2-waterMarkCanvse.width, canvas.height-(canvas.height-imageHeight)/2-waterMarkCanvse.height)
        //context.drawImage(waterMarkCanvse, 100, 100)
    }else{
        context.drawImage(waterMarkCanvse, canvas.width-waterMarkCanvse.width, canvas.height- waterMarkCanvse.height)
    }
}