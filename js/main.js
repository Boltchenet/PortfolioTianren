// Navigation sticky
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu radial
const radialMenu = document.querySelector('.radial-menu');
const artistName = document.querySelector('.artist-name');

if (artistName) {
    artistName.addEventListener('click', (e) => {
        e.preventDefault();
        radialMenu.classList.toggle('active');
    });
}

// Fermer le menu en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    if (radialMenu && radialMenu.classList.contains('active') && 
        !radialMenu.contains(e.target)) {
        radialMenu.classList.remove('active');
    }
});