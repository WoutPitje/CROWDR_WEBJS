export default class Weather {

    constructor() {
        
        var self = this;

        fetch("http://api.openweathermap.org/data/2.5/weather?q='s-Hertogenbosch&appid=e68285f49070969fc85b1cc56080ab46")
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
      
            response.json().then(function(data) {
              self.currentWeather = data.weather[0].main;
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    }   

    getCurrentWeather(){
      return this.currentWeather;
  }
}