/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controllers/GridController.js":
/*!*******************************************!*\
  !*** ./src/Controllers/GridController.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GridController)
/* harmony export */ });
/* harmony import */ var _Views_Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Views/Helper */ "./src/Views/Helper.js");


class GridController {
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
                _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setConfigErrors("Please enter a positive amount");
                return;
            }
            if(value1 > 1000){
                _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setConfigErrors("Value can't be greater than 1000");
                return;
            }
        }

        if(!isNaN(value2)){
            if(value2 <= 0){
                _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setConfigErrors("Please enter a positive amount");
                return;
            }
            if(value2 > 1000){
                _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setConfigErrors("Value can't be greater than 1000");
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


/***/ }),

/***/ "./src/Controllers/MainController.js":
/*!*******************************************!*\
  !*** ./src/Controllers/MainController.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainController)
/* harmony export */ });
/* harmony import */ var _NavigationController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NavigationController.js */ "./src/Controllers/NavigationController.js");
/* harmony import */ var _StepController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StepController.js */ "./src/Controllers/StepController.js");
/* harmony import */ var _GridController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GridController.js */ "./src/Controllers/GridController.js");
/* harmony import */ var _SoundController_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SoundController.js */ "./src/Controllers/SoundController.js");
/* harmony import */ var _Views_NavigationView_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Views/NavigationView.js */ "./src/Views/NavigationView.js");
/* harmony import */ var _Views_GridView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Views/GridView.js */ "./src/Views/GridView.js");
/* harmony import */ var _Views_StepView_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Views/StepView.js */ "./src/Views/StepView.js");










class MainController {
    constructor(data) {
        this.data = data;
        this.navigationView = new _Views_NavigationView_js__WEBPACK_IMPORTED_MODULE_4__.default();
        this.stepView = new _Views_StepView_js__WEBPACK_IMPORTED_MODULE_6__.default();
        this.gridView = new _Views_GridView_js__WEBPACK_IMPORTED_MODULE_5__.default();
        
        this.gridController = new _GridController_js__WEBPACK_IMPORTED_MODULE_2__.default(this, data);
        this.stepController = new _StepController_js__WEBPACK_IMPORTED_MODULE_1__.default(this, data);
        this.soundController = new _SoundController_js__WEBPACK_IMPORTED_MODULE_3__.default();
        this.navigationController = new _NavigationController_js__WEBPACK_IMPORTED_MODULE_0__.default(this, data);

        this.stepView.init(this.stepController);
        this.gridView.init(this.gridController);
        this.navigationView.init(this.navigationController);

        this.refreshNavigation();
        this.refreshLocationScreen();
    }

    refreshNavigation() {
        this.navigationController.refreshNavigation();
    }

    refreshLocationScreen() {
        this.stepController.setStep();
        this.gridController.refreshGrid();
    }
    saveData() {
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    runSimulation() {
        window.location.href = "simulation.html";
    }
}


/***/ }),

/***/ "./src/Controllers/NavigationController.js":
/*!*************************************************!*\
  !*** ./src/Controllers/NavigationController.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavigationController)
/* harmony export */ });
/* harmony import */ var _Models_Location__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Models/Location */ "./src/Models/Location.js");


class NavigationController {
    constructor(mainController, data) {
        this.data = data;
        this.mainController = mainController;
        this.navigationController = mainController.navigationController;
        this.navigationView = mainController.navigationView;
    }

    addLocation() {

        if(this.data.locations.length < 6){
            this.data.addLocation(new _Models_Location__WEBPACK_IMPORTED_MODULE_0__.default({}));
            this.data.setCurrentLocation(this.data.locations.length);
            this.mainController.saveData();
    
            this.navigationView.refreshNavigation(this.data);
            this.mainController.refreshLocationScreen();
        }
        else{
            alert('You already have the maximum amount of locations!');
        }
    }

    deleteLocation(location) {
        if(this.data.locations.length <= 1) {
            alert('You can not delete all locations!');
            return;
        }
        this.data.deleteLocation(location);
        if(this.data.currentLocation == location) {
            this.data.setCurrentLocation(1);
        }
        this.mainController.saveData();
        this.navigationView.refreshNavigation(this.data);
        this.mainController.refreshLocationScreen();
    }

    refreshNavigation() {
        this.navigationView.refreshNavigation(this.data);
    }

    setCurrentLocation(location) {
        this.data.setCurrentLocation(location);
        this.navigationView.refreshNavigation(this.data);
        this.mainController.refreshLocationScreen();
    }

