export default class GridBlock {
    
    constructor() {
        this.isFilled = false;
        this.fillType = null;
        this.id = null;
    }

    setId() {
        this.id = new DateTime();
    }
    getId() {
        return this.id;
    }
    setFilled(newIsFilled) {
        this.isFilled = newIsFilled;
        this.setId();
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