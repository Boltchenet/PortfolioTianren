// Liste des images pour le projet Furniture 2025
const imageList = [
    'd4b41a37-2f5a-44f6-89ad-d9fd26f10ae6_rw_1920.jpg',
    '33fad39b-e546-4cd2-b695-6e3463faca08_rw_1920.jpg',
    'af223f26-8cdb-4bc9-afad-ba9824064bbe_rw_1920.jpg',
    '3adc9b68-2b4e-480c-8f76-8efceb37ae4c_rw_1920.jpg',
    'fc8903f2-19b5-40f2-9c5b-f9ced80cdc47_rw_1920.jpg',
    'e2773b15-fd1b-4424-89e4-b37147638447_rw_1920.jpg',
    '7d3ed3e6-6104-4608-8066-36c53c743e26_rw_1920.jpg',
    'd0050001-74e5-4641-a84b-a98db25ec9bd_rw_1920.jpg'
];

// Génération de la galerie avec cadres proportionnels
function generateGallery() {
    const proportionalGrid = document.getElementById('proportional-grid');
    
    // Maintenant on inclut toutes les images
    for (let i = 0; i < imageList.length; i++) {
        const imageName = imageList[i];
        const proportionalItem = document.createElement('div');
        proportionalItem.className = 'proportional-item fade-in';
        proportionalItem.style.animationDelay = `${i * 0.05}s`;
        
        // Créer un conteneur pour l'image qui préservera ses proportions
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        // Créer l'élément image
        const image = document.createElement('img');
        image.className = 'proportional-image';
        image.src = `../assets/images/furniture-chair/${imageName}`;
        image.alt = `Furniture design ${i+1}`;
        image.loading = 'lazy';
        
        // Ajouter l'image au conteneur
        imageContainer.appendChild(image);
        
        // Ajouter le conteneur à l'élément de la grille
        proportionalItem.appendChild(imageContainer);
        
        // Ajouter l'élément à la grille
        proportionalGrid.appendChild(proportionalItem);
        
        // Ajouter l'événement click pour ouvrir la lightbox
        proportionalItem.addEventListener('click', () => {
            openLightbox(i);
        });
    }
}

// Fonction pour ouvrir la lightbox
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    // Mettre à jour l'image et le compteur
    lightboxImage.src = `../assets/images/furniture-chair/${imageList[index]}`;
    lightboxCounter.textContent = `${index + 1} / ${imageList.length}`;
    
    // Ouvrir la lightbox
    lightbox.classList.add('open');
    
    // Stocker l'index actuel
    lightbox.dataset.currentIndex = index;
    
    // Empêcher le défilement de la page
    document.body.style.overflow = 'hidden';
}

// Fonction pour fermer la lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

// Fonction pour naviguer vers l'image précédente
function prevImage() {
    const lightbox = document.getElementById('lightbox');
    let currentIndex = parseInt(lightbox.dataset.currentIndex);
    
    if (currentIndex > 0) {
        currentIndex--;
        openLightbox(currentIndex);
    }
}

// Fonction pour naviguer vers l'image suivante
function nextImage() {
    const lightbox = document.getElementById('lightbox');
    let currentIndex = parseInt(lightbox.dataset.currentIndex);
    
    if (currentIndex < imageList.length - 1) {
        currentIndex++;
        openLightbox(currentIndex);
    }
}

// Initialiser la galerie et les événements
document.addEventListener('DOMContentLoaded', function() {
    generateGallery();
    
    // Événements pour la lightbox
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', prevImage);
    document.querySelector('.lightbox-next').addEventListener('click', nextImage);
    
    // Fermer la lightbox en cliquant à l'extérieur de l'image
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.classList.contains('open')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });
    
    // Animation d'entrée
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});