    getCurrentLocation() {
        return this.data.currentLocation();
    }
}

/***/ }),

/***/ "./src/Controllers/SoundController.js":
/*!********************************************!*\
  !*** ./src/Controllers/SoundController.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SoundController)
/* harmony export */ });
/* harmony import */ var _Models_Sound_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Models/Sound.js */ "./src/Models/Sound.js");


class SoundController {
    constructor() {

        this.selectSound = new _Models_Sound_js__WEBPACK_IMPORTED_MODULE_0__.default("../src/sounds/select-sound.mp3");
        this.dropSound = new _Models_Sound_js__WEBPACK_IMPORTED_MODULE_0__.default("../src/sounds/drop-sound.mp3");
    }

    playSelectSound(){
        this.selectSound.playSound();
    }

    playDropSound(){
        this.dropSound.playSound();
    }
}

/***/ }),

/***/ "./src/Controllers/StepController.js":
/*!*******************************************!*\
  !*** ./src/Controllers/StepController.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StepController)
/* harmony export */ });
/* harmony import */ var _Views_Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Views/Helper */ "./src/Views/Helper.js");


class StepController {
    constructor(mainController, data) {
        this.data = data;
        this.mainController = mainController;
        this.stepController = mainController.stepController;
        this.stepView = mainController.stepView;
    }

    
    setStep() {
        let location = this.data.getCurrentLocation();
        
        if(location.name == null || location.visitors == null) {
            this.stepView.generateStep1();
        }
        else if(location.tents == null) {
            this.stepView.generateStep2();
        }
        else if(location.eatingStands == null) {
            this.stepView.generateStep3();
        }
        else if(location.drinkStands == null) {
            this.stepView.generateStep4();
        }
        else if(location.highTrees == null) {
            this.stepView.generateStep5();
        }
        else if(location.toiletBuildings == null) {
            this.stepView.generateStep6();
        }
        else if(location.trashcans == null) {
            this.stepView.generateStep7();
        } else {
            this.stepView.generateFinal();
        }
    }

    resetConfig() {
        this.data.resetCurrentLocation();
        this.mainController.refreshNavigation();
        this.mainController.refreshLocationScreen();
        this.stepView.generateStep1();
        this.mainController.saveData();
    }
    //post step1
    step1(name, visitors) {
        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearStepErrors();
        if(visitors <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("Please fill in a positive amount of visitors");
            return;
        }
        visitors = parseInt(visitors);
        
        if(name.length <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("Please fill in a name");
            return;
        }
        
        if(visitors.length <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("Please fill in the amount of visitors");
             return;
        }
        if(name.length > 20) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("Name can't be longer than 20 characters");
            return;
        }
    
