// Liste des images du lookbook fashion
const imageList = [
  'a5f5ddf3-00de-454e-890e-eacae5923a8a_rw_1920.jpg',
  'd8cd2d1c-2e4e-43ca-bc28-6286203e7f63_rw_1920.jpg',
  '12aab275-87de-47cc-970d-168b9ebf7f4b_rw_1920.jpg',
  '87fddcdf-c2cf-4271-948a-7ffdc9b49be9_rw_1920.jpg',
  'e32a7f71-8643-4bf2-a660-48483fddde31_rw_1920.jpg',
  'e3aad9c6-e880-4512-8b08-8de0e4d53292_rw_1920.jpg'
];

// Génération de la galerie avec des images verticales
function generateGallery() {
    const verticalGrid = document.getElementById('vertical-grid');
    
    imageList.forEach((imageName, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'vertical-item fade-in';
        gridItem.style.animationDelay = `${index * 0.1}s`;
        
        gridItem.innerHTML = `
            <img src="../assets/images/lookbook-veil/${imageName}" alt="Lookbook Fashion ${index + 1}" class="vertical-image">
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
    lightboxImage.src = `../assets/images/lookbook-veil/${imageList[index]}`;
    lightboxImage.alt = `Lookbook Fashion ${index + 1}`;
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