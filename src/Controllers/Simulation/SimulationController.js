import LocationController from './LocationController.js'
import WaitingLineController from './WaitingLineController.js'
import WaitingLineView from '../../Views/simulation/WaitingLineView.js'
import Data from '../../Models/Data.js'
import Weather from '../../Models/Simulation/Weather.js'

export default class SimulationController {

    constructor(data) {
        this.data = new Data(data);
        this.waitingLineView = new WaitingLineView(this.waitingLineController);
        this.wocationController = new LocationController(this.data, this);
        this.waitingLineController = new WaitingLineController(this.data, this);

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