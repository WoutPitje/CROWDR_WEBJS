export default class Trashcan {
    
    constructor() {
        this.kiloCapacity = 5;
        this.emptyTime = "08:00";
        this.filled = 0;
    }
    setKiloCapacity(newKiloCapacity) {
        this.kiloCapacity = newKiloCapacity;
    }

    setFilled() {
        this.filled = 0;
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

    fill() {
        this.filled ++;
        if(this.filled >= 10) this.filled = 0;
    }
}