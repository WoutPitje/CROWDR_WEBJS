export default class GridBlock {
    
    constructor() {
        this.isFilled = false;
        this.fillType = null;
    }

    setFilled(newIsFilled) {
        this.isFilled = newIsFilled;
    }

    getFilled() {
        return this.isFilled;
    }

    setFillType(newFillType) {
        this.fillType = newFillType;
    }

    getFillType() {
        return this.fillType;
    }
}