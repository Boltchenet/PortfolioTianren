// Liste des images pour le projet Furniture avec vos noms d'images
const imageList = [
    'a4d8cac6-b419-47ed-8984-406ea3af99cd_rw_1920.jpg',
    '67f34ac5-9549-4f68-92c5-d2a13e10285e_rw_1920.jpg',
    '8199461a-4730-4671-822a-eb6dd25bcff6_rw_1920.jpg',
    '1c6b3218-bf5f-48ff-9176-deb9e948b01e_rw_1920.jpg',
    '740cc6f6-a1ab-4aec-a0d0-200b8ba4140c_rw_1920.jpg'
];

// Génération de la galerie avec lazy loading
function generateGallery() {
    const proportionalGrid = document.getElementById('proportional-grid');
    
    for (let i = 0; i < imageList.length; i++) {
        const imageName = imageList[i];
        const proportionalItem = document.createElement('div');
        proportionalItem.className = 'proportional-item fade-in';
        proportionalItem.style.animationDelay = `${i * 0.1}s`;
        
        // Créer un conteneur pour l'image
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        // Créer d'abord un placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.backgroundColor = '#f0f0f0';
        
        imageContainer.appendChild(placeholder);
        proportionalItem.appendChild(imageContainer);
        proportionalGrid.appendChild(proportionalItem);
        
        // Charger l'image après un délai
        setTimeout(() => {
            loadGalleryImage(imageContainer, imageName, i);
        }, i * 150);
        
        proportionalItem.addEventListener('click', () => {
            openLightbox(i);
        });
    }
}

// Fonction pour charger les images de galerie
function loadGalleryImage(imageContainer, imageName, index) {
    const placeholder = imageContainer.querySelector('.image-placeholder');
    const img = new Image();
    
    img.onload = function() {
        img.className = 'proportional-image';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.alt = `Furniture design ${index + 1}`;
        
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
    
    img.src = `../assets/images/project-furniture/${imageName}`;
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
}

// Fonction pour ouvrir la lightbox
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    lightboxImage.src = `../assets/images/project-furniture/${imageList[index]}`;
    lightboxCounter.textContent = `${index + 1} / ${imageList.length}`;
    lightbox.classList.add('open');
    lightbox.dataset.currentIndex = index;
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