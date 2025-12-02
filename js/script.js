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
            items: 2,
        },
        500: {
            items: 3,
        },
        768: {
            items: 4,
        },
        991: {
            items: 6,
        },
    },
});