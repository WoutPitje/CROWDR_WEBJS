import Location from "../Models/Location"

export default class NavigationController {
    constructor(mainController, data) {
        this.data = data;
        this.mainController = mainController;
        this.navigationController = mainController.navigationController;
        this.navigationView = mainController.navigationView;
    }

    addLocation() {
        this.data.addLocation(new Location({}));
        this.data.setCurrentLocation(this.data.locations.length);
        this.mainController.saveData();

        this.navigationView.refreshNavigation(this.data);
        this.mainController.refreshLocationScreen();

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
        this.mainController.saveData();
        this.navigationView.refreshNavigation(this.data);
        this.mainController.refreshLocationScreen();
    }

    refreshNavigation() {
        this.navigationView.refreshNavigation(this.data);
    }

    setCurrentLocation(location) {
        this.data.setCurrentLocation(location);
        this.navigationView.refreshNavigation(this.data);
        this.mainController.refreshLocationScreen();
    }

    getCurrentLocation() {
        return this.data.currentLocation();
    }
}