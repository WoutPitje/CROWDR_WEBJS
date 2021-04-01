export default class Trashcan {
    
    constructor(gridblock) {
        this.kiloCapacity = 5;
        this.emptyTime = "08:00";
        
        //if(typeof gridblock.kiloCapacity !== 'undefined') this.kiloCapacity = gridblock.kiloCapacity;
        //if(typeof gridblock.emptyTime !== 'undefined') this.emptyTime = gridblock.emptyTime;
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