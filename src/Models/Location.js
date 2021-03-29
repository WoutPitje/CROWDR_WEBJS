export default class Location {

    constructor(location) {
        if(typeof location.name !== 'undefined') this.name = location.name;
        
        if(typeof location.visitors !== 'undefined') this.visitors = location.visitors;

        if(typeof location.tents !== 'undefined') this.tents = location.tents;

        if(typeof location.eatingStalls !== 'undefined') this.eatingStalls = location.eatingStalls;

        if(typeof location.drinkStalls !== 'undefined') this.drinkStalls = location.drinkStalls;
        
        if(typeof location.highTrees !== 'undefined') this.highTrees = location.highTrees;
 
        if(typeof location.wideTrees !== 'undefined') this.wideTrees = location.wideTrees;

        if(typeof location.shadowTrees !== 'undefined') this.shadowTrees = location.shadowTrees;

        if(typeof location.toiletBuildings !== 'undefined') this.toiletBuildings = location.toiletBuildings;

        if(typeof location.trashcans !== 'undefined') this.trashCans = location.trashCans;
        
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    getVisitors() {
        return this.visitors;
    }

    setVisitors(visitors) {
        this.visitors = visitors;
    }

    setAmountOfTents(tents) {
        this.tents = tents;
    }

    setAmountOfEatingStalls(stalls) {
        this.eatingStalls = stalls;
    }

    setAmountOfDrinkStalls(stalls) {
        this.drinkStalls = stalls;
    }

    setAmountOfHighTrees(trees) {
        this.highTrees = trees;
    }

    setAmountOfWideTrees(trees) {
        this.wideTrees = trees;
    }

    setAmountOfShadowTrees(trees) {
        this.shadowTrees = trees;
    }

    setAmountOfToiletBuildings(toiletBuildings) {
        this.toiletBuildings = toiletBuildings;
    }

    setAmountOfTrashCans(trashcans) {
        this.trashcans = trashcans;
    }
    getAmountOfFieldsFilled() {
        let filled = 0;
        filled = this.tents * 9;
        filled = filled + (this.eatingStalls);
        filled = filled + (this.drinkStalls * 2);
        filled = filled + (this.highTrees);
        filled = filled + (this.wideTrees * 2);
        filled = filled + (this.shadowTrees * 9);
        filled = filled + (this.toiletBuildings * 3);

        return filled;
    }
}