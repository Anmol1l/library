const myLibrary = [];

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    changeStatus() {
        this.status = !this.status;
    }
}

function createBook(title, author, pages, status) {

    const book = new Book(title, author, pages, status);
    book.id = crypto.randomUUID();
    myLibrary.push(book);
}

const bookForm = document.querySelector('.bookForm');
const addBtn = document.querySelector('.add');

function getTitle() {
    const title = document.querySelector('#title').value;
    return title;
}

function getAuthor() {
    const author = document.querySelector('#author').value;
    return author;
}

function getPages() {
    const pages = document.querySelector('#pages').value;
    return pages;
}

function getStatus() {

    const status = document.querySelector('#status').checked;
    return status;

}

addBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const title = getTitle();
    const author = getAuthor();
    const pages = getPages();
    const status = getStatus();

    if (bookForm.reportValidity()) {
        createBook(title, author, pages, status);
        bookForm.reset();
        dialogAddBook.close();
        createBookCard(myLibrary);
    }
});


function createBookCard(myLibrary) {
    const main = document.querySelector('main');
    const book = myLibrary.at(-1);

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.id = book.id;

    if (book.status) {
        bookCard.classList.add('read');
    }
    else {
        bookCard.classList.add('unread')
    }


    const title = document.createElement('h2');
    title.textContent = book.title;
    bookCard.appendChild(title);

    const lineBreak = document.createElement('hr');
    bookCard.appendChild(lineBreak);

    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');

    const author = document.createElement('p');
    author.textContent = book.author;

    const pages = document.createElement('p');
    pages.textContent = `${book.pages} pages`;

    bookInfo.appendChild(author);
    bookInfo.appendChild(pages);

    const statusDelete = document.createElement('div');
    statusDelete.classList.add('status-delete');
    statusDelete.innerHTML = `
        <button class="status"><span style="vertical-align: middle;">&bull;</span></button>
        <button class="delete"><img src="images-and-icons/icons/delete.svg" alt="delete"></button>
    `;
    bookInfo.appendChild(statusDelete);

    bookCard.appendChild(bookInfo);
    main.appendChild(bookCard);


    const deleteBtn = statusDelete.querySelector('.delete');
    deleteBook(deleteBtn, bookCard);

    const toggleStatus = statusDelete.querySelector('.status');
    changeCardStatus(book,toggleStatus, bookCard);
}


const openAddBookbtn = document.querySelector('.open-addBook');
const dialogAddBook = document.querySelector('.dialog-addBook');
const closeDialogbtn = document.querySelector('.close');

openAddBookbtn.addEventListener('click', () => {
    dialogAddBook.showModal();
})

closeDialogbtn.addEventListener('click', () => {
    dialogAddBook.close();
})


function findArrayIndex(bookID) {
    const index = myLibrary.findIndex(Book => Book.id == bookID);
    return index;
}

function deleteBook(deleteBtn, bookCard) {

    deleteBtn.addEventListener("click", () => {
        const index = findArrayIndex(bookCard.dataset.id);
        bookCard.remove();
        myLibrary.splice(index, 1)
    });
}

function changeCardStatus(book,toggleStatusBtn, bookCard) {

    toggleStatusBtn.addEventListener('click', () => {
        const index = findArrayIndex(bookCard.dataset.id);

        if (bookCard.classList.contains('read')) {
            bookCard.classList.remove('read');
            bookCard.classList.add('unread');
            book.changeStatus(index);
        }

        else if (bookCard.classList.contains('unread')) {
            bookCard.classList.remove('unread');
            bookCard.classList.add('read');
            book.changeStatus(index);
        }
    })
}
