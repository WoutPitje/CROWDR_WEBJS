/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controllers/Simulation/LocationController.js":
/*!**********************************************************!*\
  !*** ./src/Controllers/Simulation/LocationController.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LocationController)
/* harmony export */ });
/* harmony import */ var _Models_Trashcan__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Models/Trashcan */ "./src/Models/Trashcan.js");



class LocationController {

    constructor(data, simulationController) {
        this.data = data;
        this.simulationController = simulationController;
        this.locationView = simulationController.locationView;
    }

    refresh() {
        this.locationView.refresh(this.data);
        this.fillTrashCans();
        this.leavePeople();
    }

    leavePeople() {
        this.data.leavePeople(1);
    }

    fillTrashCans() {
        this.data.locations.forEach(location => {
            for(let i = 0; i < 15;i++) {
                for(let j = 0; j < 15; j++) {
                     let block = location.getGridBlock(i,j);
                     if(block.object instanceof _Models_Trashcan__WEBPACK_IMPORTED_MODULE_0__.default) {
                        block.object.fill();
                     }
                }
            }
        });
    }



}

/***/ }),

/***/ "./src/Controllers/Simulation/SimulationController.js":
/*!************************************************************!*\
  !*** ./src/Controllers/Simulation/SimulationController.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SimulationController)
/* harmony export */ });
/* harmony import */ var _LocationController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LocationController.js */ "./src/Controllers/Simulation/LocationController.js");
/* harmony import */ var _WaitingLineController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WaitingLineController.js */ "./src/Controllers/Simulation/WaitingLineController.js");
/* harmony import */ var _Views_simulation_WaitingLineView_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Views/simulation/WaitingLineView.js */ "./src/Views/simulation/WaitingLineView.js");
/* harmony import */ var _Views_simulation_SimulationView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Views/simulation/SimulationView.js */ "./src/Views/simulation/SimulationView.js");
/* harmony import */ var _Views_simulation_LocationView_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Views/simulation/LocationView.js */ "./src/Views/simulation/LocationView.js");
/* harmony import */ var _Models_Data_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Models/Data.js */ "./src/Models/Data.js");
/* harmony import */ var _Models_Simulation_Weather_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Models/Simulation/Weather.js */ "./src/Models/Simulation/Weather.js");








class SimulationController {

    constructor(data) {
        this.data = new _Models_Data_js__WEBPACK_IMPORTED_MODULE_5__.default(data);
        this.waitingLineView = new _Views_simulation_WaitingLineView_js__WEBPACK_IMPORTED_MODULE_2__.default(this.waitingLineController);
        this.simulationView = new _Views_simulation_SimulationView_js__WEBPACK_IMPORTED_MODULE_3__.default(this);
        this.locationView = new _Views_simulation_LocationView_js__WEBPACK_IMPORTED_MODULE_4__.default(this);
        this.locationController = new _LocationController_js__WEBPACK_IMPORTED_MODULE_0__.default(this.data, this);
        this.waitingLineController = new _WaitingLineController_js__WEBPACK_IMPORTED_MODULE_1__.default(this.data, this);
        this.weather = new _Models_Simulation_Weather_js__WEBPACK_IMPORTED_MODULE_6__.default();
        

        this.startSimulation();
        
    }

    startSimulation() {
        this.simulationView.setMainView(this.data);
        this.locationView.init(this.data);
        this.waitingLineController.init();
        
        this.timer = setInterval(() => this.refresh() , 1000);
    }

    refresh() {
        if(this.paused) {
            return;
        }
        this.simulationView.refresh();
        this.waitingLineController.refresh();
        this.locationController.refresh();
        this.setWeather();
        console.log("refresh");

       
    }

    setWeather()  {
        this.simulationView.setWeather(this.weather.getCurrentWeather());
    }

    changeLocation() {
        let place = this.simulationView.getPlace().value;
        
        this.weather.setCurrentWeather(place);
    }

    
}

/***/ }),

/***/ "./src/Controllers/Simulation/WaitingLineController.js":
/*!*************************************************************!*\
  !*** ./src/Controllers/Simulation/WaitingLineController.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WaitingLineController)
/* harmony export */ });
/* harmony import */ var _Models_Simulation_GroupOfPeople_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Models/Simulation/GroupOfPeople.js */ "./src/Models/Simulation/GroupOfPeople.js");


class WaitingLineController{

