// Données des images du carrousel
const carouselImages = [
    "assets/images/projet-quiet-noise/546140041_822111210386589_6708770729940080885_n.jpg",
    "assets/images/projet-quiet-noise/545693736_2080028359070891_738097082732917078_n.jpg",
    "assets/images/projet-quiet-noise/543839091_791691923240990_9075904339639640189_n.jpg",
    "assets/images/projet-quiet-noise/545823812_1987910318673090_2717696102556916541_n.jpg",
    "assets/images/projet-quiet-noise/545883275_1871123386768500_2462667982035886812_n.jpg",
    "assets/images/projet-quiet-noise/545332030_645872114836017_4829755217469543480_n.jpg",
    "assets/images/projet-quiet-noise/547517099_688452430184725_4405493437100329617_n.jpg",
    "assets/images/projet-quiet-noise/545404696_1294171685586075_8921741402654129061_n.jpg"
];

// Mélanger aléatoirement le tableau d'images
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialisation du carrousel
function initCarousel() {
    const carouselSlides = document.getElementById('carouselSlides');
    
    // Mélanger les images aléatoirement
    const shuffledImages = shuffleArray([...carouselImages]);
    
    let currentSlide = 0;
    
    // Création des slides
    shuffledImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${image}" alt="Quiet Noise Project ${index + 1}">`;
        carouselSlides.appendChild(slide);
    });
    
    // Fonction pour aller à une slide spécifique
    function goToSlide(index) {
        // Désactiver toutes les slides
        document.querySelectorAll('.carousel-slide').forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Activer la nouvelle slide
        document.querySelectorAll('.carousel-slide')[index].classList.add('active');
        currentSlide = index;
    }
    
    // Aller à la slide suivante
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % shuffledImages.length;
        goToSlide(nextIndex);
    }
    
    // Défilement automatique (4 secondes) - ne s'arrête jamais
    setInterval(nextSlide, 4000);
}

// Gestion du menu mobile original
function initMobileMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    
    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }
}

// Gestion du nouveau menu mobile pour la homepage
function initHomepageMobileMenu() {
    const hamburgerMenu = document.getElementById('homepageHamburgerMenu');
    const mobileNav = document.getElementById('homepageMobileNav');
    
    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            // Empêcher le défilement quand le menu est ouvert
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('active') && 
                !mobileNav.contains(e.target) && 
                e.target !== hamburgerMenu) {
                hamburgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Fermer le menu en cliquant sur un lien
        mobileNav.querySelectorAll('.homepage-nav-item').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
}

// Ajuster la hauteur du carrousel pour mobile
function adjustCarouselForMobile() {
    if (window.innerWidth <= 768) {
        const carouselContainer = document.querySelector('.carousel-container');
        const carouselSlides = document.querySelector('.carousel-slides');
        
        if (carouselContainer && carouselSlides) {
            // Ajuster la hauteur pour s'adapter à l'écran mobile
            const windowHeight = window.innerHeight;
            const headerHeight = document.getElementById('homepage-mobile-header').offsetHeight;
            const carouselHeight = windowHeight - headerHeight;
            
            carouselContainer.style.height = `${carouselHeight}px`;
            carouselSlides.style.height = `${carouselHeight}px`;
            
            // Centrer les images
            carouselSlides.style.display = 'flex';
            carouselSlides.style.alignItems = 'center';
            carouselSlides.style.justifyContent = 'center';
            
            document.querySelectorAll('.carousel-slide').forEach(slide => {
                slide.style.display = 'flex';
                slide.style.alignItems = 'center';
                slide.style.justifyContent = 'center';
            });
            
            document.querySelectorAll('.carousel-slide img').forEach(img => {
                img.style.maxHeight = '90%';
                img.style.maxWidth = '95%';
                img.style.objectFit = 'contain';
            });
        }
    }
}

// Initialisation lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initMobileMenu();
    initHomepageMobileMenu();
    adjustCarouselForMobile();
    
    // Réajuster lors du redimensionnement
    window.addEventListener('resize', adjustCarouselForMobile);
});

// Empêcher le défilement par défaut sur mobile
document.addEventListener('touchmove', function(e) {
    if (document.getElementById('homepageMobileNav').classList.contains('active')) {
        e.preventDefault();
    }
}, { passive: false });