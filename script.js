/*    A FACTORISER

    // Sélectionner les champs d'entrée pour chaque article
const tShirtInput = document.getElementById('t-shirt-input');
const pantalonInput = document.getElementById('pantalon-input');
const chaussettesInput = document.getElementById('chaussettes-input');

// Sélectionner les éléments qui affichent la quantité et le prix total
const tShirtPrice = document.getElementById('t-shirt-price');
const pantalonPrice = document.getElementById('pantalon-price');
const chaussettesPrice = document.getElementById('chaussettes-price');

const tShirtTotal = document.getElementById('t-shirt-total');
const pantalonTotal = document.getElementById('pantalon-total');
const chaussettesTotal = document.getElementById('chaussettes-total');

const totalNombreArticles = document.getElementById('total-nombre-articles');
const prixTotal = document.getElementById('prix-total');

tShirtInput.addEventListener('input', updateTotals);
pantalonInput.addEventListener('input', updateTotals);
chaussettesInput.addEventListener('input', updateTotals);

// Fonction pour mettre à jour les totaux
function updateTotals() {
  const tShirtQty = parseFloat(tShirtInput.value) || 0;
  const pantalonQty = parseFloat(pantalonInput.value) || 0;
  const chaussettesQty = parseFloat(chaussettesInput.value) || 0;

  const tShirtUnitPrice = parseFloat(tShirtPrice.textContent);
  const pantalonUnitPrice = parseFloat(pantalonPrice.textContent);
  const chaussettesUnitPrice = parseFloat(chaussettesPrice.textContent);

  const tShirtTotalPrice = tShirtQty * tShirtUnitPrice;
  const pantalonTotalPrice = pantalonQty * pantalonUnitPrice;
  const chaussettesTotalPrice = chaussettesQty * chaussettesUnitPrice;

  tShirtTotal.textContent = tShirtTotalPrice;
  pantalonTotal.textContent = pantalonTotalPrice;
  chaussettesTotal.textContent = chaussettesTotalPrice;

  const totalQty = tShirtQty + pantalonQty + chaussettesQty;
  totalNombreArticles.textContent = totalQty;

  const totalPrix = tShirtTotalPrice + pantalonTotalPrice + chaussettesTotalPrice;
  prixTotal.textContent = totalPrix;
}

// Appel de la fonction updateTotals une fois pour afficher les totaux initiaux
updateTotals();

*/

/************************ Version factorisée ************************************/

/*Utilisation de classes et d'attributs de données pour regrouper les éléments similaires (les entrées, les prix et les totaux des articles). Utilisation d'une boucle pour ajouter des gestionnaires d'événements à toutes les entrées d'article et mettre à jour les totaux de manière dynamique. Réduction de duplication de code. Rend le code plus extensible (ajout d'articles possible).*/

const itemInputs = document.querySelectorAll('.item-input');
    const itemTotals = document.querySelectorAll('.item-total');
    const totalNombreArticles = document.getElementById('total-nombre-articles');
    const prixTotalArticles = document.getElementById('prix-total-articles');
    const prixTotal = document.getElementById('prix-total');
    const livraisonTypeRadios = document.querySelectorAll('input[name="livraison-type"]');
    const livraisonPrice = document.getElementById('livraison-price');
    const livraisonTotal = document.getElementById('livraison-total');

    const prixLivraisonRelais = 5;
    const prixLivraisonDomicile = 12;

    itemInputs.forEach((input, index) => {
      input.addEventListener('input', () => updateTotals());
    });

    livraisonTypeRadios.forEach(radio => {
      radio.addEventListener('change', () => updateTotals());
    });

    function updateTotals() {
      let totalQty = 0;
      let totalArticlesPrice = 0;
      let totalPrice = 0;

      itemTotals.forEach((total, index) => {
        const itemInput = itemInputs[index];
        const unitPrice = parseFloat(itemInput.dataset.unitPrice) || 0;
        const itemQty = parseFloat(itemInput.value) || 0;
        const totalItemPrice = itemQty * unitPrice;

        total.textContent = totalItemPrice;
        totalArticlesPrice += totalItemPrice;
        totalQty += itemQty;
      });

      let livraisonTypeText = '';
      let livraisonUnitPrice = 0;

      const selectedLivraisonType = document.querySelector('input[name="livraison-type"]:checked');

      if (selectedLivraisonType) {
        livraisonTypeText = selectedLivraisonType.value;
        livraisonUnitPrice = (livraisonTypeText === 'relais') ? prixLivraisonRelais : prixLivraisonDomicile;
      }

      const livraisonQty = 1; // On suppose une seule livraison pour simplifier
      const livraisonTotalPrice = livraisonQty * livraisonUnitPrice;
      livraisonTotal.textContent = livraisonTotalPrice;
      livraisonPrice.textContent = livraisonUnitPrice;

      totalQty += livraisonQty;
      totalPrice = totalArticlesPrice + livraisonTotalPrice;

      totalNombreArticles.textContent = totalQty - livraisonQty;
      prixTotalArticles.textContent = totalArticlesPrice;
      prixTotal.textContent = totalPrice;
    }

    //Gérez l'ajout ou la suppression d'une ligne

    document.addEventListener('DOMContentLoaded', function () {
      const tableBody = document.querySelector('#checkout tbody');
      const addRowButton = document.getElementById('addRow');

      // Ajouter un écouteur de clic au bouton pour ajouter une nouvelle ligne
      addRowButton.addEventListener('click', addRow);

      // Ajouter un écouteur de clic à chaque bouton de suppression de ligne
      tableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-row')) {
          removeRow(event.target);
        }
      });

      function addRow() {
        const lastProductRow = document.querySelector('#checkout tbody tr:last-child:not([colspan])');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>Nouvel article</td>
          <td><input type="number" class="item-input" data-unit-price="0" value="0" min="0"></td>
          <td class="item-price">0</td>
          <td class="item-total">0</td>
          <td><button class="remove-row">X</button></td>
        `;
        tableBody.insertBefore(newRow, lastProductRow.nextSibling);
        // Mettez à jour les totaux après l'ajout d'une ligne
        updateTotals();
      }

      function removeRow(button) {
        const row = button.closest('tr');
        tableBody.removeChild(row);
        // Mettez à jour les totaux après la suppression d'une ligne
        updateTotals();
      }

// Appelez la fonction updateTotals une fois pour afficher les totaux initiaux
    updateTotals()
    });










