import Grid from "../Models/Grid.js"
import Trashcan from "../Models/Trashcan";
import EatingStand from "../Models/EatingStand";
import Tent from "../Models/Tent";

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
            if(!this.getRegionLock()){
                this.gridView.refreshNormal(this.data);
            }
            else{
                this.gridView.refreshLocked();
            }
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
        
        this.data.getCurrentLocation().placeItem(x,y,type);
        this.mainController.saveData();
        
    }

    deleteGridFill(coordinates, type) {
        let x = coordinates.slice(coordinates.indexOf('x') + 1 ,coordinates.indexOf('y'));
        let y = coordinates.slice(coordinates.indexOf('y') + 1 ,coordinates.length);
        x = parseInt(x);
        y = parseInt(y);
        

        this.data.getCurrentLocation().deleteItem(x,y,type);
        this.mainController.saveData();
    }

    moveItem(coordinates, type) {
        let x = coordinates.slice(coordinates.indexOf('x') + 1 ,coordinates.indexOf('y'));
        let y = coordinates.slice(coordinates.indexOf('y') + 1 ,coordinates.length);
        x = parseInt(x);
        y = parseInt(y);
        

        this.data.getCurrentLocation().moveItem(x,y,type);
        this.mainController.saveData();
    }

    dropBack(type) {
        this.data.getCurrentLocation().addItem(type);
        this.mainController.saveData();
    }

    getItem(x,y) {
        return this.data.getCurrentLocation().getItem(x,y);
    }

    debugStats(coordinates){
        console.log(coordinates);
        let x = coordinates.slice(coordinates.indexOf('x') + 1 ,coordinates.indexOf('y'));
        let y = coordinates.slice(coordinates.indexOf('y') + 1 ,coordinates.length);
        x = parseInt(x);
        y = parseInt(y);

        let type = this.data.getCurrentLocation().getItem(x,y);
        let obj = null; 

        switch(type){
            case "tent":
                obj =  this.data.getCurrentLocation().getObject(x,y);
                this.gridView.drawConfigOptions('Maximum Visitors', obj.maxVisitors, 'number', 'Opening Time', obj.openingTimes, 'time');
                break;
            case "foodStand":
                obj =  this.data.getCurrentLocation().getObject(x,y);
                this.gridView.drawConfigOptions('Maximum Visitors', obj.maxVisitors, 'number', 'Stand Type', obj.standType, 'text');
                break;
            case "trashcan":
                obj =  this.data.getCurrentLocation().getObject(x,y);
                console.log(obj.emptyTime);
                this.gridView.drawConfigOptions('Capacity (Kilos)', obj.kiloCapacity, 'number', 'Emptying Time', obj.emptyTime, 'time');
                break;
        }
    }

    getRegionLock(){
        return this.data.getCurrentLocation().getRegionLocked();
    }

    lockRegion()
    {
        this.data.getCurrentLocation().setRegionLocked(true);
        this.gridView.drawRegionLock();
        this.mainController.saveData();
        this.gridView.refreshLocked();
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
