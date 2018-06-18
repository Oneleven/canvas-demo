var canvas = document.getElementById('drawing')
var context = canvas.getContext( '2d')
var image = new Image()
var slider = document.getElementById('range')


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
            drawImage(scale)
        }
    }
}

function drawImage(scale){
    var imageWidth = 1263* scale
    var imageHeight = 768 * scale
    var dx = (canvas.width - imageWidth)/2
    var dy = (canvas.height - imageHeight)/2
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, dx, dy, imageWidth, imageHeight )
}