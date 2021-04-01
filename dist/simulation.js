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


class LocationController {

    constructor(data, simulationController) {
        this.data = data;
        this.simulationController = simulationController;
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
/* harmony import */ var _Models_Data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Models/Data.js */ "./src/Models/Data.js");





class SimulationController {

    constructor(data) {
        this.data = new _Models_Data_js__WEBPACK_IMPORTED_MODULE_3__.default(data);
        this.waitingLineView = new _Views_simulation_WaitingLineView_js__WEBPACK_IMPORTED_MODULE_2__.default(this.waitingLineController);
        this.wocationController = new _LocationController_js__WEBPACK_IMPORTED_MODULE_0__.default(this.data, this);
        this.waitingLineController = new _WaitingLineController_js__WEBPACK_IMPORTED_MODULE_1__.default(this.data, this);

        this.startSimulation();
        
    }

    startSimulation() {
        this.setLocations();
        this.waitingLineController.init();
        this.timer = setInterval(() => this.refresh() , 1000);
    }

    refresh() {
        console.log("refresh");
        this.waitingLineController.refresh();
       
    }

    setNavigation()  {

    }

    setLocations() {
        // let waitingLineBlock = document.getElementById("waitingLineBlock");
        // let waitingLineHeader = document.createElement("span");
        // waitingLineHeader.innerHTML = "Waiting Line";
        // let waitingLine = document.createElement("canvas");
        // waitingLine.id = "waitingLine";
        // waitingLine.setAttribute("width", "300px");
        // waitingLine.setAttribute("height", "600px");
        // waitingLine.className = "bg-gray-300";
        // waitingLineBlock.appendChild(waitingLineHeader);
        // waitingLineBlock.appendChild(waitingLine);
        
        let locationsblock = document.getElementById("locations-block");
        console.log(locationsblock);

        this.data.locations.forEach((location) => {
            let nameTag = document.createElement("span");
            nameTag.innerHTML = location.name;
            let locationBlock = document.createElement("canvas");
            locationBlock.id = location.name;
            locationBlock.setAttribute("width", "300px");
            locationBlock.setAttribute("height", "300px");
            locationBlock.className = "locationblock bg-gray-100"
            let div = document.createElement("div");
            div.appendChild(nameTag);
            div.appendChild(locationBlock);
            locationsblock.appendChild(div);
        });
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
    }

    scanWaitingLines() {
        this.data.scanWaitingLines();
    }

    setVisitors() {
        let maxAmountOfVisitors = 0;

        this.data.locations.forEach(location => {
            maxAmountOfVisitors += location.visitors;
        });

        this.amountOfVisitors = Math.floor(Math.random() * maxAmountOfVisitors) + Math.floor(maxAmountOfVisitors / 4 * 3); 
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
        console.log(dataobject);
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
        for(let i = 0; i < this.waitingLines.length; i++) {
            this.waitingLines[i].scan();
        }
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
    
    constructor(gridblock) {
        this.maxVisitors = 15;
        this.standType = "general";
        
        //if(typeof gridblock.maxVisitors !== 'undefined') this.maxVisitors = gridblock.maxVisitors;
        //if(typeof gridblock.standType !== 'undefined') this.standType = gridblock.standType;
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

        this.array = [];
        for (var i = 0; i < 15; i++) {
            this.array[i] = [];
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
    getObject(x,y) {
        return this.array[x][y].getObject();
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

    getObject(x,y) {
        return this.grid.getObject(x,y);
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
        
        // const api_url = 'https://randomuser.me/api/'

        // async function getData() {
        //     const response = await fetch(api_url);
        //     const data = response.json();

        //     console.log(data);
        // }

        this.name = "piet";
        this.age = Math.floor(Math.random() * 100) + 1;
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
    }

    addGroupOfPeople(group) {
        this.people.push(group);
    }

    scan() {
        this.people.shift();
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
    
    constructor(gridblock) {
        this.maxVisitors = 5;
        this.openingTimes = "08:00";
        
        //if(typeof gridblock.maxVisitors !== 'undefined') this.maxVisitors = gridblock.maxVisitors;
        //if(typeof gridblock.openingTimes !== 'undefined') this.openingTimes = gridblock.openingTimes;
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
            waitingLine.people.forEach(waitingGroup => {
                block.strokeStyle = "red";
                block.beginPath();
                block.arc((line - 1)* this.waitingLineWidth + this.waitingLineWidth /2, y + this.waitingLineBlockHeight + 5, radius, 0, 2 * Math.PI);
                block.stroke();   
                block.fillStyle = "black";
                block.font = "12px Arial";
               
                block.fillText(waitingGroup.people.length, (line - 1)* this.waitingLineWidth + this.waitingLineWidth /2 -3 , y + this.waitingLineBlockHeight + 5 + 5);
                 y+= radius * 2;
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