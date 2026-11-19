const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID()

    // function info(){
    //     return `${title} by ${author}, ${pages} pages, ${read}`;
    // }
}

function addBookToLibrary(title, author, pages, read) {
    let myBook = new Book(title, author, pages, read);

    myLibrary.push(myBook);
}

function displayLibrary() {
    const container = document.getElementById("main");

    for (let book of myLibrary) {
        const display = document.createElement("div");
        display.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read}`;
        display.classList.add("book");
        container.append(display);
    }
}

addBookToLibrary("Great Gatsby", "Scott Fitzgerald", "many", "read");
addBookToLibrary("Hunger Games", "Scott Fitzgerald", "many", "read");

displayLibrary()