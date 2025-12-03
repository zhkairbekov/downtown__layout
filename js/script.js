// Partners Carousel Initialization

$('.partners-carousel__slider').owlCarousel({
    items: 6,
    margin: 121,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 800,
    dots: false,
    nav: false,
    mouseDrag: true,
    touchDrag: true,
    responsive: {
        0: {
            items: 1,
        },
        350: {
            items: 2,
            margin: 24,
        },
        600: {
            items: 3,
            margin: 24,
        },
        768: {
            items: 4,
            margin: 40,
        },
        991: {
            items: 6,
        },
    },
});

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".advantages__content__left-side a");
    const slides = document.querySelectorAll(".slide");

    let currentIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
        if (index === currentIndex) return;

        slides[currentIndex].classList.remove("active");
        slides[index].classList.add("active");

        buttons[currentIndex].classList.remove("active");
        buttons[index].classList.add("active");

        currentIndex = index;
    }

    buttons.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            showSlide(index);
            resetAutoSlide();
        });
    });

    function autoSlide() {
        let nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlide, 10000);
    }

    showSlide(0);
    resetAutoSlide();
});

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".advantages__content__left-side a");
    const slides = document.querySelectorAll(".adv-slide");

    let current = 0;
    let autoSlide;

    function goToSlide(index) {
        slides.forEach(s => s.classList.remove("active"));
        buttons.forEach(b => b.classList.remove("active"));

        slides[index].classList.add("active");
        buttons[index].classList.add("active");

        current = index;
        resetTimer();
    }

    function nextSlide() {
        let next = current + 1 >= slides.length ? 0 : current + 1;
        goToSlide(next);
    }

    function resetTimer() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 10000);
    }

    // Clicks
    buttons.forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            goToSlide(Number(btn.dataset.slide));
        });
    });

    // Start autoplay
    resetTimer();
});