// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line
const galleryRef = document.querySelector('.gallery');
const markup = galleryItems
  .map(
    item =>
      `<a class="gallery__item" href="${item.original}">
            <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
        </a>`,
  )
  .join('');
galleryRef.innerHTML = markup;

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