    constructor(data, simulationController) {
        this.data = data;
        this.simulationController = simulationController;
        
        this.waitingLineView = this.simulationController.waitingLineView;
    
        this.amountOfVisitors = 0;
    }

    init() {
        this.setVisitors();
        this.data.setOpenWaitingLines(this.getAmountOfWaitingLinesOpen());
        this.data.setWaitingLines();
        this.waitingLineView.refresh(this.data);
    }

    refresh() {
        
        if(this.data.openWaitingLines != this.getAmountOfWaitingLinesOpen()) {
            this.data.setOpenWaitingLines(this.getAmountOfWaitingLinesOpen());
            this.data.setWaitingLines();
        }
        this.scanWaitingLines();
        this.waitingLineView.refresh(this.data);
        this.amountOfVisitors = this.amountOfVisitors + 13;
    }

    scanWaitingLines() {
        this.data.scanWaitingLines();
    }

    setVisitors() {
        let maxAmountOfVisitors = 0;

        this.data.locations.forEach(location => {
            maxAmountOfVisitors += location.visitors;
        });

        this.amountOfVisitors = Math.floor(Math.random() * maxAmountOfVisitors) + (3/4*maxAmountOfVisitors); 
        for(let i = 0; i < this.amountOfVisitors; ) {
            let amountOfPeople = Math.floor(Math.random() * 4) + 1;
            
            let groupOfPeople = new _Models_Simulation_GroupOfPeople_js__WEBPACK_IMPORTED_MODULE_0__.default(amountOfPeople);
            this.data.addWaitingGroup(groupOfPeople);
            i = i + amountOfPeople;
        }
        console.log(this.data.peopleInLine)
    }

    getAmountOfWaitingLinesOpen() {
        let openWaitingLines = this.waitingLineView.getWaitingLines();
       
        return parseInt(openWaitingLines.value);
    }

}

/***/ }),

/***/ "./src/Models/Data.js":
/*!****************************!*\
  !*** ./src/Models/Data.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Data)
/* harmony export */ });
/* harmony import */ var _Location_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Location.js */ "./src/Models/Location.js");
/* harmony import */ var _Simulation_WaitingLine_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Simulation/WaitingLine.js */ "./src/Models/Simulation/WaitingLine.js");



class Data {
    constructor(dataobject) {
        if(dataobject == null) {
            this.locations = [new _Location_js__WEBPACK_IMPORTED_MODULE_0__.default({})];
            this.currentLocation = 1;
        }
        else if(dataobject.locations.length <= 0) {
            this.locations = [new _Location_js__WEBPACK_IMPORTED_MODULE_0__.default({})];
            this.currentLocation = 1;
        }
        else if(dataobject != null) {
            this.locations = [];
            
            dataobject.locations.forEach(element => {
                this.locations.push(new _Location_js__WEBPACK_IMPORTED_MODULE_0__.default(element));
            });
            this.currentLocation = dataobject.currentLocation;
            
        } else {
            this.locations = [new _Location_js__WEBPACK_IMPORTED_MODULE_0__.default({})];
            this.currentLocation = 1;
        }
        this.peopleInLine = [];
        this.waitingLines = [];
        this.leftpeople = [];
    }

    addLocation(location) {
        this.locations.push(location);
    }
    deleteLocation(location) {
        
           this.currentLocation = 1;
        
        this.locations.splice(location - 1,1)
    }
    getLocation(location) {
        return this.locations[location - 1];
    }
    setCurrentLocation(location) {
        this.currentLocation = location;
    }
    getCurrentLocation() {
        
        return this.locations[this.currentLocation - 1];
    }
    resetCurrentLocation() {
        this.locations[this.currentLocation - 1] = new _Location_js__WEBPACK_IMPORTED_MODULE_0__.default({});
        this.locations[this.currentLocation - 1].setRegionLocked(false);
    }
    setOpenWaitingLines(lines) {
        this.openWaitingLines = lines;
    }
    addWaitingGroup(waitingGroup) {
        this.peopleInLine.push(waitingGroup);
    }

    setWaitingLines() {
        let openLines = this.openWaitingLines;
        this.waitingLines = [];
        for(let i = 0; i < this.openWaitingLines; i++) {
            this.waitingLines.push(new _Simulation_WaitingLine_js__WEBPACK_IMPORTED_MODULE_1__.default());
        }
        
        for(let i = 0; i < this.peopleInLine.length; i++) {
            let line = Math.floor(Math.random() * openLines) ;

            this.waitingLines[line].addGroupOfPeople(this.peopleInLine[i]);
        }
    }

