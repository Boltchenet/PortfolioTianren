// Liste des images dans l'ordre spécifié pour Lookbook Spiral
const imageList = [
  '0212ddbc-56c5-40dc-8e61-7458acaa72ec_rw_1920.png',
  '2b6c9bb5-6921-4eb8-9c69-5322f81124a2_rw_1920.jpg',
  '7ed5baa4-61ce-4f72-ac05-5c14e1acedc0_rw_1920.png',
  '42deacfe-6d14-4e4f-9147-61393866db0a_rw_1920.jpg',
  'c3888e54-9fe1-4144-a3e4-1167b6e7889a_rw_1920.png'
];

// Génération de la galerie avec des images verticales (même format que Lookbook Fashion)
function generateGallery() {
    const verticalGrid = document.getElementById('vertical-grid');
    
    imageList.forEach((imageName, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'vertical-item fade-in';
        gridItem.style.animationDelay = `${index * 0.1}s`;
        
        gridItem.innerHTML = `
            <img src="../assets/images/lookbook-spiral/${imageName}" alt="Lookbook Spiral ${index + 1}" class="vertical-image">
        `;
        
        gridItem.addEventListener('click', () => {
            openLightbox(index);
        });
        
        verticalGrid.appendChild(gridItem);
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
    lightboxImage.src = `../assets/images/lookbook-spiral/${imageList[index]}`;
    lightboxImage.alt = `Lookbook Spiral ${index + 1}`;
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