'use strict';

const apiKey = '6e2d4a8c760e4a15986175515241205';

const form = document.querySelector('.header__search');
const input = document.querySelector('.search__input');
let cityName = document.querySelector('.card__title');
let cityTemperature = document.querySelector('.card__temperature');
let cityCondition = document.querySelector('.card__state');
let conditionImg = document.querySelector('.card__right');
const header = document.querySelector('.header');
let city;



form.addEventListener('submit', function(e) {
	e.preventDefault();
	city = input.value.trim();
	const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;



	fetch(url)
		.then(response => response.json())
		.then(data => {


		
			console.log(data);
			cityName = data.location.name;
			cityTemperature = `${data.current.temp_c}°C`;
			cityCondition = data.current.condition.text;
			const weatherImage = data.current.condition.icon;
			conditionImg = `<img src="${weatherImage}" alt="" class="card__img">`;

			const cardHtml = `
			<div class="container">
				<div class="main__card">
					<div class="card__left">
						<div class="card__title">${data.location.name}</div>
						<div class="card__temperature">${data.current.temp_c}°C</div>
						<div class="card__state">${data.current.condition.text}</div>
					</div>
					<div class="card__right"><img src="${weatherImage}" alt="" class="card__img"></div>
				</div>
			</div>
		`;

			header.insertAdjacentHTML('afterend', cardHtml);
		})
		.catch(error => console.error('Error fetching weather data:', error));
});
