export default class GridBlock {
    
    constructor(gridblock) {
        this.fillType =null;
        this.isFilled =null;
        if(typeof gridblock.isFilled !== 'undefined') this.isFilled = gridblock.isFilled;
        if(typeof gridblock.fillType !== 'undefined') this.fillType = gridblock.fillType;
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