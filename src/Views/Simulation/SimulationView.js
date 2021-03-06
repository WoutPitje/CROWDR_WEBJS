export default class SimulationView {

    constructor(simulationController) {
        this.simulationController = simulationController;
    }
    setMainView(data) {
    this.paused = false;
    let pauseButton = document.getElementById("pause-simulation");
    pauseButton.addEventListener("click",() => this.pausePlaySimulation());
    let weatherButton = document.getElementById("set-location");
    weatherButton.addEventListener("click",() => this.simulationController.changeLocation());
}

pausePlaySimulation() {
    
    let pauseButton = document.getElementById("pause-simulation");
    if(this.simulationController.paused) {
        this.simulationController.paused = false;
        pauseButton.className = "order-last p-3 bp-2 ml-10 bg-red-500 hover:bg-red-800 hover:text-white";
        pauseButton.innerHTML = "pause simulation";
    } else {
        this.simulationController.paused = true;
        pauseButton.className = "order-last p-3 bp-2 ml-10 bg-green-500 hover:bg-green-800 hover:text-white";
        pauseButton.innerHTML = "start simulation";
    }
    
}
refresh() {
    this.setWeather();
}
setWeather(weather) {
    if(typeof weather !== "undefined") {    
        let weatheroutput = document.getElementById("weather");
        weatheroutput.className = "bg-gray-300";
        weatheroutput.src = "http://openweathermap.org/img/wn/"+ weather + "@2x.png";
}
    
}

getPlace() {
    return document.getElementById("place");
}
}

