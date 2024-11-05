function currentSlide(element) {
    if (element.classList.contains('active')) {
        element.classList.remove('active');
    } else {
        var colors = document.querySelectorAll('.colors span');
        colors.forEach(function(color) {
            color.classList.remove('active');
        });
        element.classList.add('active');
    }
}


