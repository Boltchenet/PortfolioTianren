// Liste des images dans l'ordre spécifié
const imageList = [
    'solodate-title.jpeg',
    'treehand.jpg',
    'leavesriver.jpeg',
    'treeroad.jpg',
    'sucette.jpg',
    'streetmirror.jpg',
    'pissenlit.jpeg',
    'benchleaves.jpg',
    'stairs.jpg',
    'tabledust.jpg',
    'flaque.jpg',
    'campfire.jpg',
    'amazondelivery.jpg',
    'leavestail.jpg',
    'bouc.jpg',
    'fesse.jpeg',
    'roseflower.jpeg',
    'ant.jpg',
    'gadoue.jpeg',
    'bleu.jpeg',
    'grospissenlit.jpeg',
    'spiderweb.jpg',
    'windyhair.jpeg',
    'pissenlitweb.jpeg',
    'leavesback.jpg',
    'watersmoothie.jpeg',
    'plasticblackrose.jpeg',
    'whatmedoc.jpg',
    'instasky.jpg',
    'bluebranch.jpg',
    'electricblue.jpg',
    'leavesonthefloor.jpg',
    'wallight.jpg',
    'roadcross.jpg',
    'alienstick.jpg',
    'blankarrowsign.jpg',
    'lightyflower.jpg',
    'fireworksleaves.jpg',
    'skinfinger.jpg',
    'lukcigarette.jpg',
    'nightvisiontree.jpg',
    'spongebobtree.jpg',
    'tecceratcube.jpg',
    'balancednature.jpg',
    'sleepyflowers.jpg',
    'crystalwater.jpg',
    'thingonthewindow.jpg',
    'clearwater.jpg',
    'crackedegg.jpg',
    'flyingduck.jpg',
    'plancher.jpg',
    'savethatpigeon.jpg',
    'dustypigeon.jpg',
    'drowningpigeon.jpg'
];

// Génération de la galerie avec des images carrées
function generateGallery() {
    const squareGrid = document.getElementById('square-grid');
    
    imageList.forEach((imageName, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item fade-in';
        gridItem.style.animationDelay = `${index * 0.05}s`;
        
        gridItem.innerHTML = `
            <img src="../assets/images/project-solodate/${imageName}" alt="SoloDate ${imageName}" class="grid-image">
        `;
        
        gridItem.addEventListener('click', () => {
            openLightbox(index);
        });
        
        squareGrid.appendChild(gridItem);
    });
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxCounter = document.getElementById('lightbox-counter');

let currentImageIndex = 0;

// Ouvrir la lightbox
function openLightbox(index) {
    lightboxImage.src = `../assets/images/project-solodate/${imageList[index]}`;
    lightboxImage.alt = `SoloDate ${imageList[index]}`;
    lightboxCounter.textContent = `${index + 1} / ${imageList.length}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    currentImageIndex = index;
}

// Fermer la lightbox
function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Navigation dans la lightbox
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageList.length;
    openLightbox(currentImageIndex);
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + imageList.length) % imageList.length;
    openLightbox(currentImageIndex);
}

// Écouteurs d'événements
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
});

// Navigation clavier
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('open')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    }
});

// Charger la galerie lorsque la page est prête
document.addEventListener('DOMContentLoaded', generateGallery);