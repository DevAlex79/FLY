class Lines {
    constructor() {
        this.lines = [];
    }

    addLine(line) {
        this.lines.push(line);
    }

    removeLine(lineToRemove) {
        const indexToRemove = this.lines.indexOf(lineToRemove);
        if (indexToRemove !== -1) {
            this.lines.splice(indexToRemove, 1);
        }
    }

    calculateTotalArticles() {
        return this.lines.reduce((total, line) => total + line.quantity, 0);
    }

    calculateTotalArticlesPrice() {
        return this.lines.reduce((total, line) => total + line.total, 0);
    }
}