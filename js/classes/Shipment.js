/*
class Shipment {
    constructor(type = 'relais') {
        this.type = type;
        this.price = this.calculatePrice();
    }
    calculatePrice() {
        return this.type === 'relais' ? 5 : 12;
    }
*/

/*
class Shipment {
    constructor(type = 'relais') {
        this.type = type;
        this.price = this.calculatePrice();
    }

    calculatePrice() {
        return this.type === 'relais' ? 5 : (this.type === 'domicile' ? 12 : 0);
    }

    setShipmentType(type) {
        this.type = type;
        this.price = this.calculatePrice();  // Ajout de cette ligne pour mettre à jour le prix
    }
}
*/

class Shipment {
    constructor() {
        this.type = 'relais'; // Par défaut à relais
        this.calculatePrice(); // Initialiser le prix
    }

    setShipmentType(type) {
        this.type = type;
        this.calculatePrice();
    }

    calculatePrice() {
        this.price = this.type === 'relais' ? 5 : (this.type === 'domicile' ? 12 : 0);
    }
}








