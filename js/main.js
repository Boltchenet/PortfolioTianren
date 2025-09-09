// Navigation sticky
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu hamburger pour mobile
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav ul');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
}