var dots = document.getElementsByClassName("dot")
var trigger = document.getElementById("trigger")
var wave = document.getElementById("wave")

for(var i = 0; i < dots.length; i++){
    dots[i].style.fill = "rgba(255,255,255,0.5)"
}

var wave_attr = {
    size: 0,
}
var left = false

trigger.addEventListener("mouseleave", (e)=>{
    left = true;
    var exit_point = [e.clientX, e.clientY]
    var anim = anime({
        targets: wave_attr,
        size: 0,
        easing: "easeOutQuint",
        duration: 2000,
        update: function(){
            if(!left){
                anim.pause()
            }
            wave.setAttribute("r", wave_attr.size)
            for(var i = 0; i < dots.length; i++){
                var dx = exit_point[0] - dots[i].getAttribute("cx")
                var dy = exit_point[1] - dots[i].getAttribute("cy")
                var d = (dx**2 + dy**2) ** (1/2)
                if (wave_attr.size < d + 0.5){
                    var r_n = dots[i].getAttribute("init_r")
                    if(dots[i].getAttribute("mode") == "grow"){
                        anime({
                            targets: dots[i],
                            r: r_n*1,
                            fill: "rgba(255,255,255,0.5)",
                        }) 
                    }
                    dots[i].setAttribute("mode", "shrink")
                }
            } 
        }
    })
    //wave.setAttribute("cx", e.clientX)
    //wave.setAttribute("cy", e.clientY)
})
trigger.addEventListener("mouseenter", (e)=>{{
    left = false;
    var enter_point = [e.clientX, e.clientY]
    console.log(enter_point)
    var anim = anime({
        targets: wave_attr,
        size: 170,
        easing: "easeOutQuint",
        duration: 2000,
        update: function(){
            if(left){
                anim.pause()
            }
            wave.setAttribute("r", wave_attr.size)
            for(var i = 0; i < dots.length; i++){
                var dx = enter_point[0] - dots[i].getAttribute("cx")
                var dy = enter_point[1] - dots[i].getAttribute("cy")
                var d = (dx**2 + dy**2) ** (1/2)
                if (wave_attr.size > d - 0.5){
                    var r_n = dots[i].getAttribute("init_r")
                    if(dots[i].getAttribute("mode") == null || dots[i].getAttribute("mode") == "shrink"){
                        anime({
                            targets: dots[i],
                            r: r_n*1.35,
                            fill: "rgba(255,255,255,1)",
                        }) 
                    }
                    dots[i].setAttribute("mode", "grow")
                }
            } 
        }
    })
    wave.setAttribute("cx", e.clientX)
    wave.setAttribute("cy", e.clientY)
}})

function easeInOutCubic(x){
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
/* sizes = [1,2,3,4,5,6]
function createSvgCircle(x, y, r, c){
    var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle')
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', sizes[r]);
    circle.style.fill = c
    circle.addEventListener("mouseenter", ()=>{
        circle.style.fill = "red"
    })
    circle.addEventListener("mouseleave", ()=>{
        circle.style.fill = "white"
    })
    svg_box.appendChild(circle);
}

function createMakersLogo(x,y,g){
    gridSize = g
    for(var i = 0; i < 9; i ++){
        for(var j = 0; j < i + 1; j ++){
            createSvgCircle(gridSize * 9 - (j * gridSize * 2) + i * gridSize + x, gridSize * i + y, getRandomInt(6), "white")
        }
    }
    var offset = gridSize * 9
    for(var i = 0; i < 8; i ++){
        for(var j = 0; j < 8-i; j ++){
            console.log(i,j)
            createSvgCircle(gridSize + (j * gridSize * 2) + (i+1) * gridSize + x, gridSize * i + offset + y, getRandomInt(6), "white")
        }
    }
}

//createMakersLogo(5,10,10)

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
} */