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
    // return myLibrary;
}


createBook("dfa", "fa", 200 , true)
createBook("aaa", "fa", 20 , false)
console.log(myLibrary);