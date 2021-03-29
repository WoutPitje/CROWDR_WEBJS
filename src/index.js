import MainController from './Controllers/MainController.js'
import NavigationController from './Controllers/NavigationController.js'
import StepController from './Controllers/StepController.js'
import GridController from './Controllers/GridController.js'

import MainView from './Views/MainView.js'
import NavigationView from './Views/NavigationView.js'
import GridView from './Views/GridView.js'

import Data from './Models/Data.js'
import StepView from './Views/StepView.js'

let jsonString = localStorage.getItem('data');
let dataobject = JSON.parse(jsonString);
console.log(dataobject);

const data = new Data(dataobject);


localStorage.setItem('data', JSON.stringify(data));



const mainController = new MainController(data);






