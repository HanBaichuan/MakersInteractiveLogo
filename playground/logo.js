var dots = document.getElementsByClassName("dot")
var trigger = document.getElementById("trigger")
var wave = document.getElementById("wave")

// Find your root SVG element
var svg = document.getElementById('logo');
console.log(svg)
// Create an SVGPoint for future math

//Initialize the SVG
for(var i = 0; i < dots.length; i++){
    dots[i].setAttribute("r",0)
    dots[i].style.fill = "rgba(255,255,255,1)"
}

//Attributes lerped by amie
var wave_attr = {
    size: 0,
    color: "rgba(255,255,255,1)"
}

//Attributes for revealing
var reveal_progress = {
    size: 0,
    color: "rgba(255,255,255,0)"
}

//my only way to reference animation outside of the listener, pause it, and remove the animation
var anim_list = [] 

var mouse_speed = {"speedX": 0, "speedY": 0, "speed": 0}

//Track mouse speed
var timestamp = null;
var lastMouseX = null;
var lastMouseY = null;

document.body.addEventListener("mousemove", function(e) {
    if (timestamp === null) {
        timestamp = Date.now();
        lastMouseX = e.screenX;
        lastMouseY = e.screenY;
        return;
    }

    var now = Date.now();
    var dt =  now - timestamp;
    var dx = e.screenX - lastMouseX;
    var dy = e.screenY - lastMouseY;
    var speedX = Math.round(dx / dt * 100);
    var speedY = Math.round(dy / dt * 100);
    mouse_speed['speedX'] = Math.abs(speedX)
    mouse_speed['speedY'] = Math.abs(speedY)
    mouse_speed['speed'] = (speedX**2 + speedY**2) ** (1/2)
    timestamp = now;
    lastMouseX = e.screenX;
    lastMouseY = e.screenY;
});

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

//when dots are loaded, reveal
window.addEventListener("DOMContentLoaded", (e)=>{
    anime({
        targets: reveal_progress,
        size: 6,
        transparency: 1,
        duration: 1000,
        easing: 'easeInOutSine',
        update: function(){
            for(var i = 0; i < dots.length; i++){
                var current_size = Math.min(dots[i].getAttribute('init_r'), reveal_progress.size);
                dots[i].setAttribute('r', current_size)
                dots[i].style.fill =  "rgba(255,255,255," + reveal_progress.transparency + ")"
            }
        }
    })
})

//when pointer enter, 
//read force and enter point,
//wave teleports to and scales at enter point,
//dots breath once upon touching the wave
trigger.addEventListener("pointerenter", (e)=>{{
    var force = mouse_speed['speed']
    console.log(force)
    //console.log(clamp(force/200, 0.8, 2))
    for(var i = 0; i < dots.length; i++){
        dots[i].setAttribute("mode", "shrink")
    }
    wave_attr = {
        size: 0,
        color: "rgba(255,255,255,0.5)"
    }
    var pt = svg.createSVGPoint();
    pt.x = e.clientX; 
    pt.y = e.clientY;
    ep = pt.matrixTransform(svg.getScreenCTM().inverse());
    var enter_point = [ep.x, ep.y]
    try{
        anim_list[anim_list.length - 1].pause()
        anim_list=[]
    }catch(err){
        //console.log("first")
    }
    //console.log(enter_point)
    var anim = anime({
        targets: wave_attr,
        size: 170 * clamp(force/130, 1, 1.5),
        easing: "easeOutQuint",
        duration: 3000,
        update: function(){
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
                            keyframes:[
                                {r: r_n*r_n/3.4 * clamp(force/100, 0.75, 1.0), fill: "rgba(255,255,255,1)", delay:0},
                                {r: r_n, fill: "rgba(255,255,255,1)", delay:0},
                            ],  
                            easing: "linear",
                            delay: 0,
                            duration:500              
                        }) 
                    }
                    dots[i].setAttribute("mode", "grow")
                }
            } 
        }
    })
    anim_list.push(anim)
    wave.setAttribute("cx", enter_point[0])
    wave.setAttribute("cy", enter_point[1])
}})

trigger.addEventListener("pointerdown", (e)=>{{
    for(var i = 0; i < dots.length; i++){
        dots[i].setAttribute("mode", "shrink")
    }
    wave_attr = {
        size: 0,
        color: "rgba(255,255,255,0.5)"
    }
    var pt = svg.createSVGPoint();
    pt.x = e.clientX; 
    pt.y = e.clientY;
    ep = pt.matrixTransform(svg.getScreenCTM().inverse());
    var enter_point = [ep.x, ep.y]
    //console.log(can_click_again)
    try{
        anim_list[anim_list.length - 1].pause()
        anim_list=[]
    }catch(err){
        console.log("first")
    }
    var anim = anime({
        targets: wave_attr,
        size: 170,
        easing: "linear",
        duration: 1000,
        update: function(){
            wave.setAttribute("r", wave_attr.size)
            for(var i = 0; i < dots.length; i++){
                var dx = enter_point[0] - dots[i].getAttribute("cx")
                var dy = enter_point[1] - dots[i].getAttribute("cy")
                var d = (dx**2 + dy**2) ** (1/2)
                if(dots[i].id == "blue"){
                    //console.log("ENTER: " + [Math.floor(enter_point[0]), Math.floor(enter_point[1])]  + " THAT DOT: " + [Math.floor(dots[i].getAttribute("cx")), Math.floor(dots[i].getAttribute("cy"))] + " size: " + wave_attr.size)
                }
                if (wave_attr.size > d - 0.5){
                    var r_n = dots[i].getAttribute("init_r")
                    if(dots[i].getAttribute("mode") == null || dots[i].getAttribute("mode") == "shrink"){
                        anime({
                            targets: dots[i],
                            keyframes:[
                                {r: r_n*r_n/15, fill: "rgba(255,255,255,1)", delay:0},
                                {r: r_n, fill: "rgba(255,255,255,1)", delay:0},
                            ],  
                            easing: "linear",
                            delay: 0,
                            duration:500              
                        }) 
                    }
                    dots[i].setAttribute("mode", "grow")
                }
            } 
        }
    })
    anim_list.push(anim)
    wave.setAttribute("cx", enter_point[0])
    wave.setAttribute("cy", enter_point[1])
}})