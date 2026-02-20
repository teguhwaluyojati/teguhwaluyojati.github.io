/*!
* Start Bootstrap - Stylish Portfolio v6.0.5 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    const menuToggle = document.body.querySelector('.menu-toggle');
    if (menuToggle && sidebarWrapper) {
        menuToggle.addEventListener('click', event => {
            event.preventDefault();
            sidebarWrapper.classList.toggle('active');
            _toggleMenuIcon();
            menuToggle.classList.toggle('active');
        })
    }

    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            if (sidebarWrapper && menuToggle) {
                sidebarWrapper.classList.remove('active');
                menuToggle.classList.remove('active');
                _toggleMenuIcon();
            }
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (!scrollToTop) return;
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })

    const themeToggle = document.getElementById('themeToggle');
    const storedTheme = localStorage.getItem('theme');
    const root = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'dark') {
            root.classList.add('theme-dark');
            if (themeToggle) themeToggle.textContent = '☀️ Light';
        } else {
            root.classList.remove('theme-dark');
            if (themeToggle) themeToggle.textContent = '🌙 Dark';
        }
    }

    applyTheme(storedTheme === 'dark' ? 'dark' : 'light');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = root.classList.contains('theme-dark');
            const nextTheme = isDark ? 'light' : 'dark';
            localStorage.setItem('theme', nextTheme);
            applyTheme(nextTheme);
        });
    }

    const filterButtons = document.querySelectorAll('[data-filter]');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (filterButtons.length > 0 && portfolioCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selected = button.getAttribute('data-filter');

                filterButtons.forEach(item => item.classList.remove('active'));
                button.classList.add('active');

                portfolioCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    const shouldShow = selected === 'all' || selected === category;
                    card.style.display = shouldShow ? '' : 'none';
                });
            });
        });
    }

    const revealItems = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window && revealItems.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add('is-visible'));
    }
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};
