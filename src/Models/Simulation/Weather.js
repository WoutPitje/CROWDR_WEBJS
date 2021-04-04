export default class Weather {

    constructor() {
        
        
    }   

    setCurrentWeather(place){

      var self = this;
        fetch("http://api.openweathermap.org/data/2.5/weather?q="+ place +"&appid=e68285f49070969fc85b1cc56080ab46")
        .then(
            function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                alert("This location is not found")
              return;
            }
            
            
            response.json().then((data) =>  {
              self.weather = data.weather[0];
            });
            
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });

        
  }
  getCurrentWeather() {
    if(typeof this.weather !== 'undefined') {
      return this.weather.main;
    }
  }

  getCurrentWeatherIcon() {
    if(typeof this.weather !== 'undefined') {
      return this.weather.icon;
    }
  }
}