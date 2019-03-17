// After page loads everything inside runs
window.addEventListener("load", () => {
  let long; // variables
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  // Gets all the coordinates
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // Allows you to make request from local host
      const proxy = "https://cors-anywhere.herokuapp.com/";

      // API where Im pulling from
      const api = `${proxy}https://api.darksky.net/forecast/ae81f23bdd102fcf1cef30d7984cabc8/${lat},${long}`;

      // Gets API above
      fetch(api)
        //.Then runs it after you get it back from the server
        .then(response => {
          // Returns in json form
          return response.json();
        })
        // Returns data
        .then(data => {
          console.log(data);
          // Pulls out temperature, summary from data.currently
          const { temperature, summary } = data.currently;
          // Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
        });
    });
  }
});
