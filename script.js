
/* ==================================================
   MUHAMMAD SYAHMI
   PERSONAL PORTFOLIO WEBSITE
   JAVASCRIPT FILE
================================================== */


/* ==================================================
   1. DARK MODE / LIGHT MODE
================================================== */

const themeToggle = document.querySelector('.theme-toggle');

const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

function updateThemeIcon() {

    if (!themeToggle) return;

    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀';
    } else {
        themeToggle.textContent = '☾';
    }

}

updateThemeIcon();

if (themeToggle) {

    themeToggle.addEventListener('click', function () {

        document.body.classList.toggle('dark-mode');

        const currentTheme =
            document.body.classList.contains('dark-mode')
                ? 'dark'
                : 'light';

        localStorage.setItem('portfolio-theme', currentTheme);

        updateThemeIcon();

    });

}


/* ==================================================
   2. MOBILE NAVIGATION MENU
================================================== */

const menuToggle = document.querySelector('.menu-toggle');

const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {

    menuToggle.addEventListener('click', function () {

        navMenu.classList.toggle('active');

        const isOpen = navMenu.classList.contains('active');

        menuToggle.setAttribute('aria-expanded', isOpen);

        menuToggle.textContent = isOpen ? '✕' : '☰';

    });

    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {

        link.addEventListener('click', function () {

            navMenu.classList.remove('active');

            menuToggle.textContent = '☰';

            menuToggle.setAttribute('aria-expanded', 'false');

        });

    });

}


/* ==================================================
   3. ACTIVE NAVIGATION LINK
================================================== */

const sections = document.querySelectorAll('main section');

const navigationLinks = document.querySelectorAll('.nav-link');

if ('IntersectionObserver' in window) {

    const navObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                const sectionId = entry.target.id;

                navigationLinks.forEach(function (link) {

                    link.classList.remove('active');

                    if (link.getAttribute('href') === '#' + sectionId) {

                        link.classList.add('active');

                    }

                });

            }

        });

    }, {
        threshold: 0.3
    });

    sections.forEach(function (section) {

        navObserver.observe(section);

    });

}


/* ==================================================
   4. PROJECT CATEGORY FILTER
================================================== */

const filterButtons = document.querySelectorAll('.filter-btn');

const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(function (button) {

    button.addEventListener('click', function () {

        const filterValue = (
            button.dataset.filter ||
            button.textContent.trim().toLowerCase()
        ).toLowerCase();

        filterButtons.forEach(function (btn) {

            btn.classList.remove('active');

        });

        button.classList.add('active');

        projectCards.forEach(function (card) {

            const category = (
                card.dataset.category || ''
            ).toLowerCase();

            const showAll = filterValue === 'all';

            const matches =
                category === filterValue ||
                category.includes(filterValue);

            card.hidden = !(showAll || matches);

        });

    });

});


/* ==================================================
   5. PROJECT DETAILS MODAL
================================================== */

const projectModal = document.querySelector('.project-modal');

const projectButtons = document.querySelectorAll('.project-details-btn');

const modalTitle = document.querySelector(
    '.modal-title, .modal-content h3'
);

const modalDescription = document.querySelector(
    '.modal-description, .modal-content p'
);

const modalClose = document.querySelector('.modal-close');

projectButtons.forEach(function (button) {

    button.addEventListener('click', function () {

        const projectCard = button.closest('.project-card');

        if (!projectCard || !projectModal) return;

        const title = projectCard.querySelector('h3');

        const description = projectCard.querySelector('p');

        if (modalTitle && title) {

            modalTitle.textContent = title.textContent;

        }

        if (modalDescription && description) {

            modalDescription.textContent = description.textContent;

        }

        if (typeof projectModal.showModal === 'function') {

            projectModal.showModal();

        }

    });

});

if (modalClose && projectModal) {

    modalClose.addEventListener('click', function () {

        projectModal.close();

    });

}

if (projectModal) {

    projectModal.addEventListener('click', function (event) {

        if (event.target === projectModal) {

            projectModal.close();

        }

    });

}


/* ==================================================
   6. CONTACT FORM VALIDATION
================================================== */

const contactForm = document.querySelector('#contact-form');

const formStatus = document.querySelector('#form-status');

if (contactForm) {

    contactForm.addEventListener('submit', function (event) {

        event.preventDefault();

        const name = contactForm.querySelector(
            'input[name="name"]'
        );

        const email = contactForm.querySelector(
            'input[name="email"]'
        );

        const message = contactForm.querySelector(
            'textarea[name="message"]'
        );

        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {

            email.setCustomValidity(
                'Please enter a valid email address.'
            );

            email.reportValidity();

            email.setCustomValidity('');

            return;

        }

        if (formStatus) {

            formStatus.textContent =
                'Thank you, ' + name.value.trim() +
                '! Your message has been validated successfully.';

        }

        contactForm.reset();

    });

}


/* ==================================================
   7. BACK TO TOP BUTTON
================================================== */

const backToTop = document.querySelector('#back-to-top');

if (backToTop) {

    backToTop.style.opacity = '0';

    backToTop.style.visibility = 'hidden';

    backToTop.style.transition = '0.3s';

    window.addEventListener('scroll', function () {

        if (window.scrollY > 300) {

            backToTop.style.opacity = '1';

            backToTop.style.visibility = 'visible';

        } else {

            backToTop.style.opacity = '0';

            backToTop.style.visibility = 'hidden';

        }

    });

}


/* ==================================================
   8. SCROLL REVEAL ANIMATION
================================================== */

const revealElements = document.querySelectorAll(
    '.section-heading, .about-content, .skill-card, .education-card, .project-card, .contact-form'
);

revealElements.forEach(function (element) {

    element.classList.add('reveal');

});

if ('IntersectionObserver' in window) {

    const revealObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add('visible');

    });

}


/* ==================================================
   9. SMOOTH SCROLLING
================================================== */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener('click', function (event) {

        const targetId = link.getAttribute('href');

        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({

                behavior: 'smooth',

                block: 'start'

            });

        }

    });

});


/* ==================================================
   10. DYNAMIC FOOTER YEAR
================================================== */

const footerYear = document.querySelector('#current-year');

if (footerYear) {

    footerYear.textContent = new Date().getFullYear();

}


/* ==================================================
   JAVASCRIPT INITIALIZATION COMPLETE
================================================== */

console.log(
    'Muhammad Syahmi Personal Portfolio Loaded Successfully!'
);
