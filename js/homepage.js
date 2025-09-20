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

// Initialisation du carrousel
function initCarousel() {
    const carouselSlides = document.getElementById('carouselSlides');
    
    let currentSlide = 0;
    
    // Création des slides
    carouselImages.forEach((image, index) => {
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
        const nextIndex = (currentSlide + 1) % carouselImages.length;
        goToSlide(nextIndex);
    }
    
    // Défilement automatique (5 secondes) - ne s'arrête jamais
    setInterval(nextSlide, 5000);
}

// Gestion du menu mobile de la homepage
function initHomepageMobileMenu() {
    const hamburgerMenu = document.getElementById('homepageHamburgerMenu');
    const mobileNav = document.getElementById('homepageMobileNav');
    const overlay = document.getElementById('homepageMobileNavOverlay');
    
    if (hamburgerMenu && mobileNav && overlay) {
        const toggleMenu = () => {
            hamburgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
        };
        
        hamburgerMenu.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }
}

// Initialisation lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initHomepageMobileMenu();
});