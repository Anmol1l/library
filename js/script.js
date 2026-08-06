const myLibrary = [];

function Book(title, author, pages, status) {

    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
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


function createBookCard(myLibrary) {
    console.log(myLibrary)
    const book = myLibrary.at(-1);
    const main = document.querySelector('main');

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
    bookCard.appendChild(title); // add title

    const lineBreak = document.createElement('hr');
    bookCard.appendChild(lineBreak);  // add hr

    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');  // create .bookinfo div

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

    deleteBtn.addEventListener("click", () => {
        const index = findArrayIndex(bookCard.dataset.id);
        bookCard.remove();
        myLibrary.splice(index,1)
        console.log(myLibrary)
    });
    
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