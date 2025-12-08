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