    scanWaitingLines() {
        let scannedPeople = [];
        for(let i = 0; i < this.waitingLines.length; i++) {
            let groupOfPeople  = this.waitingLines[i].scan();
            if(typeof groupOfPeople !== 'undefined') {
                
                scannedPeople.push(groupOfPeople);
            }
        }
        this.locateGroupsOfPeople(scannedPeople);
    }
    locateGroupsOfPeople(people) {
    
        people.forEach(group =>  {
            let location = Math.floor(Math.random() * this.locations.length);
            let x = Math.floor(Math.random() * 15);
            let y = Math.floor(Math.random() * 15);
            
            while(!this.locations[location].getGridBlock(x,y).canPlace(group.getAmountOfPeople(), 7)) {
                x = Math.floor(Math.random() * 14);
                y = Math.floor(Math.random() * 14);
            }
            this.locations[location].addGroupOfPeople(x,y,group)
        })
        
    }

    leavePeople(percentage) {
    
        this.locations.forEach(location => {
            let grid = location.grid.array;
            for (let i = 0; i < grid.length; i++) {
                for(let j = 0; j < grid.length; j++) {
                    grid[i][j].groupsOfPeople.forEach(group => {
                        let number = Math.floor(Math.random() * 101) + 1;
                        if(number <= percentage) {
                            grid[i][j].groupsOfPeople.shift();
                        }
                    })
                    
                }
            }
        });

        
    }

    allLocationsLocked() {
        
        this.locations.forEach(location => {
            console.log(location.getRegionLocked())
            if(!location.getRegionLocked()) {
                
                return false;
            }
        });
        return true;
    }
}

/***/ }),

/***/ "./src/Models/EatingStand.js":
/*!***********************************!*\
  !*** ./src/Models/EatingStand.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EatingStand)
/* harmony export */ });
class EatingStand {
    
    constructor() {
        this.maxVisitors = 15;
        this.standType = "general";
    }
    setMaxVisitors(newMaxVisitors) {
        this.maxVisitors = newMaxVisitors;
    }

    getMaxVisitors() {
        return this.maxVisitors;
    }

    setStandType(newStandType) {
        this.standType = newStandType;
    }
    
    getStandType() {
        return this.standType;
    }
}

/***/ }),

/***/ "./src/Models/Grid.js":
/*!****************************!*\
  !*** ./src/Models/Grid.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Grid)
/* harmony export */ });
/* harmony import */ var _Models_GridBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Models/GridBlock */ "./src/Models/GridBlock.js");
/* harmony import */ var _Models_Trashcan__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Models/Trashcan */ "./src/Models/Trashcan.js");
/* harmony import */ var _Models_EatingStand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Models/EatingStand */ "./src/Models/EatingStand.js");
/* harmony import */ var _Models_Tent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Models/Tent */ "./src/Models/Tent.js");





class Grid {
    
    constructor(grid) {

        this.array = new Array(15);
        for (var i = 0; i < 15; i++) {
            this.array[i] = new Array(15);
            for (var j = 0; j < 15; j++) {
                if(grid == null) {
                    this.array[i][j] = new _Models_GridBlock__WEBPACK_IMPORTED_MODULE_0__.default({});
                } else{
                    this.array[i][j] = new _Models_GridBlock__WEBPACK_IMPORTED_MODULE_0__.default(grid.array[i][j]);
                }
                
            }
        }
    }

    

    getItem(x,y) {
        return this.array[x][y].getFillType();
    }

    addGroupOfPeople(x,y, people) {
        this.array[x][y].addGroupOfPeople(people);
    }

    getAmountOfPeople(x,y) {
        return this.array[x][y].getAmountOfPeople();
    }


    getGridBlock(x,y) {
        return this.array[x - 1][ y-1];
    }

    getObject(x,y) {
        return this.array[x][y].getObject();
    }

    setObject(x,y,obj) {
        this.array[x][y].setObject(obj);
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

        let tentObject = new _Models_Tent__WEBPACK_IMPORTED_MODULE_3__.default();
        this.array[x][y].setObject(tentObject);
    }

    

