class Line {
    constructor(name, unitPrice = 0, quantity = 0) {
        this.name = name;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.total = this.calculateTotal();
    }
    calculateTotal() {
        return this.unitPrice * this.quantity;
    }

    updateQuantity(newQuantity) {
        this.quantity = newQuantity;
        this.total = this.calculateTotal();
    }
}