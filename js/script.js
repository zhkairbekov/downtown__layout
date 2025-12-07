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

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".advantages__content__left-side a");
    const slides = document.querySelectorAll(".adv-slide");
    const bar = document.getElementById("advantages__content__bar");

    if (!slides.length || !buttons.length || !bar) return;

    const total = slides.length;

    // markup: числа + линия прогресса
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
    const AUTO_DELAY = 10000; // 10s

    function updateBarVisual(animate = true) {
        // число
        const curEl = bar.querySelector(".adv-bar__current");
        if (curEl) curEl.textContent = (current + 1).toString();

        // ширина полоски: (current+1) / total
        const percent = Math.round(((current + 1) / total) * 100);
        if (!fillEl) return;

        if (animate) {
            fillEl.classList.add("buzz");
            // убрать эффект через 300ms
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

    // click handlers
    buttons.forEach((btn, i) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            setActive(i, true);
        });
    });

    // init
    updateBarVisual(false);
    setActive(0);
    resetAuto();

    // Если слайды будут переключаться внешним кодом — синхронизируемся
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