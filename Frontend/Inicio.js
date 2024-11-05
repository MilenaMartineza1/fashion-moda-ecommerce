const modal = document.getElementById("loginModal");
const openModalBtn = document.getElementById("openModal");
const closeModal = document.querySelector(".close");
const confirmLoginBtn = document.getElementById("confirmLogin");
const cancelLoginBtn = document.getElementById("cancelLogin");

openModalBtn.addEventListener("click", function(event) {
    event.preventDefault(); 
    modal.style.display = "block";
});

closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

confirmLoginBtn.addEventListener("click", function() {
    window.location.href = "loginmayorista.html"; 
});

cancelLoginBtn.addEventListener("click", function() {
    modal.style.display = "none";
});


const dots = document.querySelectorAll('.dot-slider'); 
const sliderInner = document.querySelector('.slider--inner');

dots.forEach((dot, index) => {
    dot.addEventListener('mouseover', () => {
        sliderInner.style.transform = `translateX(${-index * 33.33}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        dot.classList.add('active');
    });
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slidesPerView = 4;

function showSlides(n) {
    const sliderInner = document.querySelector('.slider--inner-uno');
    currentSlide = (n + totalSlides) % totalSlides;
    sliderInner.style.transform = `translateX(-${(currentSlide / slidesPerView) * 100}%)`;
}

document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => showSlides(index * slidesPerView));
});



document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Mover el slider al índice correspondiente
            slider.style.transform = `translateX(-${index * 100}%)`;

            // Actualizar la clase "active" en los dots
            dots.forEach(dot => dot.classList.remove('active'));
            dot.classList.add('active');
        });
    });
});
