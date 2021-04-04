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

    canPlace(amount, maxAmountOfPeople) {
        console.log(amount, maxAmountOfPeople)
        if(this.fillType == "tent" || this.fillType == "drinkStand" || this.fillType=="drinkStandSurface" || this.fillType == "toilet"|| this.fillType=="highTree" || this.fillType == "wideTree" 
        || this.fillType=="shadowTree" || this.fillType =="foodStand" || this.fillType =="trashcan" || (amount + this.getAmountOfPeople() >= maxAmountOfPeople)) {
            return false;
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