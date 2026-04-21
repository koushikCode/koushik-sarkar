$(document).ready(function () {
    const $window = $(window);
    const $navbar = $('.navbar');
    const $scrollUpBtn = $('.scroll-up-btn');
    const $menu = $('.navbar .menu');
    const $menuToggle = $('.menu-toggle');
    const $menuIcon = $('.menu-toggle i');
    const $navLinks = $('.navbar .menu li a');
    const sections = $('section[id]');

    function handleScrollState() {
        const scrollY = window.scrollY;

        if (scrollY > 40) {
            $navbar.addClass('sticky');
        } else {
            $navbar.removeClass('sticky');
        }

        if (scrollY > 520) {
            $scrollUpBtn.addClass('show');
        } else {
            $scrollUpBtn.removeClass('show');
        }

        let currentSectionId = '';

        sections.each(function () {
            const sectionTop = $(this).offset().top - 160;
            const sectionHeight = $(this).outerHeight();

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = $(this).attr('id');
            }
        });

        if (currentSectionId) {
            $navLinks.removeClass('active');
            $navLinks.each(function () {
                if ($(this).attr('href') === `#${currentSectionId}`) {
                    $(this).addClass('active');
                }
            });
        }
    }

    function closeMenu() {
        $menu.removeClass('active');
        $menuToggle.attr('aria-expanded', 'false');
        $menuIcon.removeClass('active').removeClass('fa-times').addClass('fa-bars');
    }

    $window.on('scroll', handleScrollState);
    handleScrollState();

    $scrollUpBtn.on('click keypress', function (event) {
        if (event.type === 'keypress' && event.which !== 13) {
            return;
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    $menuToggle.on('click keypress', function (event) {
        if (event.type === 'keypress' && event.which !== 13) {
            return;
        }

        $menu.toggleClass('active');
        $menuToggle.attr('aria-expanded', $menu.hasClass('active') ? 'true' : 'false');
        $menuIcon.toggleClass('fa-times');
        $menuIcon.toggleClass('fa-bars');
    });

    $navLinks.on('click', function () {
        closeMenu();
    });

    $(document).on('keydown', function (event) {
        if (event.key === 'Escape' && $menu.hasClass('active')) {
            closeMenu();
        }
    });

    const typingStrings = ['an ETL Developer', 'a Data Engineer', 'a Programmer'];

    new Typed('.typing', {
        strings: typingStrings,
        typeSpeed: 65,
        backSpeed: 38,
        backDelay: 1200,
        loop: true
    });

    new Typed('.typing-2', {
        strings: typingStrings,
        typeSpeed: 65,
        backSpeed: 38,
        backDelay: 1200,
        loop: true
    });

    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2600,
        autoplayHoverPause: true,
        smartSpeed: 900,
        dotsEach: false,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            700: {
                items: 2,
                nav: false
            },
            1100: {
                items: 3,
                nav: false
            }
        }
    });

    const revealItems = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.18,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
