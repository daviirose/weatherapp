// Loads Page
window.addEventListener("load", () => {
  // Defining coordinates
  let long;
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
      // Allows you to make request from local host environment
      const proxy = "https://cors-anywhere.herokuapp.com/";

      // API where Im pulling from
      const api = `${proxy}https://api.darksky.net/forecast/7b060ecec9d2f78b271f2c2e5084c5db/${lat},${long}`;

      // Gets API above
      fetch(api)
        //.Then runs it after you get it back from the server
        .then(response => {
          // Returns in json form
          return response.json();
        })
        // Returns data
        .then(data => {
          // Pulls out temperature, summary from data.currently
          const { temperature, summary, icon } = data.currently;
          // Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // Set Icon
          setIcons(icon, document.querySelector(".icon"));
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // replaces every - with _
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
