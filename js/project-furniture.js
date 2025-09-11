// Liste des images pour le projet Furniture avec vos noms d'images
const imageList = [
    'a4d8cac6-b419-47ed-8984-406ea3af99cd_rw_1920.jpg',
    '67f34ac5-9549-4f68-92c5-d2a13e10285e_rw_1920.jpg',
    '8199461a-4730-4671-822a-eb6dd25bcff6_rw_1920.jpg',
    '1c6b3218-bf5f-48ff-9176-deb9e948b01e_rw_1920.jpg',
    '740cc6f6-a1ab-4aec-a0d0-200b8ba4140c_rw_1920.jpg'
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