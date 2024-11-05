let currentSlideIndex = 0;

function moveSlider(direction) {
    const slider = document.querySelector('.slider');
    const totalSlides = document.querySelectorAll('.project-slide').length;
    const slideWidth = document.querySelector('.project-slide').offsetWidth + 30; // +30 for margin

    currentSlideIndex += direction;

    if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    } else if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    }

    slider.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
}
