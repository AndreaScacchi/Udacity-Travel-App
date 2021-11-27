// Geonames API and URL
const geoNameURL = "http://api.geonames.org/searchJSON?q=";
const geoNameUsername = "andreascacchi";

// Weatherbit API and URL
const weatherBitURL = "http://api.weatherbit.io/v2.0/forecast/daily?";
const weatherBitKey = "1600fb6105a9450c851786ab67eb4437";

// Pixabay API and URL
const pixaBayURL = "https://pixabay.com/api/?key=";
const pixaBayKey = "19344538-371102874db6349622a031d1a";

// Global variables 
const form = document.getElementById('form');
const result = document.getElementById('results');
const dateNow = (Date.now()) / 1000;
const theInput = document.querySelector('.button_submit');
const print = document.getElementById('print');
const cancel = document.getElementById('delete');

function handleSubmit(event) {
    event.preventDefault();
    const departing = document.getElementById('input_from').value;
    const arriving = document.getElementById('input_to').value;
    const travelDate = document.getElementById('input_date').value;
    const newDate = (new Date(travelDate).getTime()) / 1000;

    // Input validation
    if(departing.length == 0) {
        alert('Please enter departure');
        return;
    }
    if(arriving.length == 0) {
        alert('Please enter destination');
        return;
    }
    if(travelDate.length == 0) {
        alert('Please enter a date');
        return;
    }

    getCityInfo(geoNameURL, arriving, geoNameUsername)
    .then(async (cityInfo) => {
        const latitude = cityInfo.geonames[0].lat;
        const longitude = cityInfo.geonames[0].lng;
        const country = cityInfo.geonames[0].countryName;
        const weatherData = await getWeather(latitude, longitude, country, newDate);
        return weatherData;
    })
    .then(async (weatherData) => {
        const daysToTravel = Math.round((newDate - dateNow) / 86400);
        const userData = await postTravelData('/add',
        { departing, arriving, travelDate, weather: weatherData.data[0].high_temp, daysToTravel });
        return userData;
    }).then((userData) => {
        updateUI(userData);
    })
};










if(theInput) {
    theInput.addEventListener('click', handleSubmit);
}

if(print) {
    print.addEventListener('click', handleSubmit);
}

if(cancel) {
    cancel.addEventListener('click', handleSubmit);
}