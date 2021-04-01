export default class EatingStand {
    
    constructor() {
        this.maxVisitors = 15;
        this.standType = "general";
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