class Cart {
    constructor() {
        this.lines = new Lines();
        this.shipment = new Shipment();
    }

    // ... (définition des méthodes de la classe)

    updateTotals() {
        // Calculer les totaux
        let totalQty = this.lines.calculateTotalArticles();
        let totalArticlesPrice = this.lines.calculateTotalArticlesPrice();
        let totalPrice = totalArticlesPrice + this.shipment.price;

        // Mettre à jour les éléments HTML
        document.getElementById("total-nombre-articles").textContent = totalQty;
        document.getElementById("prix-total-articles").textContent = totalArticlesPrice;
        document.getElementById("livraison-price").textContent = this.shipment.price;
        document.getElementById("prix-total").textContent = totalPrice;

        // Mise à jour de l'interface utilisateur
        this.updateCartView();

        console.log("Total Qty:", totalQty);
        console.log("Total Articles Price:", totalArticlesPrice);
        console.log("Total Price:", totalPrice);
    }


    updateCartView() {
        const tableBody = document.getElementById("cartBody");
        tableBody.innerHTML = "";

        this.lines.lines.forEach((line, index) => {
            const newRow = document.createElement('tr');
            newRow.dataset.index = index; // Ajoute l'index comme attribut de données
            newRow.innerHTML = `
                <td>${line.name}</td>
                <td><input type="number" class="item-input" data-unit-price="${line.unitPrice}" value="${line.quantity}" min="0"></td>
                <td class="item-price">${line.unitPrice}</td>
                <td class="item-total">${line.total}</td>
                <td><button class="remove-row" data-index="${index}">X</button></td>
            `;
            tableBody.appendChild(newRow);
    
            const input = newRow.querySelector('.item-input');
            input.addEventListener('input', () => {
                const newQuantity = parseInt(input.value, 10);
                line.updateQuantity(newQuantity);
                this.updateTotals();
                this.updateCartView();
            });
    
            const removeButton = newRow.querySelector('.remove-row');
            removeButton.addEventListener('click', () => {
                this.lines.removeLine(line);
                this.updateTotals();
                this.updateCartView();
            });
        });

        // Ajouter un gestionnaire d'événements pour les champs de quantité
        /*tableBody.addEventListener("input", event => {
            if (event.target.classList.contains("item-input")) {
                const index = [...tableBody.children].indexOf(event.target.closest("tr"));
                const newQuantity = parseInt(event.target.value, 10);
                this.lines.lines[index].updateQuantity(newQuantity);
                this.updateTotals();
                this.updateCartView();
            }
        });*/

        tableBody.addEventListener("input", event => {
            if (event.target.classList.contains("item-input")) {
                const index = parseInt(event.target.closest("tr").dataset.index, 10);
                console.log('Index:', index);
                console.log('Lines Length:', this.lines.lines.length);
        
                if (!isNaN(index) && index >= 0 && index < this.lines.lines.length) {
                    const newQuantity = parseInt(event.target.value, 10);
                    this.lines.lines[index].updateQuantity(newQuantity);
                    this.updateTotals();
                    this.updateCartView();
                } else {
                    console.error('Index invalide ou hors limites.');
                }
            }
        });
        
        // Ajouter un gestionnaire d'événements pour les boutons de suppression de ligne
        tableBody.addEventListener("click", event => {
            if (event.target.classList.contains("remove-row")) {
                const index = [...tableBody.children].indexOf(event.target.closest("tr"));
                this.lines.removeLine(index);
                this.updateTotals();
                this.updateCartView();
            }
        });
    }

    // Ajoutez d'autres méthodes de la classe Cart ici
}

document.addEventListener('DOMContentLoaded', function () {
    const cart = new Cart(); // Instancier l'objet Cart

    // Initialisation du panier
    /* function initializeCart() {
        // Ajouter des produits initiaux au panier
        const productA = new Line('Produit A', 15, 0);
        const productB = new Line('Produit B', 30, 0);
        const productC = new Line('Produit C', 7, 0);

        cart.lines.addLine(productA);
        cart.lines.addLine(productB);
        cart.lines.addLine(productC);

        // Appeler la fonction updateTotals une fois pour afficher les totaux initiaux
        cart.updateTotals();
        // Appeler la fonction updateCartView pour afficher la vue initiale
        cart.updateCartView();
    } */

    async function initializeCart() {
        try {
            // Effectuer une requête Ajax pour récupérer les données des produits
            const response = await fetch('/data/cart.json');
    
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données des produits. Statut: ' + response.status);
            }
    
            const products = await response.json();
    
            // Ajouter chaque produit au panier
            products.forEach(productData => {
                const product = new Line(productData.name, productData.unitPrice, 0);
                cart.lines.addLine(product);
            });
    
            // Appeler la fonction updateTotals une fois pour afficher les totaux initiaux
            cart.updateTotals();
            // Appeler la fonction updateCartView pour afficher la vue initiale
            cart.updateCartView();
        } catch (error) {
            console.error('Erreur lors de la récupération des données des produits:', error.message);
        }
    }

    // Gestionnaire d'événement pour le bouton "Ajouter une ligne"
    const addRowButton = document.getElementById('addRow');
    addRowButton.addEventListener('click', function () {
        const newLine = new Line('Nouvel article');
        cart.lines.addLine(newLine);
        cart.updateTotals();
        cart.updateCartView();
    });

    // Gestionnaire d'événement pour les boutons radio de livraison
    const livraisonRadios = document.querySelectorAll('input[name="livraison-type"]');
    livraisonRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            cart.shipment.setShipmentType(this.value);
            cart.updateTotals();
            cart.updateCartView();
        });
    });

    // Appeler la fonction initializeCart au chargement de la page
    initializeCart();
});

