export default class EatingStand {
    
    constructor(gridblock) {
        this.maxVisitors = 15;
        this.standType = "general";
        
        //if(typeof gridblock.maxVisitors !== 'undefined') this.maxVisitors = gridblock.maxVisitors;
        //if(typeof gridblock.standType !== 'undefined') this.standType = gridblock.standType;
    }
    setMaxVisitors(newMaxVisitors) {
        this.maxVisitors = newMaxVisitors;
    }

    getMaxVisitors() {
        return this.maxVisitors;
    }

    setStandType(newStandType) {
        this.standType = newStandType;
    }
    
    getStandType() {
        return this.standType;
    }
}