        if(visitors > 100000) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("There's a maximum of 100000 visitors");
            return;
        }
        this.data.getCurrentLocation().setName(name);
        this.data.getCurrentLocation().setVisitors(visitors);
        this.mainController.refreshNavigation();
        this.stepView.generateStep2();
        localStorage.setItem('data', JSON.stringify(this.data));
    }
    //post step2
    step2(tents) {
        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearStepErrors();
        if(tents.length <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("Please fill in a positive amount");
            return;
        }
        tents = parseInt(tents);
        
        if(tents < 0) { 
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("Please fill in an amount that's between 0 and 6");
            return
        }
        if(tents > 6) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("You can only have a maximum amonut of 6 tents");
            return;
        }
        this.data.getCurrentLocation().setAmountOfTents(tents);
        this.stepView.generateStep3();
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    //post step3 
    step3 (eatingStands) {
        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearStepErrors();
        if(eatingStands <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("Please fill in a positive amount");
            return;
        }
        eatingStands = parseInt(eatingStands);
        let maxEatingStands;
        if(this.data.getCurrentLocation().tents >= 1) {
            maxEatingStands = 3;
        } else {
            maxEatingStands = 6;
        }
        if(eatingStands > maxEatingStands) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("You can only have a maximum of "+ maxEatingStands + " eating stands");
            return;
        }
        this.data.getCurrentLocation().setAmountOfEatingStands(eatingStands);
        this.stepView.generateStep4();
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    //post step4
    step4 (drinkStands) {
        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearStepErrors();
        if(drinkStands <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("Please fill in a positive amount");
            return;
        }
        drinkStands = parseInt(drinkStands);
        let maxDrinkStands
        if(this.data.getCurrentLocation().tents >= 1) {
            maxDrinkStands = 2;
        } else {
            maxDrinkStands = 4;
        }
        if(drinkStands > maxDrinkStands) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("You can only have a maximum of "+ maxDrinkStands + " drink stands");
            return;
        }
        this.data.getCurrentLocation().setAmountOfDrinkStands(drinkStands);
        this.stepView.generateStep5();
        localStorage.setItem('data', JSON.stringify(this.data));
        
    }

    //post step5
    step5(highTrees, wideTrees, shadowTrees) {
        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearStepErrors();
        if(highTrees < 0 || wideTrees < 0 || shadowTrees < 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("Please fill in an amount at every tree");
            return;
        }
        highTrees = parseInt(highTrees);
        wideTrees = parseInt(wideTrees);
        shadowTrees = parseInt(shadowTrees);
        
        let totalTrees = highTrees + wideTrees + shadowTrees;

        if(highTrees < 0 || wideTrees < 0 || shadowTrees < 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("You can't choose less than 0 trees of some sort");
            return;
        }
        if(totalTrees > 10) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("You can only have a maximum of 10 trees");
            return;
        }
        this.data.getCurrentLocation().setAmountOfHighTrees(highTrees);
        this.data.getCurrentLocation().setAmountOfWideTrees(wideTrees);
        this.data.getCurrentLocation().setAmountOfShadowTrees(shadowTrees);
        this.stepView.generateStep6();
        localStorage.setItem('data', JSON.stringify(this.data));

    }

    step6(toiletBuildings) {
        if(toiletBuildings <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("Please fill in a positive amount more");
            return;
        }

        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearStepErrors();
        toiletBuildings = parseInt(toiletBuildings);
        if(toiletBuildings < 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("You cannot have a negative amount of toilet buildings");
            return;
        }
        if(toiletBuildings > 6) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("You cant have more than 6 toilet buildings");
            return;
        }

        this.data.getCurrentLocation().setAmountOfToiletBuildings(toiletBuildings);

        let filled = this.data.getCurrentLocation().getAmountOfFieldsFilled();
        let nonfilled = 15 * 15 - filled;
        let maximumAmountOfTrashcans = parseInt(filled * 0.05);
        this.stepView.generateStep7(maximumAmountOfTrashcans);
        localStorage.setItem('data', JSON.stringify(this.data));

    }

    step7(trashcans) {
        

        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearStepErrors();

        if(trashcans <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("Please fill in a positive amount");
            return;
        }
        trashcans = parseInt(trashcans);
        let filled = this.data.getCurrentLocation().getAmountOfFieldsFilled();
        let nonfilled = 15 * 15 - filled;
        let maximumAmountOfTrashcans = parseInt(filled * 0.05);
        if(trashcans > maximumAmountOfTrashcans) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors("You can only have a maximum of " + maximumAmountOfTrashcans + " trashcans.");
            return;
        }

        this.data.getCurrentLocation().setAmountOfTrashCans(trashcans);
        this.data.getCurrentLocation().setStepsAreSet(true);
        localStorage.setItem('data', JSON.stringify(this.data));
        this.stepView.generateFinal();
        this.mainController.refreshLocationScreen();
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

    scanWaitingLines(weather) {
        let scannedPeople = [];
        for(let i = 0; i < this.waitingLines.length; i++) {
            let groupOfPeople  = this.waitingLines[i].scan();
            if(typeof groupOfPeople !== 'undefined') {
                
                scannedPeople.push(groupOfPeople);
            }
        }
        this.locateGroupsOfPeople(scannedPeople, weather);
    }
    locateGroupsOfPeople(people, weather) {

        console.log(weather);
    
        people.forEach(group =>  {
            let location = Math.floor(Math.random() * this.locations.length);
            let x = Math.floor(Math.random() * 15);
            let y = Math.floor(Math.random() * 15);
            
            while(!this.locations[location].getGridBlock(x,y).canPlace(group.getAmountOfPeople(), 7, weather)) {
                x = Math.floor(Math.random() * 15);
                y = Math.floor(Math.random() * 15);
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

/***/ "./src/Models/Sound.js":
/*!*****************************!*\
  !*** ./src/Models/Sound.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sound)
/* harmony export */ });
class Sound {
    
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    playSound(){
        this.sound.play();
    }

    pauseSound(){
        this.sound.pause();
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

/***/ "./src/Views/GridView.js":
/*!*******************************!*\
  !*** ./src/Views/GridView.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GridView)
/* harmony export */ });
/* harmony import */ var _Helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helper.js */ "./src/Views/Helper.js");


class GridView {
    
    constructor() {
        this.windowSize = 750;
        this.gridSize = 15;
        this.paneSize = this.windowSize / this.gridSize;
     }

    init(gridController) {
        this.gridController = gridController;
    }

    refreshNormal(data) {
        
        this.generateRightSide();
        this.generateGrid();
        this.drawGridItems();   
        this.generateImages(data);
        this.dropEvents();       
    }

    refreshLocked() {
        
        this.drawRegionLock();
        this.generateGrid();
        this.drawGridItems(); 
        this.lockEvents();    
    }

    generateRightSide() {
        let block = document.getElementById("right-side")
        block.className = "w-1/5 h-full bg-gray-200 flex flex-col p-5 justify-between";

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let itemLegenda = document.createElement("div");
        itemLegenda.className = "w-full flex flex-row flex-wrap";
        itemLegenda.id = "images_block";

        let div = document.createElement("div");
        div.className = "h-3.5/5 w-full flex flex-col";

        let dropbackzone = document.createElement("div");
        dropbackzone.className = "bg-gray-400 w-full h-full mb-5";
        dropbackzone.innerHTML = "Drop back items here!";
        dropbackzone.style.fontStyle = "italic";
        dropbackzone.style.textAlign = 'center';
        dropbackzone.style.lineHeight = '240px';
        dropbackzone.id = "dropbackzone";

        let lockRegion = document.createElement("button");
        lockRegion.addEventListener('click', () => { if(confirm('Are you sure you want to lock this region?')) this.gridController.lockRegion(); });
        lockRegion.innerHTML = "Lock region";
        lockRegion.className = "p-5 mb-5 bg-blue-500 hover:bg-blue-800 hover:text-white w-full";
        lockRegion.id = "lock_button"

        let runSimulation = document.createElement("button");
        runSimulation.innerHTML = "Run simulation";
        runSimulation.addEventListener("click" , () => {this.runSimulation()})
        runSimulation.className = "p-5 bg-green-500 hover:bg-green-800 hover:text-white w-full";

        div.appendChild(dropbackzone);
        div.appendChild(lockRegion);
        div.appendChild(runSimulation);

        block.appendChild(itemLegenda);
        block.appendChild(div);
    }
    runSimulation() {
        this.gridController.mainController.runSimulation();
    }
    
    generateGrid() {
        let paneSize = this.paneSize;
        let windowSize = this.windowSize;

        const grid = document.getElementById("grid");
                        grid.style.position = "relative";
                        grid.style.width = `${windowSize}px`;
                        grid.style.height = `${windowSize}px`;

                        while (grid.firstChild) {
                            grid.removeChild(grid.firstChild);
                        }
                        
        let rows = this.gridSize;
                    let cols = this.gridSize;
                    for(let x = 0; x < rows; x++) {
                        for(let y = 0; y < cols; y++) {
                            const gridPane = document.createElement("div");
                        gridPane.className =  `border gridpane absolute border border-gray-100 hover:bg-gray-400 dropzone`;
                        gridPane.id = `x${x}y${y}`;
                        gridPane.style.left = `${x * paneSize}px`;
                        gridPane.style.top = `${y * paneSize}px`;
                        gridPane.style.height = `${paneSize}px`;
                        gridPane.style.width = `${paneSize}px`;
                        gridPane.style.position = "absolute";
                        grid.appendChild(gridPane);
                        let item = this.gridController.getItem(x,y);
                        if(item == "tent" || item == "drinkStand" || item == "toilet" || item == "foodStand" || item == "trashcan") {
                            let image = this.getImageBlock(item);
                            
                            gridPane.insertBefore(image, gridPane.firstChild);
                        }
                        if( item == "wideTree" || item == "highTree" || item == "shadowTree" ) {
                            let image = this.getImageBlock(item);
                            image.setAttribute('draggable', false);
                            gridPane.insertBefore(image, gridPane.firstChild);
                        }
                        }
                    }
                    
    }

    drawRegionLock(){
        let block = document.getElementById("right-side")
        block.className = "w-1/5 h-full bg-gray-200 flex flex-col p-5 justify-end";

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let div = document.createElement("div");
        div.className = "h-3.5/5 w-full flex flex-col";
        div.style.verticalAlign = "bottom";

        let runSimulation = document.createElement("button");
        runSimulation.innerHTML = "Run simulation";
        runSimulation.className = "p-5 bg-green-500 hover:bg-green-800 hover:text-white w-full";

        div.appendChild(runSimulation);

        block.appendChild(div);
    }

    drawGridItems() {
        for(let x = 0; x < this.gridSize; x++) {
            for(let y = 0; y < this.gridSize; y++) {
                let type = this.gridController.getItem(x,y);
               
                document.getElementById('x' + x + 'y' + y).style.backgroundColor = "white";
                if(type == "tentSurface" || type == "tent") {
                    document.getElementById('x' + x + 'y' + y).style.backgroundColor = "yellow";
                } else if(type =="drinkStandSurface" || type == "drinkStand") {
                    document.getElementById('x' + x + 'y' + y).style.backgroundColor = "red";
                } else if(type =="toiletSurface" || type == "toilet") {
                    document.getElementById('x' + x + 'y' + y).style.backgroundColor = "grey";
                } else if(type =="highTreeSurface" || type =="wideTreeSurface" || type == "shadowTreeSurface" || type=="highTree" || type == "wideTree" || type=="shadowTree") {
                    document.getElementById('x' + x + 'y' + y).style.backgroundColor = "green";
                } else if(type =="foodStand") {
                    document.getElementById('x' + x + 'y' + y).style.backgroundColor = "brown";
                }
                 else if(type =="trashcan") {
                document.getElementById('x' + x + 'y' + y).style.backgroundColor = "grey";
                }
            }
        }
    }
   
    generateImages(data) {
        let block = document.getElementById("images_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }
        
        this.generateImage('tent', data.getCurrentLocation().tents, block);
        this.generateImage('foodStand',  data.getCurrentLocation().eatingStands, block);
        this.generateImage('drinkStand',  data.getCurrentLocation().drinkStands, block);
        this.generateImage('toilet',  data.getCurrentLocation().toiletBuildings, block);
        this.generateImage('trashcan',  data.getCurrentLocation().trashcans, block);
    } 

    generateImage(type, amount, parent){
        
        let subBlock = document.createElement("div");
        subBlock.className = "w-full flex flex-row flex-wrap";

        for(let i =0;i< amount;i++){
            let image = this.getImageBlock(type);
            
            subBlock.appendChild(image);
            parent.appendChild(subBlock);
        }
    }

    getImageBlock(type) {
        let image = document.createElement("img");
        image.src = "../src/images/"+ type +".png";
        image.id = type;
        image.setAttribute('draggable', !this.gridController.getRegionLock());
        image.className = "draggable-item";
        image.style.width = "50px";
        image.style.height = "50px";
        return image;
    }

    drawConfigOptions(x, y, text1, value1, type1, text2, value2, type2){
        
        let block = document.getElementById("right-side")
        block.className = "w-1/5 h-full bg-gray-200 flex flex-col p-5 justify-between";

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let errorBox = document.createElement("div");
        errorBox.className = "p-3 mb-2 bg-red-200";
        errorBox.id = 'configErrorbox'
        errorBox.style.verticalAlign = "bottom";

        let div = document.createElement("div");
        div.className = "h-3.5/5 w-full flex flex-col";

        let firstInput = _Helper_js__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('firstInput', type1);
        firstInput.value = value1;
        let firstInputLabel = _Helper_js__WEBPACK_IMPORTED_MODULE_0__.default.getLabel(text1);
        let firstInputBlock = _Helper_js__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(firstInputLabel, firstInput);

        let secondInput = _Helper_js__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('secondInput', type2);
        secondInput.value = value2;
        let secondInputLabel = _Helper_js__WEBPACK_IMPORTED_MODULE_0__.default.getLabel(text2);
        let secondInputBlock = _Helper_js__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(secondInputLabel, secondInput);
        
        let submitButton = _Helper_js__WEBPACK_IMPORTED_MODULE_0__.default.getButton("Save", "save-button", () => {
            this.gridController.updateConfigData(x, y, firstInput.value, secondInput.value);                
        }); 

        _Helper_js__WEBPACK_IMPORTED_MODULE_0__.default.appendChilds([errorBox, firstInputBlock, secondInputBlock, submitButton], div);

        let div2 = document.createElement("div");
        div2.className = "h-3.5/5 w-full flex flex-col";

        let runSimulation = document.createElement("button");
        runSimulation.innerHTML = "Run simulation";
        runSimulation.className = "p-5 bg-green-500 hover:bg-green-800 hover:text-white w-full";

        div2.appendChild(runSimulation);

        block.appendChild(div);
        block.appendChild(div2);

        _Helper_js__WEBPACK_IMPORTED_MODULE_0__.default.clearConfigErrors();
    }

    dropEvents(){
        let draggableItems = document.getElementsByClassName('draggable-item');
        let dropzones = document.getElementsByClassName('dropzone');
        
        let element;
        
        for(let i = 0; i < draggableItems.length;i++) {
            draggableItems[i].addEventListener('dragstart', (e) => {
                element = e.target;
                this.gridController.mainController.soundController.playSelectSound();
            });
        }
        
        for(let i = 0; i < dropzones.length; i++) {
            dropzones[i].addEventListener('dragover', (e) => {
                e.preventDefault();
                if(element.parentNode.classList.contains("dropzone")) {
                    this.gridController.deleteGridFill(element.parentNode.id, element.id);
                }
            }); 
    
            dropzones[i].addEventListener('drop', (e) => {

                if(this.gridController.canPlace(e.target.id, element.id)) {
                    e.preventDefault();
                    if(element.parentNode.classList.contains('dropzone')) {
                        this.gridController.moveItem(e.target.id, element.id);
                    } else {
                        this.gridController.setGridFill(e.target.id, element.id);            
                    } 
                    this.gridController.mainController.soundController.playDropSound();  
                } else {
                    alert("You can't place your item right here!");

                    if(element.parentNode.classList.contains("dropzone")) {
                        this.gridController.moveItem(element.parentNode.id, element.id);
                    }
                }
                this.gridController.refreshGrid();
            });       
        }
        
        let dropbackzone = document.getElementById('dropbackzone');
        dropbackzone.addEventListener('dragover', (e) => {
            e.preventDefault();
        }); 

        dropbackzone.addEventListener('drop', (e) => {
            e.preventDefault();
            // e.stopImmediatePropagation();
            if(element.parentNode.classList.contains("dropzone")) {
                this.gridController.dropBack(element.id);
                this.gridController.mainController.soundController.playDropSound();
            } else {
                alert("You can't place your item right here!");
            }
            this.gridController.refreshGrid();
        })
    }

        lockEvents(){
            let draggableItems = document.getElementsByClassName('draggable-item');
            
            for(let i = 0; i < draggableItems.length;i++) {
                draggableItems[i].addEventListener('click', (e) => {
                    this.gridController.setConfigurationField(e.target.parentNode.id);                   
                });
            }
        }
}

/***/ }),

