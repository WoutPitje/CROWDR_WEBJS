export default class GridBlock {
    
    constructor(gridblock) {
        this.fillType = null;
        
        if(typeof gridblock.fillType !== 'undefined') this.fillType = gridblock.fillType;
    }
    setFillType(newFillType) {
        this.fillType = newFillType;
    }
    getFillType() {
        return this.fillType;
    }
}