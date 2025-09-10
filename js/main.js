// Navigation sticky
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Hotbar navigation
const artistName = document.getElementById('artistName');
const hotbarNav = document.getElementById('hotbarNav');

if (artistName) {
    artistName.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        hotbarNav.classList.toggle('active');
        artistName.classList.toggle('active');
    });
}

// Fermer le menu en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    if (hotbarNav && hotbarNav.classList.contains('active') && 
        !hotbarNav.contains(e.target) && 
        e.target !== artistName) {
        hotbarNav.classList.remove('active');
        artistName.classList.remove('active');
    }
});

// Fermer le menu en scrollant
window.addEventListener('scroll', () => {
    if (hotbarNav && hotbarNav.classList.contains('active')) {
        hotbarNav.classList.remove('active');
        artistName.classList.remove('active');
    }
});