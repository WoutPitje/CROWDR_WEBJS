import LocationController from './LocationController.js'
import WaitingLineController from './WaitingLineController.js'
import WaitingLineView from '../../Views/simulation/WaitingLineView.js'
import SimulationView from '../../Views/simulation/SimulationView.js'
import LocationView from '../../Views/simulation/LocationView.js'
import Data from '../../Models/Data.js'
import Weather from '../../Models/Simulation/Weather.js'

export default class SimulationController {

    constructor(data) {
        this.data = new Data(data);
        this.waitingLineView = new WaitingLineView(this.waitingLineController);
        this.simulationView = new SimulationView(this);
        this.locationView = new LocationView(this);
        this.locationController = new LocationController(this.data, this);
        this.waitingLineController = new WaitingLineController(this.data, this);
        this.weather = new Weather();
        

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