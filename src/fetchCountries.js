export function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`
  )
    .then(response => {
      return response.json();
    })
    .then(countrie => console.log(countrie))
    .catch(error => console.log(error));
}
