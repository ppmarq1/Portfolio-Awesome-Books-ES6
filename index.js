// Form local storage availability checker function
import Bookshelf, { isStorageAvailable } from './modules/Books.js';
import { DateTime } from './modules/luxon.js';

const getTime = () => {
  const dt = DateTime.now();
  return dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
};

const time = document.getElementById('time');
setInterval(() => {
  time.innerHTML = getTime();
}, 1000);

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.querySelector('#added-book');

// Create a variable to contain local data
let books = [];
// If there's local data available,
if (isStorageAvailable('localStorage')) {
  const data = JSON.parse(localStorage.getItem('bookList'));
  // and if it's not empty, update it
  if (data) {
    books = JSON.parse(localStorage.getItem('bookList'));
  }
}

const newbook = new Bookshelf(books);

form.onsubmit = () => {
  newbook.addBook(title, author);

  newbook.updateBookList();

  form.reset();
};

newbook.updateBookList();

const remove = (id) => {
  newbook.remove(id);
};
window.remove = remove;

const allBooks = document.querySelector('.all-books');
const addBook = document.querySelector('.add-book');
const contact = document.querySelector('.contact');
const navList = document.querySelector('#list');
const navAdd = document.querySelector('#add');
const navContact = document.querySelector('#contact');

navList.onclick = () => {
  navList.style.color = 'darkblue';
  navAdd.style.removeProperty('color');
  navContact.style.removeProperty('color');
  allBooks.classList.remove('hide');
  addBook.classList.add('hide');
  contact.classList.add('hide');
};

navAdd.onclick = () => {
  navAdd.style.color = 'darkblue';
  navList.style.removeProperty('color');
  navContact.style.removeProperty('color');
  addBook.classList.remove('hide');
  allBooks.classList.add('hide');
  contact.classList.add('hide');
};

navContact.onclick = () => {
  navContact.style.color = 'darkblue';
  navList.style.removeProperty('color');
  navAdd.style.removeProperty('color');
  contact.classList.remove('hide');
  addBook.classList.add('hide');
  allBooks.classList.add('hide');
};