/***/ "./src/Views/Helper.js":
/*!*****************************!*\
  !*** ./src/Views/Helper.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Helper)
/* harmony export */ });
class Helper {
    static getButton(name, id, onclick) {
        let button = document.createElement("button");
        button.innerHTML = name;
        button.className = 'p-2 bg-green-500 hover:bg-green-800 hover:text-white w-full';
        button.onclick = onclick;
        button.id = id;
        return button;
    }
    static getLabel(text, forname) {
        let inputLabel = document.createElement("label");
        inputLabel.htmlFor = forname;
        inputLabel.innerHTML = text;
        return inputLabel;
    }
    static getInputField(id, type) {
        let input = document.createElement("input");
        input.setAttribute('type', type);
        input.attributes.required = "required";
        input.id = id;
        return input;
    }
    static getDivForInput(label, input) {
        let inputblock = document.createElement("div");
        inputblock.appendChild(label);
        inputblock.appendChild(input);
        inputblock.className = "mb-5 flex flex-col";
        return inputblock;
    }

    static appendChilds(childs, parent) {
        childs.forEach(child => {parent.appendChild(child)});
    }

    static clearStepErrors() {
        let errorbox = document.getElementById("stepErrorbox");
        errorbox.style.display = "none";
        errorbox.innerHTML = "";
    }

