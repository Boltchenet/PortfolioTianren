// Liste des images dans l'ordre spécifié
const imageList = [
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
    'pigeon.jpg',
    'savethatpigeon.jpg',
    'dustypigeon.jpg',
    'drowningpigeon.jpg'
];

// Génération de la galerie avec lazy loading
function generateGallery() {
    const squareGrid = document.getElementById('square-grid');
    
    imageList.forEach((imageName, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item fade-in';
        gridItem.style.animationDelay = `${index * 0.1}s`; // Augmenter le délai
        
        // Créer d'abord un placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.backgroundColor = '#f0f0f0';
        
        gridItem.appendChild(placeholder);
        
        // Charger l'image après un délai
        setTimeout(() => {
            loadGalleryImage(gridItem, imageName, index);
        }, index * 100); // Délai progressif
        
        gridItem.addEventListener('click', () => {
            openLightbox(index);
        });
        
        squareGrid.appendChild(gridItem);
    });
}

// Fonction pour charger les images de galerie
function loadGalleryImage(gridItem, imageName, index) {
    const placeholder = gridItem.querySelector('.image-placeholder');
    const img = new Image();
    
    img.onload = function() {
        img.className = 'grid-image';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.alt = `SoloDate ${imageName}`;
        
        // Remplacer le placeholder
        placeholder.replaceWith(img);
        
        // Animation douce
        setTimeout(() => {
            img.style.opacity = '1';
        }, 50);
    };
    
    img.onerror = function() {
        // Garder le placeholder si l'image échoue
        placeholder.innerHTML = '<span>Image</span>';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.color = '#999';
    };
    
    img.src = `../assets/images/project-solodate/${imageName}`;
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
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

// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });
}

// Fermer le menu mobile en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    if (mobileNav && mobileNav.classList.contains('open') && !hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
    }
});

// Charger la galerie lorsque la page est prête
document.addEventListener('DOMContentLoaded', generateGallery);