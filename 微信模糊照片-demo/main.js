
const canvas = document.getElementById('drawing')
const context = canvas.getContext('2d')
const image = new Image()
var timer

radius = 50
var circle = {
    x:100,
    y:100,
    r:50
}

window.onload = ()=>{
    canvas.width = 720
    canvas.height = 450
    image.src = './machine.jpg'

    image.onload = ()=>{

       drawing()
    }
}

function drawing(){
    context.clearRect(0,0,canvas.width, canvas.height)
    
    context.save()
    context.beginPath()
    context.strokeStyle = '#457B9D'
    context.lineWidth = 3
    context.arc(circle.x,circle.y, circle.r, 0, Math.PI*2)
    context.stroke()
    context.clip()
    context.drawImage(image, 0, 0)
    context.restore()
}

function circling(){

}

function reShow(){
    clearInterval(timer)
    circle.r = 50
    circle.x = Math.random()*(canvas.width-2*circle.r) + circle.r
    circle.y = Math.random()*(canvas.height-2*circle.r) + circle.r
    drawing()

}

function display(){

    timer = setInterval(()=>{
        circle.r += 10
        drawing()
        if(circle.r > canvas.width+canvas.height){
            clearInterval(id)
        }
    },30)
  
}