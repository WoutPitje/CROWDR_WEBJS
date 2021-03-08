import MainController from "../Controllers/MainController.js";
import NavigationController from "../Controllers/NavigationController.js";
import Data from "../Models/Data.js";
import Location from "../Models/Location.js";
import Tent from "../Models/Tent.js";
import MainView from "../views/MainView.js";
import NavigationView from "../views/NavigationView";

let jsonString = localStorage.getItem('data');
let dataobject = JSON.parse(jsonString);
console.log(dataobject);

const data = new Data.Data(dataobject);
localStorage.setItem('data', JSON.stringify(data));

const mainView = new MainView.MainView();
const navigationView = new NavigationView.NavigationView();

const mainController = new MainController.MainController(mainView);
const navigationController = new NavigationController.NavigationController(navigationView);

mainView.init();
navigationView.init();



