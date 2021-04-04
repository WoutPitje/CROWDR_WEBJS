export default class WaitingLine {

    constructor() {
        this.people = [];
        this.scanSpeed = Math.floor(Math.random() * 3) + 1;
        this.seconds = 0;
    }

    addGroupOfPeople(group) {
        this.people.push(group);
    }

    scan() {
        this.seconds++;
        if(this.people.length > 0) {
        let amountOfPeople = this.people[0].people.length;
        
        if(this.seconds >= amountOfPeople * this.scanSpeed) {
            this.seconds = 0;
            return this.people.shift();
            
        }
    }
        
    }
}