    static setStepErrors(errors) {
        if(errors != null) {
                let errorbox = document.getElementById("stepErrorbox");
                errorbox.style.display = "block";
                errorbox.innerHTML = errors;
        }
    }

    static clearConfigErrors() {
        let errorbox = document.getElementById("configErrorbox");
        errorbox.style.display = "none";
        errorbox.innerHTML = "";
    }

    static setConfigErrors(errors) {
        if(errors != null) {
                let errorbox = document.getElementById("configErrorbox");
                errorbox.style.display = "block";
                errorbox.innerHTML = errors;
        }
    }
}

let helper = new Helper();

/***/ }),

/***/ "./src/Views/MainView.js":
/*!*******************************!*\
  !*** ./src/Views/MainView.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainView)
/* harmony export */ });
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helper */ "./src/Views/Helper.js");


class MainView {
    

    init(mainController, navigationController, stepController) {
        this.mainController = mainController;
        this.navigationController = navigationController;
        this.stepController = stepController;

    
    }

    error(error) {
        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.setStepErrors(error);
    }
    
} 

/***/ }),

/***/ "./src/Views/NavigationView.js":
/*!*************************************!*\
  !*** ./src/Views/NavigationView.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavigationView)
/* harmony export */ });
class NavigationView {
    constructor() {

    }
    init(navigationController) {
        this.navigationController = navigationController;
        
        const addLocationButton = document.getElementById('addLocation');
        
        addLocationButton.addEventListener('click', () => {this.navigationController.addLocation()});
    }
    refreshNavigation(data) {
        
        this.generateLocationMenu(data);
        this.refreshLocationPage(data);
    }

