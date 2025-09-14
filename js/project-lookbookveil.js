// Liste des images pour Lookbook Veil (à adapter avec vos noms d'images réels)
const imageList = [
  'c4fef1fe-531c-487a-b7eb-08db24d0fd55_rw_1920.jpg',
  'd3a7e260-26c8-496f-9f3b-2f333b1a649f_rw_1920.jpg',
  'b7b502c9-fe37-4d83-bc82-77ca0d0e800c_rw_1920.jpg',
  '6ec383bf-f475-4c32-9186-136e572e42c8_rw_1920.jpg',
  'f565ca74-35e9-416f-ae4f-08324e03ef5e_rw_1920.jpg'
];

// Génération de la galerie avec des images carrées
function generateGallery() {
    const squareGrid = document.getElementById('square-grid');
    
    imageList.forEach((imageName, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item fade-in';
        gridItem.style.animationDelay = `${index * 0.05}s`;
        
        gridItem.innerHTML = `
            <img src="../assets/images/lookbook-fashion/${imageName}" alt="Lookbook Veil ${imageName}" class="grid-image">
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
    lightboxImage.src = `../assets/images/project-lookbookveil/${imageList[index]}`;
    lightboxImage.alt = `Lookbook Veil ${imageList[index]}`;
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


