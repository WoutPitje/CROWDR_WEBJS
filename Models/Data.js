class Data {
    constructor(dataobject) {
        if(dataobject.locations.length <= 0) {
            this.locations = [new Location()];
            this.currentLocation = null;
        }
        else if(dataobject != null) {
            console.log("hier");
            this.locations = dataobject.locations;
            this.currentLocation = dataobject.currentLocation;
        } else {
            this.locations = [new Location()];
            this.currentLocation = null;
        }
        console.log(this)
    }

    addLocation(location) {
        this.locations.push(location);
    }
    deleteLocation(location) {
        this.locations.splice(location - 1,1)
    }
    getLocation(location) {
        return this.locations[location - 1];
    }
}