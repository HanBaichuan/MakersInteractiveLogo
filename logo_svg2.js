var dots2 = document.getElementsByClassName("dot2")
var trigger2 = document.getElementById("trigger2")
var wave2 = document.getElementById("wave2")

// Find your root SVG element
var svg = document.getElementById('logo2');

// Create an SVGPoint for future math
var pt = svg.createSVGPoint();

// Get point in global SVG space
function cursorPoint(evt){
  pt.x = evt.clientX; pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

for(var i = 0; i < dots2.length; i++){
    dots2[i].style.fill = "rgba(255,255,255,0.5)"
}

var wave_attr2 = {
    size: 0,
    color: "rgba(255,255,255,0.5)"
}
var left2 = false

trigger2.addEventListener("pointerleave", (e)=>{
    left2 = true;
    var exit_point = [cursorPoint(e).x, cursorPoint(e).y]
    var anim = anime({
        targets: wave_attr2,
        size: 0,
        color: "rgba(255,255,255,1)",
        easing: "easeOutQuint",
        duration: 2000,
        update: function(){
            if(!left2){
                anim.pause()
            }
            wave2.setAttribute("r", wave_attr2.size)
            for(var i = 0; i < dots2.length; i++){
                var dx = exit_point[0] - dots2[i].getAttribute("cx")
                var dy = exit_point[1] - dots2[i].getAttribute("cy")
                var d = (dx**2 + dy**2) ** (1/2)
                if (wave_attr2.size < d + 0.5){
                    var r_n = dots2[i].getAttribute("init_r")
                    if(dots2[i].getAttribute("mode") == "grow"){
                        anime({
                            targets: dots2[i],
                            r: r_n*1,
                        }) 
                    }
                    dots2[i].setAttribute("mode", "shrink")
                }
            } 
        }
    })
    //wave2.setAttribute("cx", e.clientX)
    //wave2.setAttribute("cy", e.clientY)
})
trigger2.addEventListener("pointerenter", (e)=>{{
    left2 = false;
    var enter_point = [cursorPoint(e).x, cursorPoint(e).y]
    //console.log(enter_point)
    var anim = anime({
        targets: wave_attr2,
        size: 170,
        easing: "easeOutQuint",
        duration: 2000,
        update: function(){
            if(left2){
                anim.pause()
            }
            wave2.setAttribute("r", wave_attr2.size)
            for(var i = 0; i < dots2.length; i++){
                var dx = enter_point[0] - dots2[i].getAttribute("cx")
                var dy = enter_point[1] - dots2[i].getAttribute("cy")
                var d = (dx**2 + dy**2) ** (1/2)
                if (wave_attr2.size > d - 0.5){
                    var r_n = dots2[i].getAttribute("init_r")
                    if(dots2[i].getAttribute("mode") == null || dots2[i].getAttribute("mode") == "shrink"){
                        anime({
                            targets: dots2[i],
                            r: r_n*r_n/3.4,
                        }) 
                    }
                    dots2[i].setAttribute("mode", "grow")
                }
            } 
        }
    })
    wave2.setAttribute("cx", enter_point[0])
    wave2.setAttribute("cy", enter_point[1])
}})