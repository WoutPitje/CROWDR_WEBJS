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

new MainController(data);

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



