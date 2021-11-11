var dots3 = document.getElementsByClassName("dot3")

var dot3_attr = {
    size: 0.5,
    transparency: 1
}

anime({
    targets: dot3_attr,
    size: 6,
    transparency: 1,
    duration: 3000,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine',
    update: function(){
        for(var i = 0; i < dots3.length; i++){
            var current_size = Math.min(dots3[i].getAttribute('init_r'), dot3_attr.size);
            dots3[i].setAttribute('r', current_size)
            dots3[i].style.fill =  "rgba(255,255,255," + dot3_attr.transparency + ")"
        }
    }
})