export default class GridBlock {
    
    constructor(gridblock) {
        this.fillType = null;
        this.groupsOfPeople = [];
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
    addGroupOfPeople(group) {
        this.groupsOfPeople.push(group);
    }

    getAmountOfPeople() {
        let amount = 0;
        
        this.groupsOfPeople.forEach(group => {
            amount += group.getAmountOfPeople();
        })

        return amount;
    }

    canPlace(amount, maxAmountOfPeople, weather) {
        console.log(amount, maxAmountOfPeople)
        if(this.fillType == "tent" || this.fillType == "drinkStand" || this.fillType == "toilet" || this.fillType=="highTree" || this.fillType == "wideTree" 
        || this.fillType=="shadowTree" || this.fillType =="foodStand" || this.fillType =="trashcan" || (amount + this.getAmountOfPeople() >= maxAmountOfPeople)) {
            return false;
        }
        if(weather == "Rain") {
            let percentage;
            let number = Math.floor(Math.random() * 100);
            if(this.fillType == "tentSurface") {
                percentage = 98;
            } else {
                percentage = 2;
            }
            if(number < percentage) {
                return true;
            } else {
                return false;
            }
        }
        if(weather == "Clear") {
            let percentage;
            let number = Math.floor(Math.random() * 100);
            if(this.fillType == "highTreeSurface" || this.fillType == "shadowTreeSurface" || this.fillType == "wideTreeSurface" || this.fillType == "drinkStandSurface") {
                percentage = 99;
            } else {
                percentage = 1;
            }
            if(number < percentage) {
                return true;
            } else {
                return false;
            }
        }
        return true;

    }

    getAllPeople() {
        let people = [];
        this.groupsOfPeople.forEach(group => {
            group.people.forEach(person => {

                people.push(person);
            })
        });

        return people;
    }

    setObject(newObject) {
        this.object = newObject;
    }
    
    getObject() {
        return this.object;
    }
}