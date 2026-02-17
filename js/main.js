function toggleNav() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('hidden');
}

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
});
