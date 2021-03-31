import Grid from './Grid.js'

export default class Location {

    constructor(location) {
        this.treesAreSet = false;
        this.stepsAreSet = false;
        
        this.grid = new Grid(null);
        if(typeof location.treesAreSet !== 'undefined') this.treesAreSet = location.treesAreSet;

        if(typeof location.stepsAreSet !== 'undefined') this.stepsAreSet = location.stepsAreSet;
        
        if(typeof location.name !== 'undefined') this.name = location.name;
        
        if(typeof location.visitors !== 'undefined') this.visitors = location.visitors;

        if(typeof location.tents !== 'undefined') this.tents = location.tents;

        if(typeof location.eatingStands !== 'undefined') this.eatingStands = location.eatingStands;

        if(typeof location.drinkStands !== 'undefined') this.drinkStands = location.drinkStands;
        
        if(typeof location.highTrees !== 'undefined') this.highTrees = location.highTrees;
 
        if(typeof location.wideTrees !== 'undefined') this.wideTrees = location.wideTrees;

        if(typeof location.shadowTrees !== 'undefined') this.shadowTrees = location.shadowTrees;

        if(typeof location.toiletBuildings !== 'undefined') this.toiletBuildings = location.toiletBuildings;

        if(typeof location.trashcans !== 'undefined') this.trashcans = location.trashcans;

        if(typeof location.grid !== 'undefined') this.grid = new Grid(location.grid);
        
    
        
    }
    canPlace(x,y, type) {
        switch (type) {
            case "tent": return this.grid.canPlaceTent(x,y);
            case "drinkStand":return this.grid.canPlaceDrinkStand(x,y);
            case "foodStand": return this.grid.canPlaceFoodStand(x,y);
            case "toilet": return this.grid.canPlaceToilets(x,y);
            case "trashcan": return this.grid.canPlaceTrashcans(x,y);
            case "highTree": return this.grid.canPlaceHighTrees(x,y);
            case "wideTree": return this.grid.canPlaceWideTrees(x,y);
            case "shadowTree": return this.grid.canPlaceShadowTrees(x,y);
            case "default": return true;
        }
    }

    placeItem(x,y,type) {
        switch (type) {
            case "tent": this.tents--;this.grid.placeTent(x,y); break;
            case "drinkStand": this.drinkStands--;this.grid.placeDrinkStand(x,y);break;
            case "foodStand": this.eatingStands--;this.grid.placeFoodStand(x,y);break;
            case "toilet":this.toiletBuildings--; this.grid.placeToilets(x,y);break;
            case "trashcan": this.trashcans--;this.grid.placeTrashcans(x,y);break;
            case "highTree":this.highTrees--; this.grid.placeHighTrees(x,y);break;
            case "wideTree": this.wideTrees--;this.grid.placeWideTrees(x,y);break;
            case "shadowTree": this.shadowTrees--;this.grid.placeShadowTrees(x,y);break;
        }

        
    }
    
    moveItem(x,y,type) {
        switch (type) {
            case "tent": this.grid.placeTent(x,y); break;
            case "drinkStand": this.grid.placeDrinkStand(x,y);break;
            case "foodStand": this.grid.placeFoodStand(x,y);break;
            case "toilet": this.grid.placeToilets(x,y);break;
            case "trashcan": this.grid.placeTrashcans(x,y);break;
            case "highTree": this.grid.placeHighTrees(x,y);break;
            case "wideTree": this.grid.placeWideTrees(x,y);break;
            case "shadowTree": this.grid.placeShadowTrees(x,y);break;
        }
    }
    
    deleteItem(x,y,type) {
        switch (type) {
            case "tent": this.grid.deleteTent(x,y); break;
            case "drinkStand": this.grid.deleteDrinkStand(x,y);break;
            case "foodStand": this.grid.deleteFoodStand(x,y);break;
            case "toilet": this.grid.deleteToilets(x,y);break;
            case "trashcan": this.grid.deleteTrashcans(x,y);break;
            case "highTree": this.grid.deleteHighTrees(x,y);break;
            case "wideTree": this.grid.deleteWideTrees(x,y);break;
            case "shadowTree": this.grid.deleteShadowTrees(x,y);break;
            
        }
    }

    addItem(type) {
        switch (type) {
            case "tent": this.tents++; return;
            case "drinkStand": this.drinkStands++; return;
            case "foodStand": this.eatingStands++; return;
            case "toilet":this.toiletBuildings++; return;
            case "trashcan": this.trashcans++; return;
            case "highTree":this.highTrees++; return;
            case "wideTree": this.wideTrees++; return;
            case "shadowTree": this.shadowTrees++; return;
        }
    }
    setTrees() {
        this.treesAreSet = true;
        for(let i = 0; this.highTrees; i++) {
            let x = Math.floor(Math.random() * (14 + 1)); 
            let y = Math.floor(Math.random() * (14 + 1)); 
            while(!this.canPlace(x,y,"highTree")) {
                x = Math.floor(Math.random() * (14 + 1)); 
                y = Math.floor(Math.random() * (14 + 1));
            }
            this.placeItem(x,y,"highTree");
        }
        for(let i = 0; this.wideTrees; i++) {
            let x = Math.floor(Math.random() * (14 + 1)); 
            let y = Math.floor(Math.random() * (14 + 1)); 
            while(!this.canPlace(x,y,"wideTree")) {
                x = Math.floor(Math.random() * (14 + 1)); 
                y = Math.floor(Math.random() * (14 + 1));
            }
            this.placeItem(x,y,"wideTree");
        }
        for(let i = 0; this.shadowTrees; i++) {
            let x = Math.floor(Math.random() * (14 + 1)); 
            let y = Math.floor(Math.random() * (14 + 1)); 
            while(!this.canPlace(x,y,"shadowTree")) {
                x = Math.floor(Math.random() * (14 + 1)); 
                y = Math.floor(Math.random() * (14 + 1));
            }
            this.placeItem(x,y,"shadowTree");
        }
    }
    setStepsAreSet(boolean) {
        this.stepsAreSet = boolean;
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

    setAmountOfEatingStands(stands) {
        this.eatingStands = stands;
    }

    setAmountOfDrinkStands(stands) {
        this.drinkStands = stands;
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
        filled = filled + (this.eatingStands);
        filled = filled + (this.drinkStands * 2);
        filled = filled + (this.highTrees);
        filled = filled + (this.wideTrees * 2);
        filled = filled + (this.shadowTrees * 9);
        filled = filled + (this.toiletBuildings * 3);

        return filled;
    }
    getItem(x,y) {
        return this.grid.getItem(x,y);
    }
}