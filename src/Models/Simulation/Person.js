export default class Person {

    constructor() {
        
        var self = this;

        fetch('https://randomuser.me/api/')
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
      
            response.json().then(function(data) {
                console.log(data.results[0]);
              self.name = data.results[0].title + " " + data.results[0].name.first + " " + data.results[0].name.last;
              self.gender = data.results[0].gender;
              self.age = data.results[0].dob.age;
              self.picture = data.results[0].picture.thumbnail;
              self.country = data.results[0].location.country
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    }   

    getName(){
        return this.name;
    }

    getGender(){
        return this.gender;
    }

    getAge(){
        return this.age;
    }

    getPicture(){
        return this.picture;
    }

    getCountry(){
        return this.country;
    }
}