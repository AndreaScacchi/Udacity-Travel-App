import { handleSubmit } from './js/app';
import { getCityInfo } from './js/app';
import { getWeather } from './js/app';
import { postTravelData } from './js/app';
import { countDownDate } from './js/app';
import { updateUI } from './js/app';
import "./styles/style.scss";

// Print ar cancel the trip
document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();

    const print = document.getElementById('print');
    const cancel = document.getElementById('delete');

    print.addEventListener('click', () => {
        window.print();
        location.reload();
    });

    cancel.addEventListener('click', () => {
        form.reset();
        results.classList.add('hidden');
        location.reload();
    });
});