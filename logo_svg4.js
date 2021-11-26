var dots4 = document.getElementsByClassName("dot4")
var trigger4 = document.getElementById("trigger4")
var wave4 = document.getElementById("wave4")

// Find your root SVG element
var svg4 = document.getElementById('logo4');

// Create an SVGPoint for future math
var pt4 = svg4.createSVGPoint();

// Get point in global SVG space
function cursorPoint4(evt){
  pt4.x = evt.clientX; pt4.y = evt.clientY;
  return pt4.matrixTransform(svg4.getScreenCTM().inverse());
}

for(var i = 0; i < dots4.length; i++){
    dots4[i].style.fill = "rgba(255,255,255,1)"
}

var wave_attr4 = {
    size: 0,
    color: "rgba(255,255,255,1)"
}
var left4 = false
/* 
trigger4.addEventListener("pointerleave", (e)=>{
    left4 = true;
    var exit_point = [cursorPoint4(e).x, cursorPoint4(e).y]
    var anim = anime({
        targets: wave_attr4,
        size: 0,
        color: "rgba(255,255,255,1)",
        easing: "easeOutQuint",
        duration: 200,
        update: function(){
            if(!left4){
                anim.pause()
            }
            wave4.setAttribute("r", wave_attr4.size)
            for(var i = 0; i < dots4.length; i++){
                var dx = exit_point[0] - dots4[i].getAttribute("cx")
                var dy = exit_point[1] - dots4[i].getAttribute("cy")
                var d = (dx**2 + dy**2) ** (1/2)
                if (wave_attr4.size < d + 0.5){
                    var r_n = dots4[i].getAttribute("init_r")
                    if(dots4[i].getAttribute("mode") == "grow"){
                        anime({
                            targets: dots4[i],
                            r: r_n*1,
                        }) 
                    }
                    dots4[i].setAttribute("mode", "shrink")
                }
            } 
        }
    })
    //wave4.setAttribute("cx", e.clientX)
    //wave4.setAttribute("cy", e.clientY)
}) */

trigger4.addEventListener("pointerenter", (e)=>{{
    var force = mouse_speed['speed']
    console.log(clamp(force/200, 0.8, 2))
    for(var i = 0; i < dots4.length; i++){
        dots4[i].setAttribute("mode", "shrink")
    }
    wave_attr4 = {
        size: 0,
        color: "rgba(255,255,255,0.5)"
    }
    left4 = false;
    var enter_point = [cursorPoint4(e).x, cursorPoint4(e).y]
    try{
        anim_list[anim_list.length - 1].pause()
        anim_list=[]
    }catch(err){
        console.log("first")
    }
    //console.log(enter_point)
    var anim = anime({
        targets: wave_attr4,
        size: 170,
        easing: "easeOutQuint",
        duration: 3000,
        update: function(){
            if(left4){
                anim.pause()
            }
            wave4.setAttribute("r", wave_attr4.size)
            for(var i = 0; i < dots4.length; i++){
                var dx = enter_point[0] - dots4[i].getAttribute("cx")
                var dy = enter_point[1] - dots4[i].getAttribute("cy")
                var d = (dx**2 + dy**2) ** (1/2)
                if (wave_attr4.size > d - 0.5){
                    var r_n = dots4[i].getAttribute("init_r")
                    if(dots4[i].getAttribute("mode") == null || dots4[i].getAttribute("mode") == "shrink"){
                        anime({
                            targets: dots4[i],
                            keyframes:[
                                {r: r_n*r_n/3.4 * clamp(force/100, 0.75, 1.0), fill: "rgba(255,255,255,1)", delay:0},
                                {r: r_n, fill: "rgba(255,255,255,1)", delay:0},
                            ],  
                            easing: "linear",
                            delay: 0,
                            duration:500              
                        }) 
                    }
                    dots4[i].setAttribute("mode", "grow")
                }
            } 
        }
    })
    anim_list.push(anim)
    wave4.setAttribute("cx", enter_point[0])
    wave4.setAttribute("cy", enter_point[1])
}})

