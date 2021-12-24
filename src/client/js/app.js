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
const card = document.querySelector('.card');
const result = document.getElementById("results");
const dateNow = Date.now() / 1000;
const searchTrip = document.querySelector(".button_submit");
const printTrip = document.getElementById("print");
const cancel = document.getElementById("delete");
const date = document.getElementById("date");


function handleSubmit(event) {
    event.preventDefault();
    const departing = document.getElementById("input_from").value;
    const arriving = document.getElementById("input_to").value;
    const travelDate = document.getElementById("input_date").value;
    const newDate = new Date(travelDate).getTime() / 1000;

    // Input validation
    if (departing.length == 0) {
        alert("Please enter departure");
        return;
    }
    if (arriving.length == 0) {
        alert("Please enter destination");
        return;
    }
    if (travelDate.length == 0) {
        alert("Please enter a date");
        return;
    }

    getCityInfo(geoNameURL, arriving, geoNameUsername)
        .then(async (cityInfo) => {
            const latitude = cityInfo.geonames[0].lat;
            const longitude = cityInfo.geonames[0].lng;
            const country = cityInfo.geonames[0].countryName;
            const weatherData = await getWeather(
                latitude,
                longitude,
                country,
                newDate
            );
            return weatherData;
        })
        .then(async (weatherData) => {
            const daysToTravel = Math.round((newDate - dateNow) / 86400);
            const userData = await postTravelData("/add", {
                departing,
                arriving,
                travelDate,
                weather: weatherData.data[0].high_temp,
                daysToTravel,
            });
            return userData;
        })
        .then((userData) => {
            updateUI(userData);
        });
}

const getCityInfo = async (geoNameURL, arriving, geoNameUsername) => {
    const response = await fetch(
        geoNameURL + arriving + "&username=" + geoNameUsername
    );
    try {
        const cityInfo = await response.json();
        return cityInfo;
    } catch (error) {
        console.log("error", error);
    }
};

const getWeather = async (latitude, longitude) => {
    const response = await fetch(
        weatherBitURL +
        "lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&key=" +
        weatherBitKey
    );
    try {
        const weatherInfo = await response.json();
        return weatherInfo;
    } catch (error) {
        console.error("error", error);
    }
};

const postTravelData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Event listeners linked to handleSubmit function
if (searchTrip) {
    searchTrip.addEventListener("click", handleSubmit);
}

if (printTrip) {
    printTrip.addEventListener("click", handleSubmit);
}

if (cancel) {
    cancel.addEventListener("click", handleSubmit);
}


// The countdown
const countD = document.getElementById("countdown");
const countdown = setInterval( () => {
    let depDate = document.getElementById('input_date').value;
    let newDate = new Date(depDate);
    let day = newDate.getTime();
    let d = new Date();
    let today = d.getTime();

    // time difference
    let timeDiff = day - today;
    let daysDiff = timeDiff / (1000 * 3600 * 24);
    let count = Math.round(daysDiff);

    console.log(typeof count);

    if(count === -1) {
        countD.innerHTML = 'Your trip is Today! BON VOYAGE🛫';
    } else if(count === 0) {
        countD.innerHTML = 'You have less than a day to your trip';
    } else if(count === 1) {
        countD.innerHTML = 'You have 1 full day left to your trip';
    } else if(count > 1) {
        countD.innerHTML = `You have ${count} days left to your trip`;
    } else if(count < -1) {
        countD.innerHTML = 'You lost your flight';
    }
}, 1000);


// Update UI
const updateUI = async (userData) => {
    result.style.display = "block";
    countD.style.display = "block";
    card.style.display = "none";
    const response = await fetch(
        pixaBayURL +
        pixaBayKey +
        "&q=" +
        userData.arriving +
        "+city&image_type=photo"
    );
    try {
        const getImage = await response.json();
        document.querySelector(".city").innerHTML = userData.arriving;
        document.querySelector(".date").innerHTML = userData.travelDate;
        document.querySelector(".days").innerHTML = userData.daysToTravel;
        document.querySelector(".weather").innerHTML = /*Math.round(userData.weather * 9 / 5 + 32)+ "&deg;F";*/ userData.weather;
        document.querySelector(".pixabay_image").setAttribute("src", getImage.hits[0].webformatURL);
    } catch (error) {
        console.log("error", error);
    }
};


// Animation to h1 element
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
    .add({
        targets: '.ml3 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 150 * (i+1)
    }).add({
        targets: '.ml3',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });

// set the date to footer
date.innerHTML = new Date().getFullYear();

// export functions
export {
    handleSubmit,
    getCityInfo,
    getWeather,
    postTravelData,
    countdown,
    updateUI,
};
