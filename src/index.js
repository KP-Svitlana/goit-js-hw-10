import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countyList = document.querySelector('.country-list');

input.addEventListener(
  'input',
  debounce(onInputChange, 300, {
    leading: true,
    trailing: false,
  })
);

function onInputChange(evt) {
  input.textContent = evt.currentTarget.value;
  fetchCountries(input.textContent).then(data => renderListOfCountries(data));
}

function getListOfCountriesMarkup(array) {
  return array
    .map(
      country => `<li class="contry-item">
        <img src="${country.flags}" alt="flag of ${country.name}" width="50px" height="50px" />
        <span>${country.name}</span>
      </li>`
    )
    .join('');
}

function renderListOfCountries(arrayOfContries) {
  countyList.insertAdjacentHTML(
    'beforeend',
    getListOfCountriesMarkup(arrayOfContries)
  );
}

function getCountryMarkUp(array) {
  return `<div class="country-name">
        <img src="${array.flag.svg}" alt="${array.name}" width="40px" height="40px">
        <span>${array.name}</span>
      </div>
      <p>Capital: ${array.capital}</p>
      <p>Population: ${array.population}</p>
      <p>Languages: ${array.languages}</p>`;
}
