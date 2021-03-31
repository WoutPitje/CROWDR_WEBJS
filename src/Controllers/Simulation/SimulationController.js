import LocationController from './LocationController.js'
import WaitingLineController from './WaitingLineController.js'
import WaitingLineView from '../../Views/simulation/WaitingLineView.js'
import Data from '../../Models/Data.js'

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