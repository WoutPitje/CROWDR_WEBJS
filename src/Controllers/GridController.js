import Helper from "../Views/Helper";

export default class GridController {
    constructor(mainController, data) {
        this.data = data;
        this.mainController = mainController;
        this.gridController = mainController.gridController;
        this.gridView = mainController.gridView;
    }

    refreshGrid() {
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

    setConfigurationField(coordinates){

        let x = coordinates.slice(coordinates.indexOf('x') + 1 ,coordinates.indexOf('y'));
        let y = coordinates.slice(coordinates.indexOf('y') + 1 ,coordinates.length);
        x = parseInt(x);
        y = parseInt(y);

        let type = this.data.getCurrentLocation().getItem(x,y);
        let obj = null; 

        switch(type){
            case "tent":
                obj =  this.data.getCurrentLocation().getObject(x,y);
                this.gridView.drawConfigOptions(x, y, 'Maximum Visitors', obj.maxVisitors, 'number', 'Opening Time', obj.openingTimes, 'time');
                break;
            case "foodStand":
                obj =  this.data.getCurrentLocation().getObject(x,y);
                this.gridView.drawConfigOptions(x, y, 'Maximum Visitors', obj.maxVisitors, 'number', 'Stand Type', obj.standType, 'text');
                break;
            case "trashcan":
                obj =  this.data.getCurrentLocation().getObject(x,y);
                this.gridView.drawConfigOptions(x, y, 'Capacity (Kilos)', obj.kiloCapacity, 'number', 'Emptying Time', obj.emptyTime, 'time');
                break;
        }
    }

    updateConfigData(x, y, value1, value2){

        if(!isNaN(value1)){
            if(value1 <= 0){
                Helper.setConfigErrors("Please enter a positive amount");
                return;
            }
            if(value1 > 1000){
                Helper.setConfigErrors("Value can't be greater than 1000");
                return;
            }
        }

        if(!isNaN(value2)){
            if(value2 <= 0){
                Helper.setConfigErrors("Please enter a positive amount");
                return;
            }
            if(value2 > 1000){
                Helper.setConfigErrors("Value can't be greater than 1000");
                return;
            }
        }
        
        alert("Succesfully saved new configuration!");   

        let obj = this.data.getCurrentLocation().getObject(x,y);
        obj[Object.keys(obj)[0]] = value1;
        obj[Object.keys(obj)[1]] = value2;

        this.data.getCurrentLocation().setObject(x,y,obj);
        this.lockRegion();
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
}
