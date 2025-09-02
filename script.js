// Real-time validation and feedback for Contact form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    function validateName() {
        if (!name.value.trim()) {
            nameError.textContent = 'Name is required.';
            return false;
        }
        nameError.textContent = '';
        return true;
    }
    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            emailError.textContent = 'Email is required.';
            return false;
        } else if (!emailPattern.test(email.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            return false;
        }
        emailError.textContent = '';
        return true;
    }
    function validateMessage() {
        if (!message.value.trim()) {
            messageError.textContent = 'Message is required.';
            return false;
        }
        messageError.textContent = '';
        return true;
    }

    name.addEventListener('input', validateName);
    email.addEventListener('input', validateEmail);
    message.addEventListener('input', validateMessage);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const validName = validateName();
        const validEmail = validateEmail();
        const validMessage = validateMessage();
        if (validName && validEmail && validMessage) {
            formSuccess.textContent = 'Thank you! Your message has been sent.';
            form.reset();
            setTimeout(() => { formSuccess.textContent = ''; }, 5000);
        } else {
            formSuccess.textContent = '';
        }
    });
});
// Lightbox effect for project images
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    document.querySelectorAll('.project-img').forEach(img => {
        img.addEventListener('click', function() {
            showLightbox(this.src, this.alt);
        });
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                showLightbox(this.src, this.alt);
            }
        });
    });
    function showLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightboxCaption.textContent = alt;
        lightbox.classList.add('show');
        lightbox.style.display = 'flex';
        lightbox.focus();
    }
    function hideLightbox() {
        lightbox.classList.remove('show');
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    }
    closeBtn.addEventListener('click', hideLightbox);
    closeBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') hideLightbox();
    });
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) hideLightbox();
    });
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('show') && (e.key === 'Escape' || e.key === 'Esc')) {
            hideLightbox();
        }
    });
});
// Filter feature for Projects section
function filterProjects(category) {
    const articles = document.querySelectorAll('#project-list article');
    articles.forEach(article => {
        if (category === 'all' || article.dataset.category === category) {
            article.style.display = '';
        } else {
            article.style.display = 'none';
        }
    });
    // Update aria-pressed for filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.setAttribute('aria-pressed', btn.textContent.toLowerCase() === category || (category === 'all' && btn.textContent.toLowerCase() === 'all'));
    });
}
// Enhance smooth scrolling for anchor links in nav
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });
});
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('visible');
    }
}