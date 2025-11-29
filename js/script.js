(function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('mobileMenuClose');
    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-menu__link') : [];
    const header = document.querySelector('header');
    const header_wrapper = document.querySelector('.header');
    const body = document.body;

    if (!burgerBtn || !mobileMenu) return;

    function openMenu() {
        header.classList.add('opened-menu');
        header_wrapper.classList.add('opened-menu');
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        burgerBtn.setAttribute('aria-expanded', 'true');
        burgerBtn.classList.add('active');
        body.classList.add('no-scroll');
        closeBtn.focus();
    }

    function closeMenu() {
        header.classList.remove('opened-menu');
        header_wrapper.classList.remove('opened-menu');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        burgerBtn.setAttribute('aria-expanded', 'false');
        burgerBtn.classList.remove('active');
        body.classList.remove('no-scroll');
        burgerBtn.focus();
    }

    burgerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (burgerBtn.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) closeMenu();
    });

})();