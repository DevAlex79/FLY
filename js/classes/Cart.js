class Cart {
    constructor() {
        this.lines = new Lines();
        this.shipment = new Shipment();
    }

    updateTotals() {
        let totalQty = this.lines.calculateTotalArticles();
        let totalArticlesPrice = this.lines.calculateTotalArticlesPrice();
        let totalPrice = totalArticlesPrice + this.shipment.price;
    
        document.getElementById('total-nombre-articles').textContent = totalQty;
        document.getElementById('prix-total-articles').textContent = totalArticlesPrice;
        document.getElementById('livraison-price').textContent = this.shipment.price;
        document.getElementById('prix-total').textContent = totalPrice;
    
        // Mise à jour de l'interface utilisateur avec les nouveaux totaux
        this.updateCartUI();
    
        console.log('Total Qty:', totalQty);
        console.log('Total Articles Price:', totalArticlesPrice);
        console.log('Total Price:', totalPrice);
    }

    updateCartUI() {
        const tableBody = document.getElementById('cartBody');
        // Effacer le contenu actuel
        tableBody.innerHTML = '';
    
        // Ajouter chaque ligne au tableau
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

         // Mise à jour de la quantité lors de la modification de l'input
        const input = newRow.querySelector('.item-input');
        input.addEventListener('input', () => {
            line.updateQuantity(parseInt(input.value, 10));
            this.updateTotals();
        });
    });
};
}


// Création d'une instance de Cart
const cart = new Cart();

/*
// Gestion du changement de quantité d'un article
document.querySelectorAll(".item-input").forEach((input) => {
    input.addEventListener("change", () => {
        cart.updateTotals();
    });

// Gestion de la suppression d'un article
    const removeButton = input.parentElement.querySelector(".remove-row");
    removeButton.addEventListener("click", () => {
        cart.lines.removeLine(input);
        cart.updateTotals();
    });

// Ajouter un nouvel article
    const addButton = input.parentElement.querySelector(".add-row");
    addButton.addEventListener("click", () => {
        cart.lines.addLine(input);
        cart.updateTotals();
    });
 */   

    document.addEventListener('DOMContentLoaded', function () {
        // Ajout de produits initiaux au panier
        const productA = new Line('Produit A', 15, 0);
        const productB = new Line('Produit B', 30, 0);
        const productC = new Line('Produit C', 7, 0);

        cart.lines.addLine(productA);
        cart.lines.addLine(productB);
        cart.lines.addLine(productC);

        const tableBody = document.getElementById('cartBody');
        const addRowButton = document.getElementById('addRow');

    // Ajout d'un écouteur de clic au bouton pour ajouter une nouvelle ligne
    addRowButton.addEventListener('click', function() {
        const newLine = new Line('Nouvel article');
        cart.lines.addLine(newLine);
        cart.updateTotals();
    });

    // Ajout d'un écouteur de clic à chaque bouton de suppression de ligne
    tableBody.addEventListener('click', function(event) {
        /*if (event.target.classList.contains('remove-row')) {
            const row = event.target.closest('tr');
            const itemInput = row.querySelector('.item-input');
            cart.lines.removeLine(itemInput);
            cart.updateTotals();
        }*/
        if (event.target.classList.contains('remove-row')) {
            const index = [...tableBody.children].indexOf(event.target.closest('tr'));
            cart.lines.removeLine(index);
            cart.updateTotals();
        }
    });

    // Appel de la fonction updateTotals une fois pour afficher les totaux initiaux
    cart.updateTotals();    

});   





