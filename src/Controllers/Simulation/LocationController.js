

export default class LocationController {

    constructor(data, simulationController) {
        this.data = data;
        this.simulationController = simulationController;
        this.locationView = simulationController.locationView;
    }

    refresh() {
        this.locationView.refresh(this.data);
    }


}