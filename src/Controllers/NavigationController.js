import Location from "../Models/Location"

export default class NavigationController {
    constructor(navigationView, stepView, stepController, data) {
        this.data = data;
        this.stepView = stepView;
        this.stepController = stepController;
        this.navigationView = navigationView;
    }

    addLocation() {
        this.data.addLocation(new Location({}));
        this.data.setCurrentLocation(this.data.locations.length);
        localStorage.setItem('data', JSON.stringify(this.data));

        this.navigationView.refreshNavigation(this.data);
        this.stepView.generateStep1();

    }

    deleteLocation(location) {
        if(this.data.locations.length <= 1) {
            alert('You can not delete all locations');
            return;
        }
        this.data.deleteLocation(location);
        if(this.data.currentLocation == location) {
            this.data.setCurrentLocation(1);
        }
        localStorage.setItem('data', JSON.stringify(this.data));
        this.stepController.setStep();
        
        this.navigationView.refreshNavigation(this.data);
        
    }

    getData() {
        return this.data;
    }

    refreshNavigation() {
        this.navigationView.refreshNavigation(this.data);
    }

    setCurrentLocation(location) {
        this.data.setCurrentLocation(location);
        this.navigationView.refreshNavigation(this.data);
    }

    getCurrentLocation() {
        return this.data.currentLocation();
    }
}