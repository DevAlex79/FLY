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

const itemInputs = document.querySelectorAll('.item-input');
    const itemPrices = document.querySelectorAll('.item-price');
    const itemTotals = document.querySelectorAll('.item-total');
    const totalNombreArticles = document.getElementById('total-nombre-articles');
    const prixTotal = document.getElementById('prix-total');

    itemInputs.forEach((input, index) => {
      input.addEventListener('input', () => updateTotals(index));
    });

    function updateTotals(index) {
      const itemInput = itemInputs[index];
      const itemPrice = itemPrices[index];
      const itemTotal = itemTotals[index];

      const itemQty = parseFloat(itemInput.value) || 0;
      const unitPrice = parseFloat(itemInput.dataset.unitPrice);

      const totalItemPrice = itemQty * unitPrice;
      itemTotal.textContent = totalItemPrice;

      let totalQty = 0;
      let totalPrice = 0;

      itemTotals.forEach((total, i) => {
        totalQty += parseFloat(itemInputs[i].value) || 0;
        totalPrice += parseFloat(total.textContent) || 0;
      });

      totalNombreArticles.textContent = totalQty;
      prixTotal.textContent = totalPrice;
    }

    // Appel de la fonction updateTotals une fois pour afficher les totaux initiaux
    updateTotals(0);
    updateTotals(1);
    updateTotals(2);











