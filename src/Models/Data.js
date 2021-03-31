import Location from "./Location"

export default class Data {
    constructor(dataobject) {
        console.log(dataobject);
        if(dataobject == null) {
            this.locations = [new Location({})];
            this.currentLocation = 1;
        }
        else if(dataobject.locations.length <= 0) {
            this.locations = [new Location({})];
            this.currentLocation = 1;
        }
        else if(dataobject != null) {
            this.locations = [];
            
            dataobject.locations.forEach(element => {
                this.locations.push(new Location(element));
            });
            this.currentLocation = dataobject.currentLocation;
            
        } else {
            this.locations = [new Location({})];
            this.currentLocation = 1;
        }
        this.peopleInLine = [];
        
    }

    addLocation(location) {
        this.locations.push(location);
    }
    deleteLocation(location) {
        
           this.currentLocation = 1;
        
        this.locations.splice(location - 1,1)
    }
    getLocation(location) {
        return this.locations[location - 1];
    }
    setCurrentLocation(location) {
        this.currentLocation = location;
    }
    getCurrentLocation() {
        
        return this.locations[this.currentLocation - 1];
    }
    resetCurrentLocation() {
        this.locations[this.currentLocation - 1] = new Location({});
    }
    setOpenWaitingLines(lines) {
        this.openWaitingLines = lines;
    }
    addWaitingGroup(waitingGroup) {
        this.peopleInLine.push(waitingGroup);
    }
}