// Liste des images dans l'ordre spécifié
const imageList = [
    '1d42ba8e-67fb-4124-a3ad-19887df59dfa_rw_1920.jpg',
    'cec0cdfb-4149-46b3-8af8-596623aba568_rw_1920.jpg',
    'afd04708-8660-4ed7-b159-56caa99830ca_rw_1920.jpg',
    '39893bf8-6bb1-47c1-8a58-dcc85a0ec1f5_rw_1920.jpg',
    '3ad956f3-415a-44e6-9bb6-1f925e9e5959_rw_1920.jpg',
    'e2fa3d23-2ce4-4120-b13d-ae635b18c475_rw_1920.jpg',
    '9238e576-5681-495f-bbd3-5f3868f2c2ff_rw_1920.jpg',
    'a15ab2a0-eb13-48b6-80b5-4ddf13846c85_rw_1920.jpg',
    '839cca7e-de6d-40a7-9756-5a6336fc316c_rw_1920.jpg',
    '8b71bc7a-1b8c-4ca8-b44b-08863a717fb3_rw_1920.jpg',
    '6fc215eb-363a-411a-9caa-726d8260101e_rw_1920.jpg',
    '1177da55-eef7-4ca0-940e-d8d2914ed5bc_rw_1920.jpg',
    '1558248e-2801-4c2a-a05f-14b3781344fa_rw_1920.jpg',
    'ba0eafe6-1f31-4b16-bc2a-44f46961f9f4_rw_1920.jpg',
    'c2a7ef8a-0118-4027-84b5-2669f7889efe_rw_1920.jpg',
    '2bece782-a5ee-4091-b283-50136a80218d_rw_1920.jpg',
    '7bcc5e45-06aa-4dd1-ad1e-09721cfaf9db_rw_1920.jpg',
    'e8344c4c-cf9f-4023-a401-81349cf678f4_rw_1920.jpg',
    'bbf2caea-30f8-4f02-ae2c-606a6e47cead_rw_1920.jpg',
    '2a2f4230-0d09-469c-a289-bebe6c9033dc_rw_1920.jpg',
    '02297347-20c4-4d68-a84e-a6dee2d62d8f_rw_1920.jpg',
    '0cc9430a-cb18-4769-bd6b-fbb335542055_rw_1920.jpg',
    '693b7805-5b81-4b51-8c71-45b94701d597_rw_1920.jpg',
    '052c6ff6-2475-4b10-a363-0a9e44b5ab8a_rw_1920.jpg',
    'bde4d4b7-e1ef-4097-8699-6b8efb7e3f0f_rw_1920.jpg',
    '962b80a3-1945-4fa1-b1a7-4d7c464fe312_rw_1920.jpg',
    '15d4b6b3-e004-40eb-b56f-ac7c70c57cc6_rw_1920.jpg',
    '67a5917c-9405-419c-936d-6d2413fcb6f9_rw_1920.jpg',
    '817191ab-c72c-443a-86ef-a6ff515257d7_rw_1920.jpg',
    '7ad49380-ec25-4c8b-a3c9-577f4b3502ef_rw_1920.jpg',
    'e1553e7f-64ec-420b-9ec8-a400a542f834_rw_1920.jpg',
    'e2ff0ab0-fded-419a-a950-8043044d2b04_rw_1920.jpg'
];

// Génération de la galerie classique
function generateGallery() {
    const classicGrid = document.getElementById('classic-grid');
    
    // Commencer à partir de l'index 1 car l'index 0 est l'image de couverture
    for (let i = 1; i < imageList.length; i++) {
        const imageName = imageList[i];
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item fade-in';
        gridItem.style.animationDelay = `${i * 0.05}s`;
        
        const img = document.createElement('img');
        img.src = `../assets/images/project-interflows/${imageName}`;
        img.alt = `Interflows ${i}`;
        img.className = 'grid-image';
        
        gridItem.appendChild(img);
        gridItem.addEventListener('click', () => {
            openLightbox(i);
        });
        
        classicGrid.appendChild(gridItem);
    }
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
    lightboxImage.src = `../assets/images/project-interflows/${imageList[index]}`;
    lightboxImage.alt = `Interflows ${index + 1}`;
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