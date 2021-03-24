import Location from "../Models/location"

export default class NavigationController {
    constructor(navigationView, data) {
        this.data = data;
        this.navigationView = navigationView;
    }

    addLocation() {
        this.data.addLocation(new Location());
        localStorage.setItem('data', JSON.stringify(this.data));

        this.navigationView.refreshNavigation(this.data);

    }

    deleteLocation(location) {
        this.data.deleteLocation(location);
        localStorage.setItem('data', JSON.stringify(this.data));

        this.navigationView.refreshNavigation(this.data);
        
    }

    getData() {
        return this.data;
    }

    refreshNavigation() {
        this.navigationView.refreshNavigation(this.data);
    }
}