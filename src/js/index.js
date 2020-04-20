import '../css/styles.css';
import '../../node_modules/@pnotify/core/dist/BrightTheme.css';
import searchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import templateList from '../templates/template-list.hbs';
import templateCountry from '../templates//template-country.hbs';
import {error} from '../../node_modules/@pnotify/core/dist/PNotify.js';

const refs = {
  input: document.querySelector ('.form__input--js'),
  listOfCountry: document.querySelector ('.list__countries'),
  item: document.querySelector ('.form__item'),
};

let nameOfCountry;

refs.input.addEventListener ('input', debounce (getTargetValue, 500));

function getTargetValue (e) {
  refs.listOfCountry.innerHTML = '';
  refs.item.innerHTML = '';
  if (e.target.value === '') {
    return;
  }
  searchCountries (e.target.value)
    .then (data => {
      nameOfCountry = data;
      if (nameOfCountry.length < 10 && nameOfCountry.length > 1) {
        getListOfCountries (nameOfCountry);
      } else if (nameOfCountry.length === 1) {
        getInformationOfCountry (nameOfCountry);
      } else {
        error ({
          text: 'To many matches found. Please, enter more specific query!',
          width: '360px',
          sticker: false,
          closer: false,
          delay: 2000,
        });
      }
    })
    .catch (error => console.log (error));
}

function getListOfCountries (name) {
  refs.item.classList.remove ('active__js');
  refs.listOfCountry.classList.add ('active__js');
  const markup = name.map (item => templateList (item)).join ('');
  refs.listOfCountry.insertAdjacentHTML ('beforeend', markup);
}

function getInformationOfCountry (name) {
  refs.listOfCountry.classList.remove ('active__js');
  refs.item.classList.add ('active__js');
  const markup = templateCountry (name[0]);
  refs.item.insertAdjacentHTML ('beforeend', markup);
}
