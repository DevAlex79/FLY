document.addEventListener('DOMContentLoaded', function () {
    // Fetch les données des articles
    fetch('data/articles.json')
        .then(response => response.json())
        .then(articles => {
        const articlesContainer = document.getElementById('articles');

        // Afficher chaque article dans la liste
        articles.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.innerHTML = `
    <div class="article">
        <div class="image">
            <a href="singlearticle.html?id=${article.id}" target="_blank">
                <img src="${article.image}" alt="${article.title}">
            </a>
        </div>
        <div class="texte-article">
            <a href="singlearticle.html?id=${article.id}" target="_blank">
                <h2 class="categorie-${article.category.toLowerCase()}">${article.category}</h2>
                <h1 class="titre">${article.title}</h1>
            </a>
            <p>${article.description}</p>
        </div>
    </div>
`;
            articlesContainer.appendChild(articleElement);
        });
    })
        .catch(error => console.error('Erreur lors de la récupération des données des articles:', error));
});
