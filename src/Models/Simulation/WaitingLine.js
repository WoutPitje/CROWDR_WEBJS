export default class WaitingLine {

    constructor() {
        this.people = [];
    }

    addGroupOfPeople(group) {
        this.people.push(group);
    }

    scan() {
        this.people.shift();
    }
}
