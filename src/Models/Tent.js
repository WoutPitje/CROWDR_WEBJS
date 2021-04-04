export default class Tent {
    
    constructor() {
        this.maxVisitors = 5;
        this.openingTimes = "08:00";
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