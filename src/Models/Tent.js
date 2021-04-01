export default class Tent {
    
    constructor(gridblock) {
        this.maxVisitors = 5;
        this.openingTimes = "08:00";
        
        //if(typeof gridblock.maxVisitors !== 'undefined') this.maxVisitors = gridblock.maxVisitors;
        //if(typeof gridblock.openingTimes !== 'undefined') this.openingTimes = gridblock.openingTimes;
    }
    setMaxVisitors(newMaxVisitors) {
        this.maxVisitors = newMaxVisitors;
    }

    getMaxVisitors() {
        return this.maxVisitors;
    }

    setOpeningTimes(newOpeningTimes) {
        this.openingTimes = newOpeningTimes;
    }
    
    getOpeningTimes() {
        return this.openingTimes;
    }
}