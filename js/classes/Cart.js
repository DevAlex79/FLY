class Cart {
    constructor() {
        this.lines = new Lines();
        this.shipment = new Shipment();
    }

    // ... (définition des méthodes de la classe)

    updateCartView() {
        const tableBody = document.getElementById("cartBody");
        tableBody.innerHTML = "";

        this.lines.lines.forEach(line => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${line.name}</td>
                <td><input type="number" class="item-input" data-unit-price="${line.unitPrice}" value="${line.quantity}" min="0"></td>
                <td class="item-price">${line.unitPrice}</td>
                <td class="item-total">${line.total}</td>
                <td><button class="remove-row">X</button></td>
            `;
            tableBody.appendChild(newRow);

            const input = newRow.querySelector('.item-input');
            input.addEventListener('input', () => {
                const newQuantity = parseInt(input.value, 10);
                line.updateQuantity(newQuantity);
                this.updateTotals();
                this.updateCartView();
            });
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
    function initializeCart() {
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

