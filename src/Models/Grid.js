import GridBlock from "../Models/GridBlock";

export default class Grid {
    
    constructor() {
        this.array = [];
        for (var i = 0; i < 15; i++) {
            this.array[i] = [];
            for (var j = 0; j < 15; j++) {
                this.array[i][j] = new GridBlock();
            }
        }
    }

    canPlace(x,y, type) {
        return false;
    }

    placeItem(x,y,type) {
        switch (type) {
            case "tent": this.placeTent(x,y); break;
            case "drinkStand": this.placeDrinkStand(x,y);break;
            case "foodStand": this.placeFoodStand(x,y);break;
            case "toiletBuilding": this.placeToilets(x,y);break;
            case "trashcan": this.placeTrashcans(x,y);break;
            case "highTree": this.placeHighTrees(x,y);break;
            case "wideTree": this.placeWideTrees(x,y);break;
            case "shadowTree": this.placeShadowTrees(x,y);break;
        }

        
    }
    deleteItem(x,y,type) {
        switch (type) {
            case "tent": this.deleteTent(x,y);
            case "drinkStand": this.deleteDrinkStand(x,y);break;
            case "foodStand": this.deleteFoodStand(x,y);break;
            case "toiletBuilding": this.deleteToilets(x,y);break;
            case "trashcan": this.deleteTrashcans(x,y);break;
            case "highTree": this.deleteHighTrees(x,y);break;
            case "wideTree": this.deleteWideTrees(x,y);break;
            case "shadowTree": this.deleteShadowTrees(x,y);break;
            
        }
    }

    getItem(x,y) {
        return this.array[x][y].getFillType();
    }
    placeTent(x,y) {
        this.array[x-1][y-1].setFillType("tentSurface");
        this.array[x][y-1].setFillType("tentSurface");
        this.array[x+1][y-1].setFillType("tentSurface");
        this.array[x-1][y].setFillType("tentSurface");
        this.array[x+1][y].setFillType("tentSurface");
        this.array[x-1][y+1].setFillType("tentSurface");
        this.array[x][y+1].setFillType("tentSurface");
        this.array[x+1][y+1].setFillType("tentSurface");
        this.array[x][y].setFillType("tent");
    }

    deleteTent(x,y) {
        this.array[x-1][y-1].setFillType(null);
        this.array[x][y-1].setFillType(null);
        this.array[x+1][y-1].setFillType(null);
        this.array[x-1][y].setFillType(null);
        this.array[x+1][y].setFillType(null);
        this.array[x-1][y+1].setFillType(null);
        this.array[x][y+1].setFillType(null);
        this.array[x+1][y+1].setFillType(null);
        this.array[x][y].setFillType(null);
    }

    placeFoodStand(x,y) {
        this.array[x][y].setFillType("foodStand");
    }

    placeDrinkStand(x,y) {
        this.array[x][y-1].setFillType("drinkStandSurface");
        this.array[x][y].setFillType("drinkStand");
    }
    placeToilets(x,y) {
        this.array[x][y-1].setFillType("toiletSurface");
        this.array[x][y+1].setFillType("toiletSurface");
        this.array[x][y].setFillType("toiletStand");
    }

    placeHighTrees(x,y) {
        this.array[x][y].setFillType("highTree");
        
    }

    placeWideTrees(x,y) {
        this.array[x][y].setFillType("wideTree");
        this.array[x+1][y].setFillType("wideTreeSurface");
        
    }
    placeShadowTrees(x,y) {
        this.array[x-1][y-1].setFillType("shadowTreeSurface");
        this.array[x][y-1].setFillType("shadowTreeSurface");
        this.array[x+1][y-1].setFillType("shadowTreeSurface");
        this.array[x-1][y].setFillType("shadowTreeSurface");
        this.array[x+1][y].setFillType("shadowTreeSurface");
        this.array[x-1][y+1].setFillType("shadowTreeSurface");
        this.array[x][y+1].setFillType("shadowTreeSurface");
        this.array[x+1][y+1].setFillType("shadowTreeSurface");
        this.array[x][y].setFillType("shadowTree");
    }

    placeTrashcans( x,y) {
        this.array[x][y].setFillType("trashcan");
    }
    deleteFoodStand(x,y) {
        this.array[x][y].setFillType(null);
    }

    deleteDrinkStand(x,y) {
        this.array[x][y-1].setFillType(null);
        this.array[x][y].setFillType(null);
    }
    deleteToilets(x,y) {
        this.array[x][y-1].setFillType(null);
        this.array[x][y+1].setFillType(null);
        this.array[x][y].setFillType(null);
    }

    deleteHighTrees(x,y) {
        this.array[x][y].setFillType(null);
        
    }

    deleteWideTrees(x,y) {
        this.array[x][y].setFillType(null);
        this.array[x+1][y].setFillType(null);
        
    }
    deleteShadowTrees(x,y) {
        this.array[x-1][y-1].setFillType(null);
        this.array[x][y-1].setFillType(null);
        this.array[x+1][y-1].setFillType(null);
        this.array[x-1][y].setFillType(null);
        this.array[x+1][y].setFillType(null);
        this.array[x-1][y+1].setFillType(null);
        this.array[x][y+1].setFillType(null);
        this.array[x+1][y+1].setFillType(null);
        this.array[x][y].setFillType(null);
    }

    deleteTrashcans( x,y) {
        this.array[x][y].setFillType(null);
    }
    
    


}