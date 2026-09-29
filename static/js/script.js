/* =========================================================
   YATRANEST - DJANGO COMPATIBLE JAVASCRIPT
   Global site interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GLOBAL ELEMENTS
    ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const navMenu =
        document.getElementById("navMenu");

    /*
     * IMPORTANT:
     * base.html uses:
     *
     * <div class="nav-dropdown">
     *
     * It does NOT use:
     * id="transportDropdown"
     */
    const transportDropdown =
        document.querySelector(".nav-dropdown");

    const transportButton =
        document.getElementById("transportDropdownBtn");

    const transportMenu =
        document.getElementById("transportDropdownMenu");

    const searchBtn =
        document.getElementById("navSearchBtn");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const searchInput =
        document.getElementById("globalSearchInput");

    const pageProgress =
        document.getElementById("pageProgress");

    /*
     * base.html uses:
     *
     * <header class="navbar">
     *
     * not id="siteHeader"
     */
    const siteHeader =
        document.querySelector(".navbar");

    const hero =
        document.querySelector(".hero");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMobileMenu() {

        if (!navMenu || !menuBtn) {
            return;
        }

        navMenu.classList.remove("show");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "mobile-menu-open"
        );

        const icon =
            menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

        closeTransportDropdown();

    }


    function openMobileMenu() {

        if (!navMenu || !menuBtn) {
            return;
        }

        navMenu.classList.add("show");

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "mobile-menu-open"
        );

        const icon =
            menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        }

    }


    if (menuBtn && navMenu) {

        menuBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    navMenu.classList.contains("show");

                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );


        navMenu
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        if (window.innerWidth <= 1000) {

                            closeMobileMenu();

                        }

                    }
                );

            });

    }


    /* =====================================================
       TRANSPORT DROPDOWN
    ===================================================== */

    function closeTransportDropdown() {

        if (!transportDropdown) {
            return;
        }

        transportDropdown.classList.remove(
            "active"
        );

        if (transportButton) {

            transportButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        if (transportMenu) {

            transportMenu.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    }


    function openTransportDropdown() {

        if (!transportDropdown) {
            return;
        }

        transportDropdown.classList.add(
            "active"
        );

        if (transportButton) {

            transportButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }

        if (transportMenu) {

            transportMenu.setAttribute(
                "aria-hidden",
                "false"
            );

        }

    }


    if (
        transportDropdown &&
        transportButton
    ) {

        transportButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    transportDropdown.classList.contains(
                        "active"
                    );

                if (isOpen) {

                    closeTransportDropdown();

                } else {

                    openTransportDropdown();

                }

            }
        );


        transportDropdown
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeTransportDropdown();

                        if (window.innerWidth <= 1000) {

                            closeMobileMenu();

                        }

                    }
                );

            });

    }


    /*
     * Close Transport dropdown when clicking outside.
     */
    document.addEventListener(
        "click",
        function (event) {

            if (
                transportDropdown &&
                !transportDropdown.contains(event.target)
            ) {

                closeTransportDropdown();

            }

        }
    );


    /* =====================================================
       SEARCH OVERLAY
    ===================================================== */

    function openSearch() {

        if (!searchOverlay) {
            return;
        }

        closeTransportDropdown();

        if (window.innerWidth <= 1000) {

            closeMobileMenu();

        }

        searchOverlay.hidden = false;

        document.body.classList.add(
            "search-open"
        );

        requestAnimationFrame(function () {

            searchOverlay.classList.add(
                "is-open"
            );

        });

        if (searchBtn) {

            searchBtn.setAttribute(
                "aria-expanded",
                "true"
            );

        }

        if (searchInput) {

            setTimeout(function () {

                searchInput.focus();

            }, 120);

        }

    }


    function closeSearch() {

        if (!searchOverlay) {
            return;
        }

        searchOverlay.classList.remove(
            "is-open"
        );

        document.body.classList.remove(
            "search-open"
        );

        if (searchBtn) {

            searchBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        setTimeout(function () {

            if (
                !searchOverlay.classList.contains(
                    "is-open"
                )
            ) {

                searchOverlay.hidden = true;

            }

        }, 250);

    }


    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    searchOverlay &&
                    searchOverlay.classList.contains(
                        "is-open"
                    );

                if (isOpen) {

                    closeSearch();

                } else {

                    openSearch();

                }

            }
        );

    }


    if (searchOverlay) {

        searchOverlay
            .querySelectorAll(
                "[data-close-search]"
            )
            .forEach(function (element) {

                element.addEventListener(
                    "click",
                    closeSearch
                );

            });

    }


    /* =====================================================
       HERO SLIDER
    ===================================================== */

    const slides =
        document.querySelectorAll(".slide");

    const currentSlide =
        document.getElementById("currentSlide");

    const nextButton =
        document.getElementById("nextSlide");

    const previousButton =
        document.getElementById("prevSlide");

    let slideIndex = 0;
    let sliderTimer = null;


    function updateSlideCounter() {

        if (
            !currentSlide ||
            !slides.length
        ) {
            return;
        }

        currentSlide.textContent =
            String(slideIndex + 1).padStart(2, "0");

    }


    function showSlide(index) {

        if (!slides.length) {
            return;
        }

        slides.forEach(function (slide) {

            slide.classList.remove(
                "active"
            );

        });

        slides[index].classList.add(
            "active"
        );

        updateSlideCounter();

    }


    function nextSlide() {

        if (!slides.length) {
            return;
        }

        slideIndex++;

        if (
            slideIndex >=
            slides.length
        ) {

            slideIndex = 0;

        }

        showSlide(slideIndex);

    }


    function previousSlide() {

        if (!slides.length) {
            return;
        }

        slideIndex--;

        if (slideIndex < 0) {

            slideIndex =
                slides.length - 1;

        }

        showSlide(slideIndex);

    }


    function startSlider(interval = 4000) {

        if (!slides.length) {
            return;
        }

        clearInterval(sliderTimer);

        sliderTimer =
            setInterval(
                nextSlide,
                interval
            );

    }


    if (slides.length) {

        showSlide(slideIndex);

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    nextSlide();
                    startSlider(4000);

                }
            );

        }


        if (previousButton) {

            previousButton.addEventListener(
                "click",
                function () {

                    previousSlide();
                    startSlider(4000);

                }
            );

        }


        startSlider(4000);


        if (hero) {

            hero.addEventListener(
                "mouseenter",
                function () {

                    clearInterval(
                        sliderTimer
                    );

                }
            );


            hero.addEventListener(
                "mouseleave",
                function () {

                    startSlider(6000);

                }
            );

        }

    }


    /* =====================================================
       FAVORITE / HEART BUTTONS
    ===================================================== */

    const hearts =
        document.querySelectorAll(".heart");


    hearts.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                button.classList.toggle(
                    "liked"
                );

                const icon =
                    button.querySelector("i");

                if (!icon) {
                    return;
                }

                const liked =
                    button.classList.contains(
                        "liked"
                    );

                icon.classList.toggle(
                    "fa-regular",
                    !liked
                );

                icon.classList.toggle(
                    "fa-solid",
                    liked
                );

                button.setAttribute(
                    "aria-pressed",
                    liked
                        ? "true"
                        : "false"
                );


                if (
                    typeof window.showToast ===
                    "function"
                ) {

                    window.showToast(
                        liked
                            ? "Added to your favorites ❤️"
                            : "Removed from favorites"
                    );

                }

            }
        );

    });


    /* =====================================================
       VIDEO MODAL
    ===================================================== */

    const playVideo =
        document.getElementById("playVideo");

    const videoModal =
        document.getElementById("videoModal");

    const closeModal =
        document.getElementById("closeModal");


    function openVideoModal() {

        if (!videoModal) {
            return;
        }

        videoModal.classList.add(
            "show"
        );

        videoModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "video-modal-open"
        );

    }


    function closeVideoModal() {

        if (!videoModal) {
            return;
        }

        videoModal.classList.remove(
            "show"
        );

        videoModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "video-modal-open"
        );

    }


    if (
        playVideo &&
        videoModal
    ) {

        playVideo.addEventListener(
            "click",
            openVideoModal
        );

    }


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeVideoModal
        );

    }


    if (videoModal) {

        videoModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    videoModal
                ) {

                    closeVideoModal();

                }

            }
        );

    }


    /* =====================================================
       HERO SEARCH
    ===================================================== */

    const heroSearch =
        document.getElementById("searchBtn");


    if (heroSearch) {

        heroSearch.addEventListener(
            "click",
            function (event) {

                const form =
                    heroSearch.closest("form");

                if (form) {
                    return;
                }

                event.preventDefault();

            }
        );

    }


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const subscribeForm =
        document.getElementById(
            "subscribeForm"
        );


    if (subscribeForm) {

        subscribeForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const input =
                    subscribeForm.querySelector(
                        "input[type='email']"
                    );

                if (!input) {
                    return;
                }

                const email =
                    input.value.trim();


                if (!email) {

                    if (
                        typeof window.showToast ===
                        "function"
                    ) {

                        window.showToast(
                            "Please enter your email address."
                        );

                    }

                    input.focus();

                    return;

                }


                if (!input.checkValidity()) {

                    if (
                        typeof window.showToast ===
                        "function"
                    ) {

                        window.showToast(
                            "Please enter a valid email address."
                        );

                    }

                    input.focus();

                    return;

                }


                if (
                    typeof window.showToast ===
                    "function"
                ) {

                    window.showToast(
                        "You're subscribed! Welcome to YatraNest ✈️"
                    );

                }


                subscribeForm.reset();

            }
        );

    }


    /* =====================================================
       TOAST SYSTEM
    ===================================================== */

    const toast =
        document.getElementById("toast");

    const toastText =
        toast
            ? toast.querySelector("span")
            : null;

    let toastTimer = null;


    window.showToast =
        function (message) {

            if (
                !toast ||
                !toastText
            ) {
                return;
            }

            toastText.textContent =
                message;

            toast.classList.add(
                "show"
            );

            clearTimeout(
                toastTimer
            );

            toastTimer =
                setTimeout(
                    function () {

                        toast.classList.remove(
                            "show"
                        );

                    },
                    3000
                );

        };


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".feature-box, .package-card, .destination-card, .section-heading"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";

                                entry.target.style.transform =
                                    "translateY(0)";

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                element.style.opacity =
                    "0";

                element.style.transform =
                    "translateY(30px)";

                element.style.transition =
                    "opacity .7s ease, transform .7s ease";

                revealObserver.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       NAVBAR ACTIVE LINK
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            "#navMenu > a[data-nav-link]"
        );


    function normalizePath(path) {

        if (!path) {
            return "/";
        }

        if (
            path.length > 1 &&
            path.endsWith("/")
        ) {

            return path.slice(0, -1);

        }

        return path;

    }


    function updateActiveNavigation() {

        if (!navLinks.length) {
            return;
        }

        const currentPath =
            normalizePath(
                window.location.pathname
            );


        navLinks.forEach(function (link) {

            link.classList.remove(
                "active"
            );

            const href =
                link.getAttribute("href");

            if (!href) {
                return;
            }


            if (
                href.startsWith("#")
            ) {
                return;
            }


            let linkURL;

            try {

                linkURL =
                    new URL(
                        href,
                        window.location.origin
                    );

            } catch (error) {

                return;

            }


            const linkPath =
                normalizePath(
                    linkURL.pathname
                );


            if (
                linkPath ===
                currentPath
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    updateActiveNavigation();


    /* =====================================================
       NAVBAR + SCROLL PROGRESS
    ===================================================== */

    function updateScrollUI() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const percentage =
            documentHeight > 0
                ? (
                    scrollTop /
                    documentHeight
                ) * 100
                : 0;


        if (pageProgress) {

            pageProgress.style.width =
                percentage + "%";

        }


        if (siteHeader) {

            siteHeader.classList.toggle(
                "scrolled",
                scrollTop > 15
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateScrollUI,
        {
            passive: true
        }
    );

    updateScrollUI();


    /* =====================================================
       PARALLAX SUNLIGHT
    ===================================================== */

    const sun =
        document.querySelector(
            ".sun-glow"
        );


    if (sun) {

        window.addEventListener(
            "mousemove",
            function (event) {

                const x =
                    (
                        event.clientX /
                        window.innerWidth -
                        0.5
                    ) * 25;


                const y =
                    (
                        event.clientY /
                        window.innerHeight -
                        0.5
                    ) * 25;


                sun.style.transform =
                    `translate(${x}px, ${y}px)`;

            }
        );

    }


    /* =====================================================
       TOUCH SWIPE
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    if (
        hero &&
        slides.length
    ) {

        hero.addEventListener(
            "touchstart",
            function (event) {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        hero.addEventListener(
            "touchend",
            function (event) {

                touchEndX =
                    event.changedTouches[0]
                        .screenX;


                const distance =
                    touchStartX -
                    touchEndX;


                if (
                    Math.abs(distance) < 50
                ) {
                    return;
                }


                if (distance > 0) {

                    nextSlide();

                } else {

                    previousSlide();

                }


                startSlider(4000);

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       DJANGO MESSAGES AUTO HIDE
    ===================================================== */

    const djangoMessages =
        document.querySelectorAll(
            ".django-messages .message"
        );


    djangoMessages.forEach(
        function (message) {

            setTimeout(
                function () {

                    message.style.opacity =
                        "0";

                    message.style.transform =
                        "translateX(20px)";

                    message.style.transition =
                        "all .4s ease";


                    setTimeout(
                        function () {

                            if (
                                message.parentNode
                            ) {

                                message.remove();

                            }

                        },
                        400
                    );

                },
                5000
            );

        }
    );


    /* =====================================================
       DJANGO BOOKING BUTTONS
    ===================================================== */

    const bookingButtons =
        document.querySelectorAll(
            "[data-booking-url]"
        );


    bookingButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const bookingUrl =
                        button.dataset.bookingUrl;


                    if (!bookingUrl) {
                        return;
                    }


                    window.location.href =
                        bookingUrl;

                }
            );

        }
    );


    /* =====================================================
       DJANGO DESTINATION BUTTONS
    ===================================================== */

    const destinationButtons =
        document.querySelectorAll(
            "[data-destination-url]"
        );


    destinationButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const destinationUrl =
                        button.dataset.destinationUrl;


                    if (!destinationUrl) {
                        return;
                    }


                    window.location.href =
                        destinationUrl;

                }
            );

        }
    );


    /* =====================================================
       DJANGO HOTEL BUTTONS
    ===================================================== */

    const hotelButtons =
        document.querySelectorAll(
            "[data-hotel-url]"
        );


    hotelButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const hotelUrl =
                        button.dataset.hotelUrl;


                    if (!hotelUrl) {
                        return;
                    }


                    window.location.href =
                        hotelUrl;

                }
            );

        }
    );


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Escape"
            ) {
                return;
            }

            closeSearch();

            closeTransportDropdown();

            closeMobileMenu();

            closeVideoModal();

        }
    );


    /* =====================================================
       WINDOW RESIZE SAFETY
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 1000
            ) {

                closeMobileMenu();

                closeTransportDropdown();

            }

        }
    );

});