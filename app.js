let weather = {
    apiKey: "api key",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {//incase if the place does not exist or no weather is being recorded
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;//getting thee name of the location
      const { icon, description } = data.weather[0];//retrieveing icon "sunny,cloudy,windy,raining,thunder ect."
      const { temp, humidity } = data.main;//temparature, humidity
      const { speed } = data.wind; //wind speed
      //the code below is displaying all the information of the weather 
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
        //only display loding when loading in new information
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {//retrieve whats in the search bar
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  //click functionality || mouse listener 
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  //this is a keyboard listener when you press "Enter" is will act as a click
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Providence");