    placeFoodStand(x,y) {
        this.array[x][y].setFillType("foodStand");

        let eatingStandObject = new _Models_EatingStand__WEBPACK_IMPORTED_MODULE_2__.default();
        this.array[x][y].setObject(eatingStandObject);
    }

    placeDrinkStand(x,y) {
        this.array[x][y-1].setFillType("drinkStandSurface");
        this.array[x][y].setFillType("drinkStand");
    }
    placeToilets(x,y) {
        this.array[x][y-1].setFillType("toiletSurface");
        this.array[x][y+1].setFillType("toiletSurface");
        this.array[x][y].setFillType("toilet");
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

        let trashcanObject = new _Models_Trashcan__WEBPACK_IMPORTED_MODULE_1__.default();
        this.array[x][y].setObject(trashcanObject);
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
        this.array[x][y].setFillType(null);
        this.array[x][y].setObject(null);
    }
    deleteFoodStand(x,y) {
        this.array[x][y].setFillType(null);
        this.array[x][y].setObject(null);
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
        this.array[x][y].setObject(null);
    }
    canPlaceTent(x,y) {
        
        if(x < 1 || y < 1 || x > 13 || y > 13) {
            return false;
        }
        if(this.array[x-1][y-1].getFillType() != null || this.array[x][y-1].getFillType() != null || this.array[x+1][y-1].getFillType() != null) {
            return false;
        }
        if(this.array[x-1][y].getFillType() != null || this.array[x+1][y].getFillType() != null || this.array[x-1][y+1].getFillType() != null) {
            return false;
        }
        if(this.array[x][y+1].getFillType() != null || this.array[x+1][y+1].getFillType() != null || this.array[x][y].getFillType() != null) {
            return false;

        }
        
        return true;

    }
    canPlaceFoodStand(x,y) {
        if(this.array[x][y].getFillType() != null) {
            return false;
        }
        return true;
    }

    canPlaceDrinkStand(x,y) {
        if(y < 1) {
            return false;
        }
        if(this.array[x][y].getFillType() != null || this.array[x][y-1].getFillType() != null) {
            return false;
        }
        return true;
    }
    canPlaceToilets(x,y) {
        if(y < 1 || y > 13) {
            return false;
        }
        if(this.array[x][y].getFillType() != null || this.array[x][y-1].getFillType() != null|| this.array[x][y+1].getFillType() != null) {
            return false;
        }
        return true;
    }

    canPlaceHighTrees(x,y) {
        if(this.array[x][y].getFillType() != null) {
            return false;
        }
        return true;
    }

    canPlaceWideTrees(x,y) {
        if(x > 13) {
            return false;
        }
        if(this.array[x][y].getFillType() != null || this.array[x+1][y].getFillType() != null) {
            return false;
        }
        return true;
    }
    canPlaceShadowTrees(x,y) {
        if(x < 1 || y < 1 || x > 13 || y > 13) {
            return false;
        }
        if(this.array[x-1][y-1].getFillType() != null || this.array[x][y-1].getFillType() != null || this.array[x+1][y-1].getFillType() != null) {
            return false;
        }
        if(this.array[x-1][y].getFillType() != null || this.array[x+1][y].getFillType() != null || this.array[x-1][y+1].getFillType() != null) {
            return false;
        }
        if(this.array[x][y+1].getFillType() != null || this.array[x+1][y+1].getFillType() != null || this.array[x][y].getFillType() != null) {
            return false;

        }
        return true;
    }

    canPlaceTrashcans( x,y) {
        if(this.array[x][y].getFillType() != null) {
            return false;
        }
        return true;
    }
     


}

/***/ }),

/***/ "./src/Models/GridBlock.js":
/*!*********************************!*\
  !*** ./src/Models/GridBlock.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GridBlock)
/* harmony export */ });
class GridBlock {
    
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

/***/ }),

/***/ "./src/Models/Location.js":
/*!********************************!*\
  !*** ./src/Models/Location.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Location)
/* harmony export */ });
/* harmony import */ var _Grid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Grid.js */ "./src/Models/Grid.js");


class Location {

