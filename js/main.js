const roles = ["Full Stack Engineer.", "DevOps Enthusiast.", "Problem Solver."];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const delayStore = 2000;

function typeWriter() {
    const currentRole = roles[roleIndex];
    const typingElement = document.getElementById('typing-text');

    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeDelay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        typeDelay = delayStore;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeWriter, typeDelay);
}

// 3D Tilt Effect
function initTilt() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        });
    });
}

function toggleNav() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('hidden');
    nav.classList.toggle('flex'); // Add flex to make it visible properly
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    // AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic'
    });

    // Typewriter
    if (document.getElementById('typing-text')) {
        setTimeout(typeWriter, 1000);
    }

    // Tilt
    initTilt();

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            // Cursor Dot
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Cursor Outline (with lag)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('scale-150', 'bg-indigo-100/20'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('scale-150', 'bg-indigo-100/20'));
        });
    }
});
