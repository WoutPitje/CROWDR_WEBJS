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
        let scannedPeople = [];
        for(let i = 0; i < this.waitingLines.length; i++) {
            let groupOfPeople  = this.waitingLines[i].scan();
            if(typeof groupOfPeople !== 'undefined') {
                scannedPeople.push(groupOfPeople);
            }
        }
        this.locateGroupsOfPeople(scannedPeople);
    }
    locateGroupsOfPeople(people) {
        console.log(people);
        people.forEach(group =>  {
            let location = Math.floor(Math.random() * this.locations.length);
            let x = Math.floor(Math.random() * 14);
            let y = Math.floor(Math.random() * 14);

            

            let type = this.locations[location].grid.array[x][y].fillType;
            
            while(type == "tent" || type == "drinkStand" || type=="drinkStandSurface" || type == "toilet"|| type=="highTree" || type == "wideTree" || type=="shadowTree" || type =="foodStand" || type =="trashcan") {
                location = Math.floor(Math.random() * this.locations.length);
                x = Math.floor(Math.random() * 14);
                y = Math.floor(Math.random() * 14);

                type = this.locations[location].grid.array[x][y].fillType;
            }
                
            this.locations[location].addGroupOfPeople(x,y,people)
            
       
            
        })
        
    }
}