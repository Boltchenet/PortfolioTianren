// Navigation sticky
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Hotbar navigation
const artistName = document.getElementById('artistName');
const hotbarNav = document.getElementById('hotbarNav');
const hamburgerMenu = document.getElementById('hamburgerMenu');

// CORRECTION : Mettre à jour les liens de navigation seulement si nécessaire
if (hotbarNav && window.location.pathname.includes('projects/')) {
    // Si on est dans un sous-dossier projects/, utiliser les chemins relatifs
    hotbarNav.innerHTML = `
        <a href="../projects.html" class="nav-item">Projects</a>
        <a href="../about.html" class="nav-item">About</a>
        <a href="../homepage.html" class="nav-item">Homepage</a>
        <a href="../privacy.html" class="nav-item">Privacy</a>
    `;
}

if (artistName) {
    artistName.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (hotbarNav) hotbarNav.classList.toggle('active');
        artistName.classList.toggle('active');
    });
}

// Gestion du menu hamburger
if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (hotbarNav) hotbarNav.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });
}

// Fermer le menu en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    if (hotbarNav && hotbarNav.classList.contains('active') && 
        !hotbarNav.contains(e.target) && 
        e.target !== artistName &&
        e.target !== hamburgerMenu) {
        hotbarNav.classList.remove('active');
        if (artistName) artistName.classList.remove('active');
        if (hamburgerMenu) hamburgerMenu.classList.remove('active');
    }
});

// Fermer le menu en scrollant
window.addEventListener('scroll', () => {
    if (hotbarNav && hotbarNav.classList.contains('active')) {
        hotbarNav.classList.remove('active');
        if (artistName) artistName.classList.remove('active');
        if (hamburgerMenu) hamburgerMenu.classList.remove('active');
    }
});