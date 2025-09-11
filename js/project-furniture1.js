// Liste des images pour le projet Furniture
// Remplacez ces noms par les noms r�els de vos images
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

// G�n�ration de la galerie avec cadres proportionnels
function generateGallery() {
    const proportionalGrid = document.getElementById('proportional-grid');
    
    // Commencer � partir de l'index 1 car l'index 0 est l'image de couverture
    for (let i = 1; i < imageList.length; i++) {
        const imageName = imageList[i];
        const proportionalItem = document.createElement('div');
        proportionalItem.className = 'proportional-item fade-in';
        proportionalItem.style.animationDelay = `${i * 0.05}s`;
        
        // Cr�er un conteneur pour l'image qui pr�servera ses proportions
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        // Cr�er l'�l�ment image
        const image = document.createElement('img');
        image.className = 'proportional-image';
        image.src = `../assets/images/project-furniture/${imageName}`;
        image.alt = `Furniture design ${i}`;
        image.loading = 'lazy';
        
        // Ajouter l'image au conteneur
        imageContainer.appendChild(image);
        
        // Ajouter le conteneur � l'�l�ment de la grille
        proportionalItem.appendChild(imageContainer);
        
        // Ajouter l'�l�ment � la grille
        proportionalGrid.appendChild(proportionalItem);
        
        // Ajouter l'�v�nement click pour ouvrir la lightbox
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
    
    // Mettre � jour l'image et le compteur
    lightboxImage.src = `../assets/images/project-furniture/${imageList[index]}`;
    lightboxCounter.textContent = `${index} / ${imageList.length - 1}`;
    
    // Ouvrir la lightbox
    lightbox.classList.add('open');
    
    // Stocker l'index actuel
    lightbox.dataset.currentIndex = index;
    
    // Emp�cher le d�filement de la page
    document.body.style.overflow = 'hidden';
}

// Fonction pour fermer la lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

// Fonction pour naviguer vers l'image pr�c�dente
function prevImage() {
    const lightbox = document.getElementById('lightbox');
    let currentIndex = parseInt(lightbox.dataset.currentIndex);
    
    if (currentIndex > 1) { // Commencer � 1 car l'index 0 est l'image de couverture
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

// Initialiser la galerie et les �v�nements
document.addEventListener('DOMContentLoaded', function() {
    generateGallery();
    
    // �v�nements pour la lightbox
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', prevImage);
    document.querySelector('.lightbox-next').addEventListener('click', nextImage);
    
    // Fermer la lightbox en cliquant � l'ext�rieur de l'image
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
    
    // Animation d'entr�e
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