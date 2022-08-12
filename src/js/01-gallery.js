import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import { galleryItems } from './gallery-items';
// Change code below this line

// 1. Создаем функцию для разметки

function makeGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
			<li class="gallery__item">
  			<a classs="gallery__link" href="${original}">
				<img class="gallery__image" 
				src="${preview}" 
				alt="${description}" />
			</a>
			</li>
	`;
    })
    .join(' ');
}

// 2. Получаем из HTML ссылку на коневой элемент Галереи
const galleryRef = document.querySelector('.gallery');

// 3. Добавляем в код HTML разметку для элементов галереи.
galleryRef.insertAdjacentHTML('afterbegin', makeGalleryMarkup(galleryItems));
galleryRef.style.listStyle = 'none';

// 4. Функция-конструктор из библиотеки SimpleLightBox
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
