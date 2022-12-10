import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix, { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countyList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(evt) {
  const inputContent = evt.target.value.trim();
  if (inputContent === '') {
    clearCountryList();
    clearCountryInfo();
    return;
  }
  fetchCountries(inputContent)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        clearCountryList();
        clearCountryInfo();
      } else if (data.length <= 10 && data.length > 1) {
        clearCountryList();
        renderListOfCountries(data);
        clearCountryInfo();
      } else {
        clearCountryInfo();
        renderCountryInfo(data);
        clearCountryList();
      }
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function getListOfCountriesMarkup(array) {
  return array
    .map(
      ({ name, flags }) => `<li class="country-item">
        <img src="${flags.svg}" alt="flag of ${name.official}" width="80px" height="50px" />
        <span>${name.official}</span>
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
  return array.map(
    ({
      flags,
      name,
      capital,
      population,
      languages,
    }) => `<div class="country-name">
        <img src="${flags.svg}" alt="${
      name.official
    }" width="80px" height="50px">
        <span>${name.official}</span>
      </div>
      <p><span class="country-title">Capital: </span> ${capital}</p>
      <p><span class="country-title">Population: </span>${population}</p>
      <p><span class="country-title">Languages: </span>${Object.values(
        languages
      )}</p>`
  );
}

function renderCountryInfo(array) {
  countryInfo.insertAdjacentHTML('beforeend', getCountryMarkUp(array));
}

function clearCountryList() {
  countyList.innerHTML = '';
}

function clearCountryInfo() {
  countryInfo.innerHTML = '';
}
