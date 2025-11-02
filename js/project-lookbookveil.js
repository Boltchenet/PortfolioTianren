// Liste des images pour Lookbook Veil
const imageList = [
  'c4fef1fe-531c-487a-b7eb-08db24d0fd55_rw_1920.jpg',
  'd3a7e260-26c8-496f-9f3b-2f333b1a649f_rw_1920.jpg',
  'b7b502c9-fe37-4d83-bc82-77ca0d0e800c_rw_1920.jpg',
  '6ec383bf-f475-4c32-9186-136e572e42c8_rw_1920.jpg',
  'f565ca74-35e9-416f-ae4f-08324e03ef5e_rw_1920.jpg'
];

// Génération de la galerie avec lazy loading
function generateGallery() {
    const verticalGrid = document.getElementById('vertical-grid');
    
    imageList.forEach((imageName, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'vertical-item fade-in';
        gridItem.style.animationDelay = `${index * 0.1}s`;
        
        // Créer d'abord un placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.backgroundColor = '#f0f0f0';
        
        gridItem.appendChild(placeholder);
        
        // Charger l'image après un délai
        setTimeout(() => {
            loadGalleryImage(gridItem, imageName, index);
        }, index * 150);
        
        gridItem.addEventListener('click', () => {
            openLightbox(index);
        });
        
        verticalGrid.appendChild(gridItem);
    });
}

// Fonction pour charger les images de galerie
function loadGalleryImage(gridItem, imageName, index) {
    const placeholder = gridItem.querySelector('.image-placeholder');
    const img = new Image();
    
    img.onload = function() {
        img.className = 'vertical-image';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.alt = `Lookbook Veil ${index + 1}`;
        
        placeholder.replaceWith(img);
        
        setTimeout(() => {
            img.style.opacity = '1';
        }, 50);
    };
    
    img.onerror = function() {
        placeholder.innerHTML = '<span>Image</span>';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.color = '#999';
    };
    
    img.src = `../assets/images/lookbook-fashion/${imageName}`;
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
    lightboxImage.src = `../assets/images/lookbook-fashion/${imageList[index]}`;
    lightboxImage.alt = `Lookbook Veil ${index + 1}`;
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