import LocationController from './LocationController.js'
import WaitingLineController from './WaitingLineController.js'
import WaitingLineView from '../../Views/simulation/WaitingLineView.js'
import SimulationView from '../../Views/simulation/SimulationView.js'
import LocationView from '../../Views/simulation/LocationView.js'
import Data from '../../Models/Data.js'

export default class SimulationController {

    constructor(data) {
        this.data = new Data(data);
        this.waitingLineView = new WaitingLineView(this.waitingLineController);
        this.simulationView = new SimulationView(this);
        this.locationView = new LocationView(this);
        this.locationController = new LocationController(this.data, this);
        this.waitingLineController = new WaitingLineController(this.data, this);
        

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
        this.waitingLineController.refresh();
        this.locationController.refresh();
        console.log("refresh");
       
    }

    setNavigation()  {

    }

    
}