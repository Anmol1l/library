const myLibrary = [];

function Book(title, author, pages, status) {

    if(!new.target) {
        throw Error ("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function createBook(title, author, pages, status) {

    const book = new Book (title, author, pages, status);
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

    if(bookForm.reportValidity()){
        createBook(title, author, pages, status);
        bookForm.reset();
    }  
});


const openAddBookbtn = document.querySelector('.open-addBook');
const dialogAddBook = document.querySelector('.dialog-addBook');
const closeDialogbtn = document.querySelector('.close');

openAddBookbtn.addEventListener('click', () => {
    dialogAddBook.showModal();
})

closeDialogbtn.addEventListener('click', () => {
    dialogAddBook.close();
})

