// Données des projets (à remplacer par des appels API ou des données statiques)
const projects = [
    {
        id: 1,
        title: "SoloDate",
        year: "2024",
        image: "assets/images/project-solodate/cover.jpg",
        accentColor: "var(--accent-sage)",
        slug: "solodate"
    },
    {
        id: 2,
        title: "Beyond the Echo",
        year: "2023",
        image: "assets/images/project-beyond-the-echo/cover.jpg",
        accentColor: "var(--accent-window)",
        slug: "beyond-the-echo"
    },
    {
        id: 3,
        title: "Interflow",
        year: "2023",
        image: "assets/images/project-interflow/cover.jpg",
        accentColor: "var(--accent-jade)",
        slug: "interflow"
    },
    {
        id: 4,
        title: "Fourniture lampes",
        year: "2023",
        image: "assets/images/project-fourniture-lampes/cover.jpg",
        accentColor: "var(--accent-sand)",
        slug: "fourniture-lampes"
    },
    {
        id: 5,
        title: "Fourniture cuir",
        year: "2023",
        image: "assets/images/project-fourniture-cuir/cover.jpg",
        accentColor: "var(--accent-leather)",
        slug: "fourniture-cuir"
    },
    {
        id: 6,
        title: "Lookbook voile",
        year: "2022",
        image: "assets/images/project-lookbook-voile/cover.jpg",
        accentColor: "var(--accent-veil)",
        slug: "lookbook-voile"
    },
    {
        id: 7,
        title: "Lookbook spirale",
        year: "2022",
        image: "assets/images/project-lookbook-spirale/cover.jpg",
        accentColor: "var(--accent-concrete)",
        slug: "lookbook-spirale"
    },
    {
        id: 8,
        title: "Lookbook mannequin",
        year: "2022",
        image: "assets/images/project-lookbook-mannequin/cover.jpg",
        accentColor: "var(--accent-urban)",
        slug: "lookbook-mannequin"
    }
];

// Fonction pour charger les projets dans la grille
function loadProjects() {
    const grid = document.querySelector('.projects-grid');
    
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = `project-card fade-in delay-${index % 8}`;
        card.style.backgroundColor = project.accentColor;
        
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