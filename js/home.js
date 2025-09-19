// Données des projets mises à jour
const projects = [
    {
        id: 1,
        title: "SoloDate",
        year: "2024",
        image: "assets/images/home/solodate-title.jpeg",
        accentColor: "var(--accent-sage)",
        slug: "solodate"
    },
    {
        id: 2,
        title: "BeyondTheEcho",
        year: "2023",
        image: "assets/images/home/beyond-the-echo-title.jpeg",
        accentColor: "var(--accent-window)",
        slug: "beyond-the-echo"
    },
    {
        id: 3,
        title: "Interflows",
        year: "2023",
        image: "assets/images/home/interflows-title.jpg",
        accentColor: "var(--accent-jade)",
        slug: "interflows"
    },
    {
        id: 4,
        title: "Furniture",
        year: "2024",
        image: "assets/images/home/furniture-title.jpg",
        accentColor: "var(--accent-sand)",
        slug: "furniture"
    },
    {
        id: 5,
        title: "Furniture",
        year: "2025",
        image: "assets/images/home/furniture2-title.jpg",
        accentColor: "var(--accent-leather)",
        slug: "furniture-2025"
    },
    {
        id: 6,
        title: "Lookbook",
        year: "2024",
        image: "assets/images/home/lookbook-title.jpg",
        accentColor: "var(--accent-veil)",
        slug: "lookbook-fashion",
        vertical: true
    },
    {
        id: 7,
        title: "Lookbook",
        year: "2023",
        image: "assets/images/home/fashion2024-title.png",
        accentColor: "var(--accent-concrete)",
        slug: "lookbook-spiral",
        vertical: true
    },
    {
        id: 8,
        title: "Lookbook",
        year: "2024",
        image: "assets/images/home/lookbook2-title.jpg",
        accentColor: "var(--accent-urban)",
        slug: "lookbook-veil",
        vertical: true
    }
];

// Fonction pour charger les projets dans la grille
function loadProjects() {
    const grid = document.querySelector('.projects-grid');
    
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = `project-card fade-in delay-${index % 8}`;
        card.style.backgroundColor = project.accentColor;
        
        // Ajouter une classe supplémentaire pour les images verticales
        if (project.vertical) {
            card.classList.add('vertical-card');
        }
        
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-overlay">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-year">${project.year}</span>
            </div>
        `;
        
        card.addEventListener('click', () => {
            window.location.href = `projects/project-${project.slug}.html`;
        });
        
        grid.appendChild(card);
    });
}

// Charger les projets lorsque la page est prête
document.addEventListener('DOMContentLoaded', loadProjects);