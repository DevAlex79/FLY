class Lines {
    constructor() {
        this.lines = [];
    }

    addLine(line) {
        this.lines.push(line);
    }

    removeLine(index) {
        this.lines.splice(index, 1);
    }

    calculateTotalArticles() {
        return this.lines.reduce((total, line) => total + line.quantity, 0);
    }

    calculateTotalArticlesPrice() {
        return this.lines.reduce((total, line) => total + line.total, 0);
    }
}