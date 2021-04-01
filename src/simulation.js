import SimulationController from "./Controllers/Simulation/SimulationController.js"

let jsonString = localStorage.getItem('data');
let dataobject = JSON.parse(jsonString);
console.log(dataobject);

let simulationController = new SimulationController(dataobject);