    constructor(location) {
        this.treesAreSet = false;
        this.stepsAreSet = false;
        this.regionIsLocked = false;
        
        this.grid = new _Grid_js__WEBPACK_IMPORTED_MODULE_0__.default(null);
        if(typeof location.treesAreSet !== 'undefined') this.treesAreSet = location.treesAreSet;

        if(typeof location.stepsAreSet !== 'undefined') this.stepsAreSet = location.stepsAreSet;

        if(typeof location.regionIsLocked !== 'undefined') this.regionIsLocked = location.regionIsLocked;
        
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

        if(typeof location.grid !== 'undefined') this.grid = new _Grid_js__WEBPACK_IMPORTED_MODULE_0__.default(location.grid);
        
    
        
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

    getGridBlock(x,y) {
        return this.grid.array[x][y];
    }
    addGroupOfPeople(x,y, people) {
        
     
        this.grid.addGroupOfPeople(x,y,people);
    }

    getAmountOfPeople(x,y) {
        return this.grid.getAmountOfPeople(x,y);
    }

    getObject(x,y) {
        return this.grid.getObject(x,y);
    }

    setObject(x,y, obj) {
        this.grid.setObject(x,y,obj);
    }

    setRegionLocked(boolean){
        this.regionIsLocked = boolean;
    }

    getRegionLocked(){
        return this.regionIsLocked;
    }
}

/***/ }),

/***/ "./src/Models/Simulation/GroupOfPeople.js":
/*!************************************************!*\
  !*** ./src/Models/Simulation/GroupOfPeople.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GroupOfPeople)
/* harmony export */ });
/* harmony import */ var _Person_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Person.js */ "./src/Models/Simulation/Person.js");


class GroupOfPeople {
    constructor(amountOfPeople) {
        this.people = [];
        for(let i = 0; i < amountOfPeople; i++) {
            this.people.push(new _Person_js__WEBPACK_IMPORTED_MODULE_0__.default());
        }
    }

    getAmountOfPeople() {
        return this.people.length;
    }

}


/***/ }),

/***/ "./src/Models/Simulation/Person.js":
/*!*****************************************!*\
  !*** ./src/Models/Simulation/Person.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Person)
/* harmony export */ });
class Person {

    constructor() {
        
        var self = this;

        fetch('https://randomuser.me/api/')
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
      
            response.json().then(function(data) {
                
              self.name = data.results[0].name.title + " " + data.results[0].name.first + " " + data.results[0].name.last;
              self.gender = data.results[0].gender;
              self.age = data.results[0].dob.age;
              self.picture = data.results[0].picture.thumbnail;
              self.country = data.results[0].location.country
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    }   

    getName(){
        return this.name;
    }

    getGender(){
        return this.gender;
    }

    getAge(){
        return this.age;
    }

    getPicture(){
        return this.picture;
    }

    getCountry(){
        return this.country;
    }
}

/***/ }),

/***/ "./src/Models/Simulation/WaitingLine.js":
/*!**********************************************!*\
  !*** ./src/Models/Simulation/WaitingLine.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WaitingLine)
/* harmony export */ });
class WaitingLine {

    constructor() {
        this.people = [];
        this.scanSpeed = Math.floor(Math.random() * 3) + 1;
        this.seconds = 0;
    }

    addGroupOfPeople(group) {
        this.people.push(group);
    }

    scan() {
        this.seconds++;
        if(this.people.length > 0) {
        let amountOfPeople = this.people[0].people.length;
        
        if(this.seconds >= amountOfPeople * this.scanSpeed) {
            this.seconds = 0;
            return this.people.shift();
            
        }
    }
        
    }
}


/***/ }),

/***/ "./src/Models/Simulation/Weather.js":
/*!******************************************!*\
  !*** ./src/Models/Simulation/Weather.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Weather)
/* harmony export */ });
class Weather {

    constructor() {
        
        
    }   

    setCurrentWeather(place){

      var self = this;
        fetch("http://api.openweathermap.org/data/2.5/weather?q="+ place +"&appid=e68285f49070969fc85b1cc56080ab46")
        .then(
            function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                alert("This location is not found")
              return;
            }
            
            
            response.json().then((data) =>  {
              self.weather = data.weather[0].main;
            });
            
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });

        
  }
  getCurrentWeather() {
    return this.weather;
  }
}

/***/ }),

/***/ "./src/Models/Tent.js":
/*!****************************!*\
  !*** ./src/Models/Tent.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tent)
/* harmony export */ });
class Tent {
    
    constructor() {
        this.maxVisitors = 5;
        this.openingTimes = "08:00";
    }
    setMaxVisitors(newMaxVisitors) {
        this.maxVisitors = newMaxVisitors;
    }

