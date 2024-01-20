document.addEventListener('DOMContentLoaded', function () {
    // Récupérer l'ID de l'article depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get('id'));

    // Fetch les données des articles pour obtenir les détails de l'article
    fetch('data/articles.json')
        .then(response => response.json())
        .then(articles => {
            // Utiliser l'ID pour récupérer les détails de l'article
            const articleDetails = articles.find(article => article.id === articleId);

            if (!articleDetails) {
                console.error('Article non trouvé.');
            } else {
                // Afficher les détails de l'article dans votre page HTML
                const articleDetailsContainer = document.getElementById('articleDetails');
                articleDetailsContainer.innerHTML = `
                    <div class="image">
                        <img src="${articleDetails.image}" alt="${articleDetails.title}">
                    </div>
                    <div class="texte-article">
                        <h2 class="categorie-${articleDetails.category.toLowerCase()}">${articleDetails.category}</h2>
                        <h1 class="titre">${articleDetails.title}</h1>
                        <p>${articleDetails.description}</p>
                    </div>
                `;
            }
        })
        .catch(error => console.error('Erreur lors de la récupération des données de l\'article:', error));
});