    refreshLocationPage(data) {
        let name = "name unknown";
        if(data.getCurrentLocation().name != null)  name = data.getCurrentLocation().name;
        document.getElementById("location_name").innerHTML = name;
    }

    generateLocationMenu(data) {
        this.clearNavigation();
        const nav = document.getElementById("nav"); 
        let i = 1;
        data.locations.forEach((location) => {this.drawLocationButton(location, i,data); i++; });
        
    }

    drawLocationButton(location, i,data) {
            let name = "name unkown";
            if(location.name != null)  name = location.name;
            let navItem = document.createElement("div");
            navItem.className = "flex flex-row navItem";
            
            
            let navButton = document.createElement("button");
            navButton.innerHTML = name;
            navButton.id = 'navButton' + i;
            navButton.addEventListener('click', () => { this.navigationController.setCurrentLocation(i); });

            navButton.className = `navbutton bg-gray-200 p-3 pb-2 hover:bg-gray-500 hover:text-white flex flex-row`;
                       
            let deleteButton = document.createElement("button");
            deleteButton.addEventListener('click', () => { if(confirm('Are you sure you want to delete this location?')) this.navigationController.deleteLocation(i); });
            deleteButton.id = 'deleteButton' + i;
            deleteButton.className = ` bg-red-500 hover:bg-red-800 hover:text-white pl-3 pr-3`;
            deleteButton.innerHTML = `X`;

            navItem.appendChild(navButton);
            navItem.appendChild(deleteButton);
            nav.appendChild(navItem);
            
    }

