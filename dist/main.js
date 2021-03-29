/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controllers/MainController.js":
/*!*******************************************!*\
  !*** ./src/Controllers/MainController.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainController)
/* harmony export */ });
class MainController {
    constructor(gridView, data) {
        this.data = data;
        this.gridView = gridView;
    }

    
    getData() {
        return data;
    }

    generateGrid() {
        function generateGrid() {
            paneSize = 50;
            let rows = 15;
                        let cols = 15;
                        for(let i = 0; i < rows; i++) {
                            for(let j = 0; j < cols; j++) {
                                addGridPane(j, i);
                            }
                        }
                        function addGridPane(x, y) {
                            const gridPane = document.createElement("div");
                            gridPane.className =  `border gridpane absolute border border-black hover:bg-gray-400`;
                            gridPane.id = `x${x}y${y}`;
                            gridPane.style.left = `${x * paneSize}px`;
                            gridPane.style.top = `${y * paneSize}px`;
                            const grid = document.getElementById("grid");
                            grid.appendChild(gridPane);
                        }
        }
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
    constructor(navigationView, stepView, stepController, data) {
        this.data = data;
        this.stepView = stepView;
        this.stepController = stepController;
        this.navigationView = navigationView;
    }

    addLocation() {
        this.data.addLocation(new _Models_Location__WEBPACK_IMPORTED_MODULE_0__.default({}));
        this.data.setCurrentLocation(this.data.locations.length);
        localStorage.setItem('data', JSON.stringify(this.data));

        this.navigationView.refreshNavigation(this.data);
        this.stepView.generateStep1();

    }

    deleteLocation(location) {
        if(this.data.locations.length <= 1) {
            alert('You can not delete all locations');
            return;
        }
        this.data.deleteLocation(location);
        if(this.data.currentLocation == location) {
            this.data.setCurrentLocation(1);
        }
        localStorage.setItem('data', JSON.stringify(this.data));
        this.stepController.setStep();
        
        this.navigationView.refreshNavigation(this.data);
        
    }

    getData() {
        return this.data;
    }

    refreshNavigation() {
        this.navigationView.refreshNavigation(this.data);
    }

    setCurrentLocation(location) {
        this.data.setCurrentLocation(location);
        this.navigationView.refreshNavigation(this.data);
    }

    getCurrentLocation() {
        return this.data.currentLocation();
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
    constructor(stepView, navigationView, data) {
        this.data = data;
        this.stepView = stepView;
        this.navigationView = navigationView;
        
        this.setStep();
    }

    setStep() {
        let location = this.data.getCurrentLocation();
        if(typeof location !== 'undefined') {
            this.stepView.generateStep1();
        }
        if(location.name == null || location.visitors == null) {
            this.stepView.generateStep1();
        }
        else if(location.tents == null) {
            this.stepView.generateStep2();
        }
        else if(location.eatingStalls == null) {
            this.stepView.generateStep3();
        }
        else if(location.drinkStalls == null) {
            this.stepView.generateStep4();
        }
        else if(location.highTrees == null) {
            this.stepView.generateStep5();
        }
        else if(location.toiletBuildings == null) {
            this.stepView.generateStep6();
        }
        else if(location.trashCans == null) {
            this.stepView.generateStep7();
        }
    }

    resetConfig() {
        this.data.resetCurrentLocation();
        this.navigationView.refreshNavigation(this.data);
        this.stepView.generateStep1();
        localStorage.setItem('data', JSON.stringify(this.data));
    }
    //post step1
    step1(name, visitors) {
        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearErrors();
        if(visitors.length <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("Please fil in a amount of visitors");
            return;
        }
        visitors = parseInt(visitors);
        
        if(name.length <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("Please fill in a name");
            return;
        }
        
        if(visitors.length <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("Please fill in the amount of visitors");
             return;
        }
        if(name.length > 20) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("Name can't be longer than 20 characters");
            return;
        }
    
        if(visitors > 100000) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("There's a maximum of 100000 visitors");
            return;
        }
        this.data.getCurrentLocation().setName(name);
        this.data.getCurrentLocation().setVisitors(visitors);
        this.navigationView.refreshNavigation(this.data);
        this.stepView.generateStep2();
        localStorage.setItem('data', JSON.stringify(this.data));
    }
    //post step2
    step2(tents) {
        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearErrors();
        if(tents.length <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("Please fill in an amount");
            return;
        }
        tents = parseInt(tents);
        
        if(tents < 0) { 
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("Please fill in an amount that's between 0 and 6");
            return
        }
        if(tents > 6) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("You can only have a maximum amonut of 6 tents");
            return;
        }
        this.data.getCurrentLocation().setAmountOfTents(tents);
        this.stepView.generateStep3();
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    //post step3 
    step3 (eatingStalls) {
        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearErrors();
        if(eatingStalls.length <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("Please fill in an amount");
            return;
        }
        eatingStalls = parseInt(eatingStalls);
        let maxEatingStalls;
        if(this.data.getCurrentLocation().tents >= 1) {
            maxEatingStalls = 3;
        } else {
            maxEatingStalls = 6;
        }
        if(eatingStalls > maxEatingStalls) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("You can only have a maximum of "+ maxEatingStalls + " eating stalls");
            return;
        }
        this.data.getCurrentLocation().setAmountOfEatingStalls(eatingStalls);
        this.stepView.generateStep4();
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    //post step4
    step4 (drinkStalls) {
        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearErrors();
        if(drinkStalls.length <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("Please fill in an amount");
            return;
        }
        drinkStalls = parseInt(drinkStalls);
        let maxdrinkStalls
        if(this.data.getCurrentLocation().tents >= 1) {
            maxdrinkStalls = 2;
        } else {
            maxdrinkStalls = 4;
        }
        if(drinkStalls > maxdrinkStalls) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("You can only have a maximum of "+ maxdrinkStalls + " drink stalls");
            return;
        }
        this.data.getCurrentLocation().setAmountOfDrinkStalls(drinkStalls);
        this.stepView.generateStep5();
        localStorage.setItem('data', JSON.stringify(this.data));
        
    }

    //post step5
    step5(highTrees, wideTrees, shadowTrees) {
        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearErrors();
        if(highTrees.length <= 0 || wideTrees.length <= 0 || shadowTrees.length <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("Please fill in an amount at every tree");
            return;
        }
        highTrees = parseInt(highTrees);
        wideTrees = parseInt(wideTrees);
        shadowTrees = parseInt(shadowTrees);
        
        let totalTrees = highTrees + wideTrees + shadowTrees;

        if(highTrees < 0 || wideTrees < 0 || shadowTrees < 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("You can't choose less than 0 trees of some sort");
            return;
        }
        if(totalTrees > 10) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("You can only have a maximum of 10 trees");
            return;
        }
        this.data.getCurrentLocation().setAmountOfHighTrees(highTrees);
        this.data.getCurrentLocation().setAmountOfWideTrees(wideTrees);
        this.data.getCurrentLocation().setAmountOfShadowTrees(shadowTrees);
        this.stepView.generateStep6();
        localStorage.setItem('data', JSON.stringify(this.data));

    }

    step6(toiletBuildings) {
        if(toiletBuildings.length <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("Please fill in an amount");
            return;
        }

        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearErrors();
        toiletBuildings = parseInt(toiletBuildings);
        if(toiletBuildings < 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("You cannot have a negative amount of toilet buildings");
            return;
        }
        if(toiletBuildings > 5) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("You cant have more than 6 toilet buildings");
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
        

        _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearErrors();

        if(trashcans.length <= 0) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("Please fill in an amount");
            return;
        }
        trashcans = parseInt(trashcans);
        let filled = this.data.getCurrentLocation().getAmountOfFieldsFilled();
        let nonfilled = 15 * 15 - filled;
        let maximumAmountOfTrashcans = parseInt(filled * 0.05);
        if(trashcans > maximumAmountOfTrashcans) {
            _Views_Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors("You can only have a maximum of " + maximumAmountOfTrashcans + " trashcans.");
            return;
        }

        this.data.getCurrentLocation().setAmountOfTrashCans(trashcans);

        localStorage.setItem('data', JSON.stringify(this.data));
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
/* harmony import */ var _Location__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Location */ "./src/Models/Location.js");


