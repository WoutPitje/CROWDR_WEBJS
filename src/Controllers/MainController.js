import NavigationController from './NavigationController.js'
import StepController from './StepController.js'
import GridController from './GridController.js'

import NavigationView from '../Views/NavigationView.js'
import GridView from '../Views/GridView.js'

import StepView from '../Views/StepView.js'

export default class MainController {
    constructor(data) {
        this.data = data;
        this.navigationView = new NavigationView();
        this.stepView = new StepView();
        this.gridView = new GridView();
        
        this.gridController = new GridController(this, data);
        this.stepController = new StepController(this, data);
        this.navigationController = new NavigationController(this, data);

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
}