    clearNavigation() {
        let elements = document.getElementsByClassName('navItem');
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}

/***/ }),

/***/ "./src/Views/StepView.js":
/*!*******************************!*\
  !*** ./src/Views/StepView.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StepView)
/* harmony export */ });
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helper */ "./src/Views/Helper.js");


class StepView {
    constructor() {
       this.windowSize = 750;
       this.gridSize = 15;
       this.paneSize = this.windowSize / this.gridSize;
    }

    init(stepController) {
        
        this.stepController = stepController;

        document.getElementById("resetConfig").addEventListener('click' , () => {stepController.resetConfig();})
        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearStepErrors();
    }
    generateStep1() {
        let block = document.getElementById("configuration_block");
        
        block.className = 'h-full';
        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let nameInput = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('nameInput', 'text');
        let nameInputLabel = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getLabel('Name: ', 'nameInput');
        let inputblock1 = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(nameInputLabel, nameInput);

        let visitorInput = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('visitorInput', 'number');
        let visitorInputLabel = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getLabel('Visitors: ', 'visitorInput');
        let inputblock2 = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(visitorInputLabel, visitorInput);
        
        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", "step1-button", () => {this.stepController.step1(nameInput.value, visitorInput.value)});
        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.appendChilds([inputblock1, inputblock2, submitButton], block);
    }

    generateStep2() {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let tentInput = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('tentInput', 'number');
        let tentInputLabel = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getLabel('Amount of tents: ', 'tentInput');
        let inputblock = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(tentInputLabel, tentInput);

        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", "step2-button", () => {this.stepController.step2(tentInput.value); });

        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.appendChilds([inputblock, submitButton], block);
    }
    generateStep3() {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let eatingStallsInput = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('eatingStallInput', 'number');
        let eatingStallInputLabel = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getLabel('Amount of eating stalls: ', 'eatingStallInput');
        let inputblock = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(eatingStallInputLabel, eatingStallsInput);

        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", "step3-button", () => {this.stepController.step3(eatingStallInput.value); });

        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.appendChilds([inputblock, submitButton], block);
    }

