import Location from "./Location.js"
import WaitingLine from "./Simulation/WaitingLine.js"

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
        this.waitingLines = [];
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
        this.locations[this.currentLocation - 1].setRegionLocked(false);
    }
    setOpenWaitingLines(lines) {
        this.openWaitingLines = lines;
    }
    addWaitingGroup(waitingGroup) {
        this.peopleInLine.push(waitingGroup);
    }

    setWaitingLines() {
        let openLines = this.openWaitingLines;
        this.waitingLines = [];
        for(let i = 0; i < this.openWaitingLines; i++) {
            this.waitingLines.push(new WaitingLine());
        }
        
        
        for(let i = 0; i < this.peopleInLine.length; i++) {
            let line = Math.floor(Math.random() * openLines) ;

            this.waitingLines[line].addGroupOfPeople(this.peopleInLine[i]);
        }
    }

    scanWaitingLines() {
        for(let i = 0; i < this.waitingLines.length; i++) {
            this.waitingLines[i].scan();
        }
    }
}