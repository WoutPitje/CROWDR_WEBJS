export default class GridBlock {
    
    constructor(gridblock) {
        this.fillType = null;
        this.object = null;
        
        if(typeof gridblock.fillType !== 'undefined') this.fillType = gridblock.fillType;
        if(typeof gridblock.object !== 'undefined') this.object = gridblock.object;
    }
    setFillType(newFillType) {
        this.fillType = newFillType;
    }

    getFillType() {
        return this.fillType;
    }

    setObject(newObject) {
        this.object = newObject;
    }
    
    getObject() {
        return this.object;
    }
}