    generateStep4() {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let drinkStallsInput = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('drinkStallInput', 'number');
        let drinkStallInputLabel = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getLabel('Amount of drinking stalls: ', 'drinkStallInput');
        let inputblock = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(drinkStallInputLabel, drinkStallsInput);

        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", "step4-button", () => {this.stepController.step4(drinkStallInput.value); });

        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.appendChilds([inputblock, submitButton], block);
    }

    generateStep5() {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let highTreeInput =  _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('highTreeInput', 'number');
        let highTreeInputLabel = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getLabel('Amount of high trees(1x1): ', 'highTreeInput');
        let inputBlock1 = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(highTreeInputLabel, highTreeInput);

        let wideTreeInput =  _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('wideTreeInput', 'number');
        let wideTreeInputLabel = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getLabel('Amount of wide trees(2x1): ', 'wideTreeInput');
        let inputBlock2 = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(wideTreeInputLabel, wideTreeInput);

        let shadowTreeInput =  _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('shadowTreeInput', 'number');
        let shadowTreeInputLabel = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getLabel('Amount of shadow trees(3x3): ', 'shadowTreeInput');
        let inputBlock3 = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(shadowTreeInputLabel, shadowTreeInput);

        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", "step5-button", () => {this.stepController.step5(highTreeInput.value, wideTreeInput.value, shadowTreeInput.value)});

        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.appendChilds([inputBlock1, inputBlock2, inputBlock3, submitButton], block)

        
    }

    generateStep6() {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let toiletBuildingsInput = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('toiletBuildingsInput', 'number');
        let toiletBuildingsInputLabel = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getLabel('Amount of toilet buildings: ', 'toiletBuildingsInput');
        let inputblock = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(toiletBuildingsInputLabel, toiletBuildingsInput);

        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", "step6-button", () => {this.stepController.step6(toiletBuildingsInput.value); });

        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.appendChilds([inputblock, submitButton] , block);

    }

    generateStep7(maximumAmountOfTrashcans) {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let trashCanInput = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('trashCanInput', 'number');
        let trashCanInputLabel = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getLabel('Amount of trashcans (max: ' + maximumAmountOfTrashcans + '): ', 'trashCanInput');
        let inputblock = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(trashCanInputLabel, trashCanInput);

        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", "step7-button", () => {this.stepController.step7(trashCanInput.value); });

        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.appendChilds([inputblock, submitButton] , block);

    }

    generateFinal() {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

       
        let label = document.createElement("div");
        label.innerHTML = "You have now configured your location";

        block.appendChild(label);
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
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Controllers_MainController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controllers/MainController.js */ "./src/Controllers/MainController.js");
/* harmony import */ var _Controllers_NavigationController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Controllers/NavigationController.js */ "./src/Controllers/NavigationController.js");
/* harmony import */ var _Controllers_StepController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Controllers/StepController.js */ "./src/Controllers/StepController.js");
/* harmony import */ var _Controllers_GridController_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Controllers/GridController.js */ "./src/Controllers/GridController.js");
/* harmony import */ var _Views_MainView_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Views/MainView.js */ "./src/Views/MainView.js");
/* harmony import */ var _Views_NavigationView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Views/NavigationView.js */ "./src/Views/NavigationView.js");
/* harmony import */ var _Views_GridView_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Views/GridView.js */ "./src/Views/GridView.js");
/* harmony import */ var _Models_Data_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Models/Data.js */ "./src/Models/Data.js");
/* harmony import */ var _Views_StepView_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Views/StepView.js */ "./src/Views/StepView.js");












let jsonString = localStorage.getItem('data');
let dataobject = JSON.parse(jsonString);

const data = new _Models_Data_js__WEBPACK_IMPORTED_MODULE_7__.default(dataobject);


localStorage.setItem('data', JSON.stringify(data));

new _Controllers_MainController_js__WEBPACK_IMPORTED_MODULE_0__.default(data);

// fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=Wijchen%2Cnl&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=JSON", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "4ac4ef64ddmsh0525110e0560ae5p1be00fjsnb9cd1e0d5f28",
// 		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });




})();

/******/ })()
;
//# sourceMappingURL=main.js.map