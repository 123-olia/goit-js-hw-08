import images from './gallery-items.js';

// console.log(images);

const collection = images.reduce((acc, el) => {
  acc += `<li class=".gallery__item" >
  <a class="gallery__link" href="${el.original}">
  <img class="gallery__image" src="${el.preview}" alt="${el.description}" data-source="${el.original}" />
  </a><?li>`;
  return acc;
}, '');

const list = document.querySelector('.js-gallery');

const modalBox = document.querySelector('.js-lightbox');
const modalImage = modalBox.querySelector('.lightbox__image');
const btnCloseModal = document.querySelector(
  'button[data-action="close-lightbox"]',
);

list.insertAdjacentHTML('afterbegin', collection);

list.addEventListener('click', clickOnList);

function clickOnList(event) {
  if (event.target === event.currentTarget) {
    return;
  }
  event.preventDefault();
  const src = event.target.dataset.source;
  const alt = event.target.alt;
  //   console.log(src, alt);

  openModal(src, alt);
}

function openModal(src, alt) {
  modalBox.classList.add('is-open');

  modalImage.setAttribute('src', src);
  modalImage.setAttribute('alt', alt);

  btnCloseModal.addEventListener('click', closeModal);

  modalBox.addEventListener('click', closeModalBox);
  window.addEventListener('keydown', handleKeyPress);
}

function closeModal() {
  modalBox.classList.remove('is-open');

  modalImage.removeAttribute('src');
  //   modalImage.removeAttribute('alt');

  modalBox.removeEventListener('click', closeModalBox);
  window.removeEventListener('keydown', handleKeyPress);
}

function closeModalBox(event) {
  if (event.target === modalImage) {
    return;
  }

  closeModal();
}

function handleKeyPress(event) {
  if (event.code !== 'Escape') {
    return;
  }
  closeModal();
}
