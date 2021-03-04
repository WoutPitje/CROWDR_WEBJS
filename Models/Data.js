class Data {
    constructor(dataobject) {
        if(dataobject != null) {
            console.log("hier");
            this.locations = dataobject.locations;
            this.currentLocation = dataobject.currentLocation;
        } else {
            this.locations = [];
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
}