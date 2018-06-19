
const beforeCanvas = document.getElementById('beforeDrawing')
const beforeContext = beforeCanvas.getContext('2d')

const afterCanvas = document.getElementById('afterDrawing')
const afterContext = afterCanvas.getContext('2d')

const image = new Image()
image.crossOrigin = ''

window.onload = ()=>{
   
    image.src = 'http://oqwgy1e36.bkt.clouddn.com/18-6-19/26467303.jpg' //本地加载会因为跨域问题出错，所以改用线上图片

    image.onload = ()=>{
        beforeContext.drawImage(image, 0, 0, beforeCanvas.width, beforeCanvas.height)
    }
}

function greyFilter(){
    var imageData = beforeContext.getImageData(0, 0, beforeCanvas.width, beforeCanvas.height)
    var pixelData = imageData.data
    //console.log(pixelData)
    for(let i=0; i<beforeCanvas.width * beforeCanvas.height; i++ ){
        var r= pixelData[4*i + 0]
        var g= pixelData[4*i + 1] 
        var b = pixelData[4*i + 2] 

        var grey = r*0.3 + g*0.59 + b*0.11 //最好的灰度计算方式
        pixelData[4*i + 0] = grey
        pixelData[4*i + 1] = grey
        pixelData[4*i + 2] = grey
    }

    afterContext.putImageData(imageData, 0, 0, 0, 0, afterCanvas.width, afterCanvas.height)
}

function blackFilter(){
    var imageData = beforeContext.getImageData(0, 0, beforeCanvas.width, beforeCanvas.height)
    var pixelData = imageData.data
    //console.log(pixelData)
    for(let i=0; i<afterCanvas.width * afterCanvas.height; i++ ){
        var r= pixelData[4*i + 0]
        var g= pixelData[4*i + 1] 
        var b = pixelData[4*i + 2] 

        var grey = r*0.3 + g*0.59 + b*0.11 //最好的灰度计算方式

        if( grey > 126){
            v = 255
        }else{
            v = 0
        }

        pixelData[4*i + 0] = v
        pixelData[4*i + 1] = v
        pixelData[4*i + 2] = v
   
    }

    afterContext.putImageData(imageData, 0, 0, 0, 0, afterCanvas.width, afterCanvas.height)
}

function reverseFilter(){
    var imageData = beforeContext.getImageData(0, 0, beforeCanvas.width, beforeCanvas.height)
    var pixelData = imageData.data
    //console.log(pixelData)
    for(let i=0; i<afterCanvas.width * afterCanvas.height; i++ ){
        var r= pixelData[4*i + 0]
        var g= pixelData[4*i + 1] 
        var b = pixelData[4*i + 2] 

        pixelData[4*i + 0] = 255 - r
        pixelData[4*i + 1] = 255 - g
        pixelData[4*i + 2] = 255 - b
   
    }

    afterContext.putImageData(imageData, 0, 0, 0, 0, afterCanvas.width, afterCanvas.height)
}


//模糊的思路是参考周围的像素点来绘制
function blurFilter(){
    var imageData = beforeContext.getImageData(0, 0, beforeCanvas.width, beforeCanvas.height)
    var pixelData = imageData.data

    var templateImageData = beforeContext.getImageData(0, 0, beforeCanvas.width, beforeCanvas.height)
    var templatePixelData = templateImageData.data
   



    afterContext.putImageData(imageData, 0, 0, 0, 0, afterCanvas.width, afterCanvas.height)
}