    getMaxVisitors() {
        return this.maxVisitors;
    }

    setOpeningTimes(newOpeningTimes) {
        this.openingTimes = newOpeningTimes;
    }
    
    getOpeningTimes() {
        return this.openingTimes;
    }
}

/***/ }),

/***/ "./src/Models/Trashcan.js":
/*!********************************!*\
  !*** ./src/Models/Trashcan.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Trashcan)
/* harmony export */ });
class Trashcan {
    
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

/***/ }),

/***/ "./src/Views/simulation/LocationView.js":
/*!**********************************************!*\
  !*** ./src/Views/simulation/LocationView.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LocationView)
/* harmony export */ });
/* harmony import */ var _Models_Trashcan__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Models/Trashcan */ "./src/Models/Trashcan.js");


class LocationView {
    constructor(locationController) {
        this.locationController = locationController;
        this.locationBlocks = [];
        this.locationBlockWidth = 350;
        this.locationBlockHeight = 350;
        this.gridWidth = this.locationBlockWidth / 15;
        this.gridHeight = this.locationBlockHeight / 15;
        this.groupWidth = 8;
    }
    init(data) {
        let locationsblock = document.getElementById("locations-block");
        console.log(locationsblock);

        data.locations.forEach((location) => {
            let nameTag = document.createElement("span");
            nameTag.innerHTML = location.name;
            let locationBlock = document.createElement("canvas");
            locationBlock.id = location.name;
            locationBlock.setAttribute("width", "" + this.locationBlockWidth);
            locationBlock.setAttribute("height", "" + this.locationBlockHeight);
            locationBlock.className = "locationblock bg-gray-100"
            let div = document.createElement("div");
            let canvas = locationBlock.getContext("2d");
            canvas.translate(0.5,0.5);
            this.locationBlocks.push(canvas);
            div.appendChild(nameTag);
            div.appendChild(locationBlock);
            locationBlock.addEventListener("mousemove", (e) => this.hoverPeople(location, e.clientX - locationBlock.offsetLeft - locationBlock.scrollLeft, e.clientY - locationBlock.offsetTop - locationBlock.scrollTop));
            locationsblock.appendChild(div);
        });

        this.drawLocations(data);
        

        
    }

    refresh(data) {
        this.drawLocations(data);
        
    }

    drawLocations(data) {
       
        for(let i = 0; i < this.locationBlocks.length; i++) {
            this.drawLocation(data.locations[i] , this.locationBlocks[i]);
        }
    }

    drawLocation(locationData, block) {
        
        block.clearRect(0, 0, this.locationBlockWidth, this.locationBlockHeight);
        for(let x = 0; x < 15; x++) {
            for(let y = 0; y < 15; y++) {
                this.drawBackgroundItem(locationData.grid.array[x][y].getFillType(), block,  x, y);
                
                if(locationData.getGridBlock(x,y).object instanceof _Models_Trashcan__WEBPACK_IMPORTED_MODULE_0__.default) {
                    console.log("jes")
                    this.drawTrashcan(x,y,block,locationData.getGridBlock(x,y).object.filled);
                }
            }
        }
        for(let x = 0; x < 15; x++) {
            for(let y = 0; y < 15; y++) {
                this.drawPeople(locationData.grid.array[x][y].getAmountOfPeople(), block, x, y);
            }
        }
        
    }
    drawTrashCan(x, y, block, filled) {
        
        block.fillStyle = "green";
        block.fillRect(x ,y - this.gridHeight / filled,this.gridWidth, this.gridHeight);
        block.fill();
        block.stroke();  
    }

    drawPeople(amount, block,x,y) {
        if(amount > 0) this.drawGroup(amount,block, x, y);
        
    }

