import Person from './Person.js'

export default class GroupOfPeople {
    constructor(amountOfPeople) {
        this.people = [];
        for(let i = 0; i < amountOfPeople; i++) {
            this.people.push(new Person());
        }
    }

}
