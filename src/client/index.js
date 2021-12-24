import { handleSubmit } from './js/app';
import { getCityInfo } from './js/app';
import { getWeather } from './js/app';
import { postTravelData } from './js/app';
import { countdownDate } from './js/app';
import { updateUI } from './js/app';
import "./styles/style.scss";

// Print ar cancel the trip
document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();

    const printTrip = document.getElementById('print');
    const cancelTrip = document.getElementById('delete');

    printTrip.addEventListener('click', () => {
        window.print();
        location.reload();
    });

    cancelTrip.addEventListener('click', () => {
        form.reset();
        results.classList.add('hidden');
        location.reload();
    });
});

export {
    handleSubmit,
    getCityInfo,
    getWeather,
    postTravelData,
    countdown,
    updateUI
}