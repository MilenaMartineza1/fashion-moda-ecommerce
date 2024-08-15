let sliderInner = document.querySelector(".slider--Inner");

let index = 1;

setInterval(function(){
    let percentage = index * -100;
    sliderInner.style.transform =  "translateX("+ poncentage +"%)" index++;
},1000)
