export default class Person {

    constructor() {
        
        // const api_url = 'https://randomuser.me/api/'

        // async function getData() {
        //     const response = await fetch(api_url);
        //     const data = response.json();

        //     console.log(data);
        // }

        this.name = "piet";
        this.age = Math.floor(Math.random() * 100) + 1;
    }
    
}