$('.partners-carousel__slider').owlCarousel({
    items: 5.5,
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

$('.reviews__slider').owlCarousel({
    center: true,
    loop: false,
    dots: false,
    nav: true,
    navText: [
        '<span class="custom-prev"><img src="img/icons/arrow-left.png" alt="prev"></span>',
        '<span class="custom-next"><img src="img/icons/arrow-right.png" alt="next"></span>'
    ],
    mouseDrag: true,
    touchDrag: true,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1.4,
            margin: 20,
        },
        992: {
            items: 2.4,
            margin: 20,
        },
    },
});

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".advantages__content__left-side a");
    const slides = document.querySelectorAll(".adv-slide");
    const bar = document.getElementById("advantages__content__bar");

    if (!slides.length || !buttons.length || !bar) return;

    const total = slides.length;

    bar.innerHTML = `
    <div class="adv-bar__container">
      <div class="adv-bar__wrap">
        <span class="adv-bar__current">1</span>
        <span class="adv-bar__slash">/</span>
        <span class="adv-bar__total">${total}</span>
      </div>
      <div class="adv-bar__line" aria-hidden="true">
        <div class="adv-bar__line-fill"></div>
      </div>
    </div>
  `;

    const fillEl = bar.querySelector(".adv-bar__line-fill");
    let current = 0;
    let autoTimer = null;
    const AUTO_DELAY = 10000;

    function updateBarVisual(animate = true) {
        const curEl = bar.querySelector(".adv-bar__current");
        if (curEl) curEl.textContent = (current + 1).toString();

        const percent = Math.round(((current + 1) / total) * 100);
        if (!fillEl) return;

        if (animate) {
            fillEl.classList.add("buzz");
            clearTimeout(fillEl._buzzTO);
            fillEl._buzzTO = setTimeout(() => fillEl.classList.remove("buzz"), 300);
        }
        fillEl.style.width = percent + "%";
    }

    function setActive(index, userInitiated = false) {
        index = ((index % total) + total) % total;
        if (index === current && !userInitiated) return;

        slides.forEach((s, i) => s.classList.toggle("active", i === index));
        buttons.forEach((b, i) => b.classList.toggle("active", i === index));

        current = index;
        updateBarVisual(true);
        resetAuto();
    }

    function nextSlide() {
        setActive(current + 1);
    }

    function resetAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(nextSlide, AUTO_DELAY);
    }

    buttons.forEach((btn, i) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            setActive(i, true);
        });
    });

    updateBarVisual(false);
    setActive(0);
    resetAuto();

    const obs = new MutationObserver(mutations => {
        for (const m of mutations) {
            if (m.type === "attributes" && m.attributeName === "class") {
                const target = m.target;
                if (target.classList && target.classList.contains("active")) {
                    const idx = Array.prototype.indexOf.call(slides, target);
                    if (idx !== -1 && idx !== current) {
                        current = idx;
                        buttons.forEach((b, i) => b.classList.toggle("active", i === current));
                        updateBarVisual(true);
                        resetAuto();
                    }
                }
            }
        }
    });

    slides.forEach(s => obs.observe(s, { attributes: true }));
});

