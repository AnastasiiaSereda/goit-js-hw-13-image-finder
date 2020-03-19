import './styles.css';
import axios from 'axios';
import imagePattern from './patterns/image.hbs';


const refs = {
  imageCase: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
  upButton: document.querySelector('.up-button'),
  photoCard: document.querySelector('.photo-card'),
  photoCardItem: document.querySelector('.photo-card picture'),
  lightBox: document.querySelector('.lightbox'),
  lightBoxButton: document.querySelector('.lightbox__button'),
  likes: document.querySelector('.likes'),
  comments: document.querySelector('.comments'),
  downloads: document.querySelector('.downloads'),
  shows: document.querySelector('.shows'),
  loader: document.querySelector('.loader-wrapper'),
};

const getPictures = (name, page) => {
  return axios.get(
    `https://pixabay.com/api/?key=14452993-a97f0aeb82bfc4ebb60896535&q=${name}&per_page=12&page=${page}`,
  );
};

let page = 1;
let searchQuery = '';


function searchFormHandler(event) {
  event.preventDefault();

  searchQuery = event.currentTarget.elements.query.value;
  refs.imageCase.innerHTML = '';
  refs.searchForm.elements.query.value = '';


  depictImages();
}

function depictImages() {
  getPictures(searchQuery, page).then(({ data }) => {
    data.hits.forEach(element => {
      refs.imageCase.insertAdjacentHTML('beforeend', imagePattern(element));
    });
  });
  incrementPage();
}

function incrementPage() {
  page += 1;
  return page;
}

function scroll() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
function showPreview(event) {
  if (event.target.nodeName === 'IMG') {
    refs.loader.style.display = 'flex';
    const getPic = event.target.dataset.source;
    refs.photoCardItem.setAttribute('src', getPic);
    refs.photoCard.classList.add('isBlur');
    refs.lightBox.classList.add('is-open');

  }
}

function disposalShowPreview() {
  refs.lightBox.classList.remove('is-open');
}

function handleBackDropClick(event) {
  if (event.target.nodeName === 'IMG') {
    return;
  }
  disposalShowPreview();
}

function scrollWindow() {
  if (
    document.documentElement.getBoundingClientRect().bottom <
    document.documentElement.clientHeight + 100
  ) {
    depictImages();
  } else {
    return;
  }
}


refs.searchForm.addEventListener('submit', searchFormHandler);
refs.upButton.addEventListener('click', scroll);
window.addEventListener('scroll', scrollWindow);
refs.imageCase.addEventListener('click', showPreview);
refs.lightBoxButton.addEventListener('click', disposalShowPreview);
window.addEventListener('click', handleBackDropClick);
