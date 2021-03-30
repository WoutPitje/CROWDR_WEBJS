import Grid from "../Models/Grid.js"

export default class GridController {
    constructor(mainController, data) {
        this.data = data;
        this.mainController = mainController;
        this.gridController = mainController.gridController;
        this.gridView = mainController.gridView;
        
    }

    refreshGrid() {
            console.log(this.data.getCurrentLocation().treesAreSet)
            if(!this.data.getCurrentLocation().treesAreSet && this.data.getCurrentLocation().stepsAreSet) {
                this.data.getCurrentLocation().setTrees();
            }
            this.gridView.generateGrid();
            this.gridView.refresh(this.data);
            this.mainController.saveData();
        }
    getData() {
        return data;
    }

    canPlace(coordinates, type) {
        if(!coordinates.includes("x") && !coordinates.includes("y")) {
            return false;
        }
        let x = coordinates.slice(coordinates.indexOf('x') + 1 ,coordinates.indexOf('y'));
        let y = coordinates.slice(coordinates.indexOf('y') + 1 ,coordinates.length);
        x = parseInt(x);
        y = parseInt(y);
        
        let canPlace = this.data.getCurrentLocation().canPlace(x,y,type);
        return canPlace;

    }

    setGridFill(coordinates, type){
        let x = coordinates.slice(coordinates.indexOf('x') + 1 ,coordinates.indexOf('y'));
        let y = coordinates.slice(coordinates.indexOf('y') + 1 ,coordinates.length);
        x = parseInt(x);
        y = parseInt(y);
        
        let canPlace = this.data.getCurrentLocation().placeItem(x,y,type);
        this.mainController.saveData();
       
        
    }

    deleteGridFill(coordinates, type) {
        let x = coordinates.slice(coordinates.indexOf('x') + 1 ,coordinates.indexOf('y'));
        let y = coordinates.slice(coordinates.indexOf('y') + 1 ,coordinates.length);
        x = parseInt(x);
        y = parseInt(y);
        

        let canPlace = this.data.getCurrentLocation().deleteItem(x,y,type);
        this.mainController.saveData();
        
    }

    dropBack(type) {
        this.data.getCurrentLocation().addItem(type);
        
        this.mainController.saveData();
        
    }
    getItem(x,y) {
        return this.data.getCurrentLocation().getItem(x,y);
    }

    updateGridImages(type){
        switch(type){
            case "tent":
                this.tenten--;
                break;
            case "drink":
                this.drankkramen--;
                break;
            case "food":
                this.eetkramen--;
                break;
            case "toilet":
                this.toiletten--;
                break;
            case "prullenbak":
                this.prullenbakken--;
                break;
            case "hogeboom":
                this.hogebomen--;
                break;
            case "bredeboom":
                this.bredebomen--;
                break;
            case "schaduwboom":
                this.schaduwbomen--;
                break;
        }
    }
}