    drawGroup(amount, block, x, y) {
        block.strokeStyle = "red";
        block.beginPath();
        block.arc(x * this.gridWidth + this.gridWidth /2, y * this.gridHeight + this.gridHeight /2 , this.groupWidth, 0, 2 * Math.PI);
        block.fillStyle = "white";
        block.fill();
        block.stroke();   
        block.fillStyle = "black";
        block.font = "12px Arial";
       
        block.fillText(amount, x * this.gridWidth + this.gridWidth /2 - 3, y * this.gridHeight + this.gridHeight /2 + 4);
    }
    drawBackgroundItem(type, block,x,y) {
        if(type != null) {
            let color = null;
            let image = null;
            //colors
            if(type == "tentSurface" || type == "tent") {
                color = "yellow";
            } else if(type =="drinkStandSurface" || type == "drinkStand") {
                color = "red";
            } else if(type =="toiletSurface" || type == "toilet") {
                color = "gray";
            } else if(type =="highTreeSurface" || type =="wideTreeSurface" || type == "shadowTreeSurface" || type=="highTree" || type == "wideTree" || type=="shadowTree") {
                color = "green";
            } else if(type =="foodStand") {
                color = "brown";
            }
             else if(type =="trashcan") {
                color = "gray";

            }
            //images
            if(type == "tent" || type =="drinkStand" || type =="toilet" || type=="highTree" || type == "wideTree" || type=="shadowTree" || type=="foodStand" || type =="trashcan") {
                image = type;
            }

            this.drawGridPane(x,y,color,image,block);
        }            
    }

    drawGridPane(x,y,color,image, block) {
        
        block.fillStyle = color;
        block.fillRect(x * this.gridWidth, y * this.gridHeight, this.gridWidth, this.gridHeight);
        
        if(image != null) {
            let drawing = new Image();
            drawing.src = "../src/Images/" + image + ".png"; 
            
            drawing.onload = () => {
                block.drawImage(drawing,x * this.gridWidth, y * this.gridHeight, this.gridWidth, this.gridHeight);
            }

            
        }
    }

    

    hoverPeople(location,x,y) {
        if(x < 0 || y < 0) {
            return;
        }
        let infoblock = document.getElementById("people-info-block");

        while (infoblock.firstChild) {
           infoblock.removeChild(infoblock.firstChild);
        }

        x = Math.floor(x / 23.3);
        y = Math.floor(y /23.3);



        let infoheader = document.createElement("h1");
        infoheader.className = "font-bold"
        infoheader.innerHTML = "Info about block x" + (x+1) + ", y"+(y+1) + " (" + location.name +")";

        infoblock.appendChild(infoheader);

        let gridBlock = location.grid.getGridBlock(x + 1,y + 1);


        let personinfoheader = document.createElement("span");
        personinfoheader.innerHTML = "People in this block"
        personinfoheader.className = "italic";
        infoblock.appendChild(personinfoheader);
        if(gridBlock.getAmountOfPeople() <= 0) { 
            let personRow = document.createElement("span");
            personRow.innerHTML = "-";

            infoblock.appendChild(personRow);
        }
        let i =  1; 
        gridBlock.groupsOfPeople.forEach(group => {
            let groupRow = document.createElement("span");
            groupRow.innerHTML = "group " + i;
            groupRow.className = "font-bold"
            infoblock.appendChild(groupRow);
            group.people.forEach(person => {
                let personRow = document.createElement("span");
                personRow.className = "ml-4"
                personRow.innerHTML = person.getName() + " (" + person.getAge() + ") ("+ person.getGender() + ") ";
                infoblock.appendChild(personRow);
            });
            i++;
        });
        
    }
}

/***/ }),

/***/ "./src/Views/simulation/SimulationView.js":
/*!************************************************!*\
  !*** ./src/Views/simulation/SimulationView.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SimulationView)
/* harmony export */ });
class SimulationView {

    constructor(simulationController) {
        this.simulationController = simulationController;
    }
    setMainView(data) {
    this.paused = false;
    let pauseButton = document.getElementById("pause-simulation");
    pauseButton.addEventListener("click",() => this.pausePlaySimulation());
    let weatherButton = document.getElementById("set-location");
    weatherButton.addEventListener("click",() => this.simulationController.changeLocation());
}

pausePlaySimulation() {
    
    let pauseButton = document.getElementById("pause-simulation");
    if(this.simulationController.paused) {
        this.simulationController.paused = false;
        pauseButton.className = "order-last p-3 bp-2 ml-10 bg-red-500 hover:bg-red-800 hover:text-white";
        pauseButton.innerHTML = "pause simulation";
    } else {
        this.simulationController.paused = true;
        pauseButton.className = "order-last p-3 bp-2 ml-10 bg-green-500 hover:bg-green-800 hover:text-white";
        pauseButton.innerHTML = "start simulation";
    }
    
}
refresh() {
    this.setWeather();
}
setWeather(weather) {
    let weatheroutput = document.getElementById("weather");
    weatheroutput.innerHTML = weather;
}

getPlace() {
    return document.getElementById("place");
}
}



