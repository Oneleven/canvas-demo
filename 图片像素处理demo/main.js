
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
   
    //调节模糊半径 弊端：半径一大，边缘无法模糊
    var blurR=1

    for(let i=blurR; i<=beforeCanvas.height -blurR; i++){
        for(let j=blurR; j<=beforeCanvas.width -blurR; j++){
            var totalr =0
            var totalg =0
            var totalb =0
            for(let a=-blurR;a<=blurR;a++){
                for(let b=-blurR; b<=blurR; b++){
                    var p = (i+a)*beforeCanvas.width + j+b
                    totalr += templatePixelData[4*p + 0]
                    totalg += templatePixelData[4*p + 1]
                    totalb += templatePixelData[4*p + 2]
                }
            }
            pixelData[4*(i*beforeCanvas.width+j)+0] = totalr / ((2*blurR+1)*(2*blurR+1))
            pixelData[4*(i*beforeCanvas.width+j)+1] = totalg / ((2*blurR+1)*(2*blurR+1))
            pixelData[4*(i*beforeCanvas.width+j)+2] = totalb / ((2*blurR+1)*(2*blurR+1))
        }
    }


    afterContext.putImageData(imageData, 0, 0, 0, 0, afterCanvas.width, afterCanvas.height)
}



//马赛克效果
function mosaicFilter(){
    var imageData = beforeContext.getImageData(0, 0, beforeCanvas.width, beforeCanvas.height)
    var pixelData = imageData.data

    var templateImageData = beforeContext.getImageData(0, 0, beforeCanvas.width, beforeCanvas.height)
    var templatePixelData = templateImageData.data
   
    //调节模糊半径 弊端：半径一大，边缘无法模糊
    var sizex = 8
    var sizey = 8

    for(let i=1; i<=beforeCanvas.height -sizey; i+=sizey){
        for(let j=1; j<=beforeCanvas.width -sizex; j+=sizex){
            var totalr =0
            var totalg =0
            var totalb =0
            for(let a=1;a<=sizey;a++){
                for(let b=1; b<=sizex; b++){
                    var p = (i+a)*beforeCanvas.width + (j+b)
                    totalr += templatePixelData[4*p + 0]
                    totalg += templatePixelData[4*p + 1]
                    totalb += templatePixelData[4*p + 2]
                }
            }
           var averageR = totalr/(sizex*sizey)
           var averageG = totalg/(sizex*sizey)
           var averageB = totalb/(sizex*sizey) 

           for(let a=1;a<sizey; a++){
               for(let b=1;b<sizex;b++){
                    var p = (i+a)*beforeCanvas.width + (j+b)
                    pixelData[4*p + 0] = averageR
                    pixelData[4*p + 1] = averageG
                    pixelData[4*p + 2] = averageB
               }
           }
        }
    }


    afterContext.putImageData(imageData, 0, 0, 0, 0, afterCanvas.width, afterCanvas.height)
}