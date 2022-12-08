import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');

input.addEventListener('input', onInputChange);

function onInputChange(evt) {
  input.textContent = evt.currentTarget.value;
  fetchCountries(input.textContent);
}
