export default class GridBlock {
    
    constructor(gridblock) {
        this.fillType = null;
        this.groupsOfPeople = [];
        if(typeof gridblock.fillType !== 'undefined') this.fillType = gridblock.fillType;
    }
    setFillType(newFillType) {
        this.fillType = newFillType;
    }
    getFillType() {
        return this.fillType;
    }
    addGroupOfPeople(group) {
        this.groupsOfPeople.push(group);
    }
}