document.addEventListener("DOMContentLoaded", () => {
    const leftLinks = document.querySelectorAll(".obj__left-side__free a");
    const confLink = document.querySelector(".obj__left-side__conf a");
    const slides = document.querySelectorAll(".obj-slide");
    const arrows = document.querySelectorAll(".obj-slider__arrows a");

    if (!slides.length) return;

    let current = 0;
    let autoTimer = null;
    const AUTO_DELAY = 10000;

    function updateArrows(direction) {
        arrows.forEach(arrow => arrow.classList.remove("active"));

        if (direction === "forward") {
            arrows[1].classList.add("active");
        } else if (direction === "backward") {
            arrows[0].classList.add("active");
        }
    }

    function setActive(index, userInitiated = false, direction = null) {
        index = ((index % slides.length) + slides.length) % slides.length;

        if (index === current && !userInitiated) return;

        slides[current].classList.remove("active");
        slides[index].classList.add("active");

        leftLinks.forEach((link, i) => {
            link.classList.toggle("active", i === index);
        });

        if (confLink) {
            confLink.classList.toggle("active", index === slides.length - 1);
        }

        current = index;

        if (direction) {
            updateArrows(direction);
        }

        resetAuto();
    }

    function nextSlide() {
        setActive(current + 1, false, "forward");
    }

    function prevSlide() {
        setActive(current - 1, false, "backward");
    }

    function resetAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(nextSlide, AUTO_DELAY);
    }

    leftLinks.forEach((link, i) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            setActive(i, true);
        });
    });

    if (confLink) {
        confLink.addEventListener("click", (e) => {
            e.preventDefault();
            setActive(slides.length - 1, true);
        });
    }

    if (arrows.length >= 2) {
        arrows[0].addEventListener("click", (e) => {
            e.preventDefault();
            prevSlide();
        });

        arrows[1].addEventListener("click", (e) => {
            e.preventDefault();
            nextSlide();
        });
    }

    setActive(0);
    updateArrows("forward");
    resetAuto();

    const sliderContainer = document.querySelector(".obj-slider");
    if (sliderContainer) {
        sliderContainer.addEventListener("mouseenter", () => {
            clearInterval(autoTimer);
        });

        sliderContainer.addEventListener("mouseleave", () => {
            resetAuto();
        });
    }
});

document.addEventListener('click', function (e) {
    const card = e.target.closest('.flip-card');
    if (card) {
        card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', card.classList.contains('is-flipped') ? 'true' : 'false');
        return;
    }

    document.querySelectorAll('.flip-card.is-flipped').forEach(c => {
        c.classList.remove('is-flipped');
        c.setAttribute('aria-pressed', 'false');
    });
});

document.addEventListener('keydown', function (e) {
    if (e.code === 'Enter' || e.code === 'Space') {
        const active = document.activeElement;
        if (active && active.classList && active.classList.contains('flip-card')) {
            e.preventDefault();
            active.classList.toggle('is-flipped');
            active.setAttribute('aria-pressed', active.classList.contains('is-flipped') ? 'true' : 'false');
        }
    }

    if (e.code === 'Escape') {
        document.querySelectorAll('.flip-card.is-flipped').forEach(c => {
            c.classList.remove('is-flipped');
            c.setAttribute('aria-pressed', 'false');
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".faq_accordeon__item");

    items.forEach(item => {
        const btn = item.querySelector(".faq_accordeon__item__question");

        btn.addEventListener("click", () => {
            // Если нужен аккордеон в режиме "только один открыт":
            items.forEach(i => {
                if (i !== item) i.classList.remove("active");
            });

            item.classList.toggle("active");
        });
    });
});


const slides = Array.from(document.querySelectorAll('.slide'));
const buttons = document.querySelectorAll('.gallery__btn');
let activeIndex = 0;

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('is-active', 'is-prev', 'is-next', 'is-next-2', 'is-next-3');

        // Вычисляем разницу с учетом зацикливания
        let diff = index - activeIndex;

        // Обрабатываем зацикливание
        if (diff > slides.length / 2) {
            diff -= slides.length;
        } else if (diff < -slides.length / 2) {
            diff += slides.length;
        }

        if (diff === 0) {
            slide.classList.add('is-active');
        } else if (diff === -1) {
            slide.classList.add('is-prev');
        } else if (diff === 1) {
            slide.classList.add('is-next');
        } else if (diff === 2) {
            slide.classList.add('is-next-2');
        } else if (diff === 3 || diff === -3) {
            slide.classList.add('is-next-3');
        }
    });
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const dir = btn.dataset.dir;

        if (dir === 'next') {
            activeIndex = (activeIndex + 1) % slides.length;
        } else if (dir === 'prev') {
            activeIndex = (activeIndex - 1 + slides.length) % slides.length;
        }

        updateSlides();
    });
});

// Инициализация
updateSlides();

// Поддержка свайпов на мобильных
let touchStartX = 0;
let touchEndX = 0;

const track = document.querySelector('.gallery__track');

track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        activeIndex = (activeIndex + 1) % slides.length;
        updateSlides();
    }
    if (touchEndX > touchStartX + 50) {
        activeIndex = (activeIndex - 1 + slides.length) % slides.length;
        updateSlides();
    }
}