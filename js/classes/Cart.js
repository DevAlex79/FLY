class Cart {
    constructor() {
        this.lines = new Lines();
        this.shipment = new Shipment();
    }

    /*Explications détaillées updateTotals() :

    Calcul des totaux :
    totalQty : Utilise la méthode calculateTotalArticles de la classe Lines pour obtenir la quantité totale d'articles dans le panier.
    totalArticlesPrice : Utilise la méthode calculateTotalArticlesPrice de la classe Lines pour obtenir le prix total des articles dans le panier.
    totalPrice : Additionne le prix total des articles avec le coût de l'expédition (this.shipment.price) pour obtenir le prix total général du panier.

    Mise à jour des éléments HTML :
    Utilise document.getElementById pour obtenir des références aux éléments HTML que vous souhaitez mettre à jour.
    Utilise la propriété textContent pour mettre à jour le contenu textuel de ces éléments avec les nouveaux totaux calculés.

    Mise à jour de l'interface utilisateur :
    Appelle la méthode updateCartUI pour mettre à jour l'interface utilisateur avec les nouvelles données du panier.

    Affichage des totaux dans la console :
    Utilise console.log pour afficher les totaux calculés dans la console du navigateur. Utile pour le débogage.
    */

    updateTotals() {
    let totalQty = this.lines.calculateTotalArticles();
    let totalArticlesPrice = this.lines.calculateTotalArticlesPrice();
    let totalPrice = totalArticlesPrice + this.shipment.price;

    document.getElementById("total-nombre-articles").textContent = totalQty;
    document.getElementById("prix-total-articles").textContent = totalArticlesPrice;
    document.getElementById("livraison-price").textContent = this.shipment.price;
    document.getElementById("prix-total").textContent = totalPrice;

    // Mise à jour de l'interface utilisateur avec les nouveaux totaux
    this.updateCartUI();

    console.log("Total Qty:", totalQty);
    console.log("Total Articles Price:", totalArticlesPrice);
    console.log("Total Price:", totalPrice);
    }

    updateCartUI() {
    const tableBody = document.getElementById("cartBody");
    // Effacer le contenu actuel
    tableBody.innerHTML = "";

    // Ajouter chaque ligne au tableau
    this.lines.lines.forEach((line) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${line.name}</td>
            <td><input type="number" class="item-input" data-unit-price="${line.unitPrice}" value="${line.quantity}" min="0"></td>
            <td class="item-price">${line.unitPrice}</td>
            <td class="item-total">${line.total}</td>
            <td><button class="remove-row">X</button></td>
        `;
        tableBody.appendChild(newRow);

      // Mise à jour de la quantité lors de la modification de l'input
        const input = newRow.querySelector(".item-input");
        input.addEventListener("input", () => {
            line.updateQuantity(parseInt(input.value, 10));
            this.updateTotals();
        });
    });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const cart = new Cart(); // Instancier l'objet Cart

    // Ajouter des produits initiaux au panier
    const productA = new Line('Produit A', 15, 0);
    const productB = new Line('Produit B', 30, 0);
    const productC = new Line('Produit C', 7, 0);

    cart.lines.addLine(productA);
    cart.lines.addLine(productB);
    cart.lines.addLine(productC);

    // Initialiser le tableau du panier avec les produits
    const tableBody = document.getElementById('cartBody');
    cart.lines.lines.forEach(line => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${line.name}</td>
            <td><input type="number" class="item-input" data-unit-price="${line.unitPrice}" value="${line.quantity}" min="0"></td>
            <td class="item-price">${line.unitPrice}</td>
            <td class="item-total">${line.total}</td>
            <td><button class="remove-row">X</button></td>
        `;
        tableBody.appendChild(newRow);

        // Mise à jour de la quantité lors de la modification de l'input
        const input = newRow.querySelector('.item-input');
        input.addEventListener('input', () => {
            line.updateQuantity(parseInt(input.value, 10));
            cart.updateTotals();
        });
    });

    // Ajouter un gestionnaire d'événements pour les boutons "Ajouter une ligne"
    const addRowButton = document.getElementById('addRow');
    addRowButton.addEventListener('click', function () {
        const newLine = new Line('Nouvel article');
        cart.lines.addLine(newLine);
        cart.updateTotals();
    });

    // Ajout d'un écouteur de clic à chaque bouton de suppression de ligne

    /*Explications détaillées :
    Écouteur d'événements (addEventListener) :
    tableBody.addEventListener('click', function(event) { : Ajoute un écouteur d'événements au <tbody> de la table. Cela signifie que l'événement est déclenché lorsqu'un clic se produit à l'intérieur du corps de la table.

    Vérification de la classe (classList.contains) :
    if (event.target.classList.contains('remove-row')) { : Vérifie si l'élément sur lequel l'utilisateur a cliqué a la classe CSS 'remove-row'. Cela permet de déterminer si l'événement de clic a été déclenché par le bouton "X" (bouton de suppression) dans une ligne de la table.

    Obtention de l'indice de la ligne (indexOf) :
    const index = [...tableBody.children].indexOf(event.target.closest('tr')); : Obtient l'indice de la ligne (<tr>) qui contient le bouton sur lequel l'utilisateur a cliqué. Cela se fait en utilisant event.target.closest('tr') pour remonter dans l'arborescence DOM à partir du bouton cliqué jusqu'à trouver le parent le plus proche de type <tr>. Ensuite, indexOf est utilisé pour trouver l'indice de cette ligne dans la liste des enfants du <tbody>.

    Suppression de la ligne du panier (cart.lines.removeLine(index)) :
    cart.lines.removeLine(index); : Appelle la méthode removeLine de l'objet lines de la classe Cart pour supprimer la ligne correspondante du panier.

    Mise à jour des totaux (cart.updateTotals()) :
    cart.updateTotals(); : Après avoir supprimé la ligne, mise à jour des totaux du panier en appelant la méthode updateTotals de la classe Cart. Cela garantit que les totaux reflètent les changements dans le panier après la suppression de la ligne.*/

    tableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-row")) {
        const index = [...tableBody.children].indexOf(event.target.closest("tr"));
        cart.lines.removeLine(index);
        cart.updateTotals();
        }
    });

    // Ajouter un gestionnaire d'événements pour les boutons radio de livraison
    const livraisonRadios = document.querySelectorAll('input[name="livraison-type"]');
    livraisonRadios.forEach(function (radio) {
        radio.addEventListener('change', function () {
            cart.shipment.setShipmentType(this.value);
            cart.updateTotals();
        });
    });

    // Appeler la fonction updateTotals une fois pour afficher les totaux initiaux
    cart.updateTotals();
});

