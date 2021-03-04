class NavigationController {
    constructor(navigationView) {
        this.navigationView = navigationView;
    }

    addLocation() {
        data.addLocation(new Location());
        localStorage.setItem('data', JSON.stringify(data));

        navigationView.refreshNavigation(data);

    }

    deleteLocation(location) {
        data.deleteLocation(location);
        localStorage.setItem('data', JSON.stringify(data));

        navigationView.refreshNavigation(data);
        
    }

    getData() {
        return data;
    }
}