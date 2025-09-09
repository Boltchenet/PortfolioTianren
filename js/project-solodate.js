// Lightbox functionality
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Fermer">×</button>
    <div class="lightbox-content">
        <img src="" alt="" class="lightbox-image">
        <div class="lightbox-meta">
            <h3 class="lightbox-title">Titre de l'image</h3>
            <p class="lightbox-details">2023 • Paris, France</p>
        </div>
    </div>
    <div class="lightbox-nav">
        <button class="lightbox-prev" aria-label="Image précédente">‹</button>
        <button class="lightbox-next" aria-label="Image suivante">›</button>
    </div>
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxTitle = lightbox.querySelector('.lightbox-title');
const lightboxDetails = lightbox.querySelector('.lightbox-details');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');

let currentImageIndex = 0;
const galleryImages = Array.from(document.querySelectorAll('.gallery-image'));

// Ouvrir la lightbox
function openLightbox(index) {
    const image = galleryImages[index];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = image.alt;
    lightboxDetails.textContent = '2024 • Paris, France'; // À adapter
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
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    openLightbox(currentImageIndex);
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(currentImageIndex);
}

// Écouteurs d'événements
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Navigation clavier
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('open')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    }
});

// Ouvrir la lightbox au clic sur les images de la galerie
galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        openLightbox(index);
    });
});