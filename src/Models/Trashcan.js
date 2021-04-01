export default class Trashcan {
    
    constructor() {
        this.kiloCapacity = 5;
        this.emptyTime = "08:00";
    }
    setKiloCapacity(newKiloCapacity) {
        this.kiloCapacity = newKiloCapacity;
    }

    getKiloCapacity() {
        return this.kiloCapacity;
    }

    setEmptyTime(newEmptyTime) {
        this.emptyTime = newEmptyTime;
    }
    
    getEmptyTime() {
        return this.emptyTime;
    }
}