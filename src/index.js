import MainController from './Controllers/MainController.js'
import NavigationController from './Controllers/NavigationController.js'
import StepController from './Controllers/StepController.js'

import MainView from './Views/MainView.js'
import NavigationView from './Views/NavigationView.js'

import Data from './Models/Data.js'

let jsonString = localStorage.getItem('data');
let dataobject = JSON.parse(jsonString);
console.log(dataobject);

const data = new Data(dataobject);


localStorage.setItem('data', JSON.stringify(data));

const mainView = new MainView();
const navigationView = new NavigationView();

const mainController = new MainController(mainView,data);
const navigationController = new NavigationController(navigationView,data);
const stepController = new StepController(mainView,data);

mainView.init(mainController, navigationController, stepController);
navigationView.init(mainController, navigationController, stepController);