class Data {
    constructor(dataobject) {
        console.log(dataobject);
        if(dataobject == null) {
            this.locations = [new _Location__WEBPACK_IMPORTED_MODULE_0__.default({})];
            this.currentLocation = 1;
        }
        else if(dataobject.locations.length <= 0) {
            this.locations = [new _Location__WEBPACK_IMPORTED_MODULE_0__.default({})];
            this.currentLocation = 1;
        }
        else if(dataobject != null) {
            this.locations = [];
            console.log("hier");
            dataobject.locations.forEach(element => {
                this.locations.push(new _Location__WEBPACK_IMPORTED_MODULE_0__.default(element));
            });
            this.currentLocation = dataobject.currentLocation;
        } else {
            this.locations = [new _Location__WEBPACK_IMPORTED_MODULE_0__.default({})];
            this.currentLocation = 1;
        }
        
    }

    addLocation(location) {
        this.locations.push(location);
    }
    deleteLocation(location) {
        if(location == this.currentLocation) {
           this.currentLocation = 1;
        }
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
        this.locations[this.currentLocation - 1] = new _Location__WEBPACK_IMPORTED_MODULE_0__.default({});
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
class Location {

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
    static getButton(name, onclick) {
        let button = document.createElement("button");
        button.innerHTML = name;
        button.className = 'p-2 bg-green-500 hover:bg-green-800 hover:text-white w-full';
        button.onclick = onclick;
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

    static clearErrors() {
        let errorbox = document.getElementById("errorbox");
        errorbox.style.display = "none";
        errorbox.innerHTML = "";
    }

    static setErrors(errors) {
        if(errors != null) {
                let errorbox = document.getElementById("errorbox");
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
    constructor() {
       this.windowSize = 750;
       this.gridSize = 15;
       this.paneSize = this.windowSize / this.gridSize;
    }

    init(mainController, navigationController, stepController) {
        this.mainController = mainController;
        this.navigationController = navigationController;
        this.stepController = stepController;

        this.generateGrid();
        let step = stepController.setStep(1);
        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearErrors();
        
    }

    error(error) {
        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.setErrors(error);
    }
    generateGrid() {
        let paneSize = this.paneSize;
        let windowSize = this.windowSize;
        
        const grid = document.getElementById("grid");
                        grid.style.position = "relative";
                        grid.style.width = `${windowSize}px`;
                        grid.style.height = `${windowSize}px`;
                        
        let rows = this.gridSize;
                    let cols = this.gridSize;
                    for(let i = 0; i < rows; i++) {
                        for(let j = 0; j < cols; j++) {
                            addGridPane(j, i);
                        }
                    }
                    function addGridPane(x, y) {
                        const gridPane = document.createElement("div");
                        gridPane.className =  `border gridpane absolute border border-black hover:bg-gray-400`;
                        gridPane.id = `x${x}y${y}`;
                        gridPane.style.left = `${x * paneSize}px`;
                        gridPane.style.top = `${y * paneSize}px`;
                        gridPane.style.height = `${paneSize}px`;
                        gridPane.style.width = `${paneSize}px`;
                        gridPane.style.position = "absolute"
                        grid.appendChild(gridPane);
                    }
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
    init(mainController, navigationController, stepController) {
        this.mainController = mainController;
        this.navigationController = navigationController;
        this.stepController = stepController;
        const addLocationButton = document.getElementById('addLocation');
        
        addLocationButton.addEventListener('click', () => {this.navigationController.addLocation()});
        this.navigationController.refreshNavigation();
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
            navButton.addEventListener('click', () => { this.navigationController.setCurrentLocation(i); this.refreshLocationPage(data); this.stepController.setStep(); });

            navButton.className = `navbutton bg-gray-200 p-3 pb-2 hover:bg-gray-500 hover:text-white flex flex-row`;
                       
            let deleteButton = document.createElement("button");
            deleteButton.addEventListener('click', () => { if(confirm('Are you sure you want to delete this location?')) this.navigationController.deleteLocation(i); });
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

    init(mainController, navigationController, stepController) {
        this.mainController = mainController;
        this.navigationController = navigationController;
        this.stepController = stepController;

        
        document.getElementById("resetConfig").addEventListener('click' , () => {stepController.resetConfig();})
        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.clearErrors();
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

        let visitorInput = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('vistorInput', 'number');
        let visitorInputLabel = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getLabel('Visitors: ', 'visitorInput');
        let inputblock2 = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(visitorInputLabel, visitorInput);
        
        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", () => {this.stepController.step1(nameInput.value, visitorInput.value)});
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

        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", () => {this.stepController.step2(tentInput.value); });

        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.appendChilds([inputblock, submitButton], block);
    }
    generateStep3() {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let eatingStallsInput = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('eatingStallInput', 'number');
        let eatingStallInputLabel = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getLabel('Amount of teating stalls: ', 'eatingStallInput');
        let inputblock = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(eatingStallInputLabel, eatingStallsInput);

        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", () => {this.stepController.step3(eatingStallInput.value); });

        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.appendChilds([inputblock, submitButton], block);
    }

    generateStep4() {
        let block = document.getElementById("configuration_block");

        while (block.firstChild) {
            block.removeChild(block.firstChild);
        }

        let drinkStallsInput = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getInputField('drinkStallInput', 'number');
        let drinkStallInputLabel = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getLabel('Amount of tdrink stalls: ', 'drinkStallInput');
        let inputblock = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getDivForInput(drinkStallInputLabel, drinkStallsInput);

        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", () => {this.stepController.step4(drinkStallInput.value); });

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

        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", () => {this.stepController.step5(highTreeInput.value, wideTreeInput.value, shadowTreeInput.value)});

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

        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", () => {this.stepController.step6(toiletBuildingsInput.value); });

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

        let submitButton = _Helper__WEBPACK_IMPORTED_MODULE_0__.default.getButton("next step", () => {this.stepController.step7(trashCanInput.value); });

        _Helper__WEBPACK_IMPORTED_MODULE_0__.default.appendChilds([inputblock, submitButton] , block);

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
/* harmony import */ var _Views_MainView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Views/MainView.js */ "./src/Views/MainView.js");
/* harmony import */ var _Views_NavigationView_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Views/NavigationView.js */ "./src/Views/NavigationView.js");
/* harmony import */ var _Models_Data_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Models/Data.js */ "./src/Models/Data.js");
/* harmony import */ var _Views_StepView_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Views/StepView.js */ "./src/Views/StepView.js");










let jsonString = localStorage.getItem('data');
let dataobject = JSON.parse(jsonString);
console.log(dataobject);

const data = new _Models_Data_js__WEBPACK_IMPORTED_MODULE_5__.default(dataobject);


localStorage.setItem('data', JSON.stringify(data));

const mainView = new _Views_MainView_js__WEBPACK_IMPORTED_MODULE_3__.default();
const navigationView = new _Views_NavigationView_js__WEBPACK_IMPORTED_MODULE_4__.default();
const stepView = new _Views_StepView_js__WEBPACK_IMPORTED_MODULE_6__.default();

const mainController = new _Controllers_MainController_js__WEBPACK_IMPORTED_MODULE_0__.default(mainView,data);
const stepController = new _Controllers_StepController_js__WEBPACK_IMPORTED_MODULE_2__.default(stepView, navigationView, data);
const navigationController = new _Controllers_NavigationController_js__WEBPACK_IMPORTED_MODULE_1__.default(navigationView, stepView, stepController, data);


mainView.init(mainController, navigationController, stepController);
navigationView.init(mainController, navigationController, stepController);
stepView.init(mainView, navigationController, stepController )




})();

/******/ })()
;
//# sourceMappingURL=main.js.map