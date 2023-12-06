class Shipment {
    constructor(type = 'relais') {
        this.type = type;
        this.price = this.calculatePrice();
    }
    calculatePrice() {
        return this.type === 'relais' ? 5 : 12;
    }
    
}