/***/ }),

/***/ "./src/Views/simulation/WaitingLineView.js":
/*!*************************************************!*\
  !*** ./src/Views/simulation/WaitingLineView.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WaitingLineView)
/* harmony export */ });
class WaitingLineView {

    constructor(waitingLineController) {
        this.waitingLineController = waitingLineController; 
        this.waitingLineWidth = 25;
        this.groupWidth = 7;
        this.waitingLinesBlock = document.getElementById("waitingLine");
        this.waitingLinesHeight = this.waitingLinesBlock.height;
        this.waitingLinesWidth = this.waitingLinesBlock.width;
        this.waitingLineBlockHeight = 50;
        this.canvas = this.waitingLinesBlock.getContext("2d");
        this.canvas.translate(0.5,0.0);
    }

    refresh(data) {
        this.canvas.clearRect(0, 0, this.waitingLinesWidth, this.waitingLinesHeight);
        this.drawScanBuilding();
        this.drawWaitingLines(data.openWaitingLines);
        
        this.drawPeopleInLine(data.waitingLines);
        
    }

    getWaitingLines() {
        let waitingLineInput = document.getElementById("openWaitingLines");
    
        return waitingLineInput;
    }
    drawScanBuilding() {
        let block = this.canvas;
        block.fillStyle = "darkblue";
        block.fillRect(0, 0, this.waitingLinesWidth, this.waitingLineBlockHeight);
    }
    drawWaitingLines(amount) {
        
        let block = this.canvas;
        let x = 0;
        let width = this.waitingLineWidth;
        let height = this.waitingLinesHeight;
        block.strokeStyle = "black";
        block.beginPath();
        block.moveTo(0, this.waitingLineBlockHeight);
        block.lineTo(0, height);
        block.stroke();
        for(let i = 1; i <= amount;i++) {
            block.beginPath();
            block.moveTo(i * width, 0 + this.waitingLineBlockHeight);
            block.lineTo(i * width, height);
            block.stroke();
        }
    }

    drawPeopleInLine(waitingLines) {
        let block = this.canvas;
        let radius = this.groupWidth;
        let line = 1;
        let x = radius;
        let y = radius;
        let width = this.waitingLinesWidth;
        
        
        waitingLines.forEach(waitingLine => {
                block.fillStyle = "white";
                block.font = "15px Arial";
               
                block.fillText(waitingLine.scanSpeed, (line - 1) * this.waitingLineWidth + this.waitingLineWidth / 2 - 4, this.waitingLineBlockHeight / 2);
                block.font = "10px Arial";
                block.fillText("sec", (line - 1) * this.waitingLineWidth + this.waitingLineWidth / 2 -7, this.waitingLineBlockHeight / 2 + 10);
            waitingLine.people.forEach(waitingGroup => {
                block.strokeStyle = "red";
                block.beginPath();
                block.arc((line - 1)* this.waitingLineWidth + this.waitingLineWidth /2, y + this.waitingLineBlockHeight + 5, radius, 0, 2 * Math.PI);
                block.stroke();   
                block.fillStyle = "black";
                block.font = "12px Arial";
               
                block.fillText(waitingGroup.people.length, (line - 1)* this.waitingLineWidth + this.waitingLineWidth /2 -3 , y + this.waitingLineBlockHeight + 5 + 5);
                 y+= radius * 2 + 3;
            });
            y = radius;
            line++;
        });
        
        
        // peopleinline.forEach(waitingGroup => {
            
        //     
        //     block.arc(x, y, radius, 0, 2 * Math.PI);
        //     block.stroke();   
        //     block.font = "20px Arial";
        //     block.fillText(waitingGroup.people.length, x - radius + 5 , y +  6);
        //     x+= radius*2;
        //     if(x >= width) {
        //         x = radius;
        //         y += radius * 2;
        //     }
        // })
    }

}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/simulation.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Controllers_Simulation_SimulationController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controllers/Simulation/SimulationController.js */ "./src/Controllers/Simulation/SimulationController.js");


let jsonString = localStorage.getItem('data');
let dataobject = JSON.parse(jsonString);
console.log(dataobject);

let simulationController = new _Controllers_Simulation_SimulationController_js__WEBPACK_IMPORTED_MODULE_0__.default(dataobject);
})();

/******/ })()
;
//# sourceMappingURL=simulation.js.map