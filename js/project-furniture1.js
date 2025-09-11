// Liste des images pour le projet Furniture
// Remplacez ces noms par les noms réels de vos images
const imageList = [
    'furniture-cover.jpg',
    'furniture-1.jpg',
    'furniture-2.jpg',
    'furniture-3.jpg',
    'furniture-4.jpg',
    'furniture-5.jpg',
    'furniture-6.jpg',
    'furniture-7.jpg',
    'furniture-8.jpg',
    'furniture-9.jpg',
    'furniture-10.jpg'
];

// Génération de la galerie avec cadres proportionnels
function generateGallery() {
    const proportionalGrid = document.getElementById('proportional-grid');
    
    // Commencer à partir de l'index 1 car l'index 0 est l'image de couverture
    for (let i = 1; i < imageList.length; i++) {
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
        image.src = `../assets/images/project-furniture/${imageName}`;
        image.alt = `Furniture design ${i}`;
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
    lightboxImage.src = `../assets/images/project-furniture/${imageList[index]}`;
    lightboxCounter.textContent = `${index} / ${imageList.length - 1}`;
    
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
    
    if (currentIndex > 1) { // Commencer à 1 car l'index 0 est l'image de couverture
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