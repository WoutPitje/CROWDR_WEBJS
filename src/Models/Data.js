import Location from "./Location.js"
import WaitingLine from "./Simulation/WaitingLine.js"

export default class Data {
    constructor(dataobject) {
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
        this.leftpeople = [];
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
    
        people.forEach(group =>  {
            let location = Math.floor(Math.random() * this.locations.length);
            let x = Math.floor(Math.random() * 15);
            let y = Math.floor(Math.random() * 15);
            
            while(!this.locations[location].getGridBlock(x,y).canPlace(group.getAmountOfPeople(), 7)) {
                x = Math.floor(Math.random() * 14);
                y = Math.floor(Math.random() * 14);
            }
            this.locations[location].addGroupOfPeople(x,y,group)
        })
        
    }

    leavePeople(percentage) {
    
        this.locations.forEach(location => {
            let grid = location.grid.array;
            for (let i = 0; i < grid.length; i++) {
                for(let j = 0; j < grid.length; j++) {
                    grid[i][j].groupsOfPeople.forEach(group => {
                        let number = Math.floor(Math.random() * 101) + 1;
                        if(number <= percentage) {
                            grid[i][j].groupsOfPeople.shift();
                        }
                    })
                    
                }
            }
        });

        
    }

    allLocationsLocked() {
        
        this.locations.forEach(location => {
            console.log(location.getRegionLocked())
            if(!location.getRegionLocked()) {
                
                return false;
            }
        });
        return true;
    }
}