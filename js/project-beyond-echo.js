// Liste des images dans l'ordre spécifié
const imageList = [
    '9b6c56ed-6858-4c6d-b55f-45ea5f309197_rw_1920.png',
    'f2cc94d9-61cb-452f-8622-e1f52990108d_rw_1920.png',
    '880f88f5-8da9-4429-bfb9-fd607d00a87f_rw_1920.png',
    'a0eca1f0-e447-445b-a132-431c956fdd2a_rw_1920.png',
    'e3d2e056-ef2d-47b1-8e99-ef9392e64747_rw_1920.png',
    '5e320c92-30b2-4f78-b0b0-c811bf70429e_rw_1920.png',
    '726e1c46-f08e-43ce-ab77-26608832eea8_rw_1920.png'
];

// Génération de la galerie
function generateGallery() {
    const gridContainer = document.getElementById('grid-container');
    
    // Inclure toutes les images maintenant (plus de couverture séparée)
    imageList.forEach((imageName, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item fade-in';
        gridItem.style.animationDelay = `${index * 0.03}s`;
        
        gridItem.innerHTML = `
            <img src="../assets/images/project-beyond-echo/${imageName}" alt="Beyond the Echo ${index + 1}" class="grid-image" loading="lazy">
        `;
        
        gridItem.addEventListener('click', () => {
            openLightbox(index);
        });
        
        gridContainer.appendChild(gridItem);
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
    lightboxImage.src = `../assets/images/project-beyond-echo/${imageList[index]}`;
    lightboxImage.alt = `Beyond the Echo ${index + 1}`;
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