/* var is_mouse_down = false;

trigger4.addEventListener("pointerdown", (e)=>{{
    is_mouse_down = true
}})

trigger4.addEventListener("pointermove", (e)=>{{
    if(is_mouse_down){
        var enter_point = [cursorPoint4(e).x, cursorPoint4(e).y]
        wave4.setAttribute("r", 30)
        wave4.setAttribute("cx", enter_point[0])
        wave4.setAttribute("cy", enter_point[1])
        for(var i = 0; i < dots4.length; i++){
            var dx = enter_point[0] - dots4[i].getAttribute("cx")
            var dy = enter_point[1] - dots4[i].getAttribute("cy")
            var d = (dx**2 + dy**2) ** (1/2)
            if(dots4[i].id == "blue"){
                //console.log("ENTER: " + [Math.floor(enter_point[0]), Math.floor(enter_point[1])]  + " THAT DOT: " + [Math.floor(dots4[i].getAttribute("cx")), Math.floor(dots4[i].getAttribute("cy"))] + " size: " + wave_attr4.size)
            }
            if (wave_attr4.size > d - 0.5){
                var r_n = dots4[i].getAttribute("init_r")
                if(dots4[i].getAttribute("mode") == null || dots4[i].getAttribute("mode") == "shrink"){
                    anime({
                        targets: dots4[i],
                        keyframes:[
                            {r: r_n*r_n/15, fill: "rgba(255,255,255,1)", delay:0},
                            {r: r_n, fill: "rgba(255,255,255,1)", delay:0},
                        ],  
                        easing: "linear",
                        delay: 0,
                        duration:500              
                    }) 
                }
                dots4[i].setAttribute("mode", "grow")
            }
        } 
    }
}}) */


var anim_list = [] //my only way to reference animation, pause, and remove animation

trigger4.addEventListener("pointerdown", (e)=>{{
    is_mouse_down = false
    for(var i = 0; i < dots4.length; i++){
        dots4[i].setAttribute("mode", "shrink")
    }
    wave_attr4 = {
        size: 0,
        color: "rgba(255,255,255,0.5)"
    }
    left4 = false;
    var enter_point = [cursorPoint4(e).x, cursorPoint4(e).y]
    //console.log(can_click_again)
    try{
        anim_list[anim_list.length - 1].pause()
        anim_list=[]
    }catch(err){
        console.log("first")
    }
    var anim = anime({
        targets: wave_attr4,
        size: 170,
        easing: "linear",
        duration: 1000,
        update: function(){
            if(left4){
                anim.pause()
            }
            wave4.setAttribute("r", wave_attr4.size)
            for(var i = 0; i < dots4.length; i++){
                var dx = enter_point[0] - dots4[i].getAttribute("cx")
                var dy = enter_point[1] - dots4[i].getAttribute("cy")
                var d = (dx**2 + dy**2) ** (1/2)
                if(dots4[i].id == "blue"){
                    //console.log("ENTER: " + [Math.floor(enter_point[0]), Math.floor(enter_point[1])]  + " THAT DOT: " + [Math.floor(dots4[i].getAttribute("cx")), Math.floor(dots4[i].getAttribute("cy"))] + " size: " + wave_attr4.size)
                }
                if (wave_attr4.size > d - 0.5){
                    var r_n = dots4[i].getAttribute("init_r")
                    if(dots4[i].getAttribute("mode") == null || dots4[i].getAttribute("mode") == "shrink"){
                        anime({
                            targets: dots4[i],
                            keyframes:[
                                {r: r_n*r_n/15, fill: "rgba(255,255,255,1)", delay:0},
                                {r: r_n, fill: "rgba(255,255,255,1)", delay:0},
                            ],  
                            easing: "linear",
                            delay: 0,
                            duration:500              
                        }) 
                    }
                    dots4[i].setAttribute("mode", "grow")
                }
            } 
        }
    })
    anim_list.push(anim)
    wave4.setAttribute("cx", enter_point[0])
    wave4.setAttribute("cy", enter_point[1])
}})

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}