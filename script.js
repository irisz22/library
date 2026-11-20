const myLibrary = [];
const displayed = [];


const dialog = document.querySelector("dialog");
const showButton = document.getElementById("addbook");
const closeButton = document.getElementById("close");
const form = document.querySelector("form");

const container = document.getElementById("main");

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
    for (let book of myLibrary) {
        if (displayed.includes(book.id)) {
            console.log(book.id);
            continue;
        }
        const display = document.createElement("div");
        display.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read}`;
        display.classList.add("book");
        container.append(display);
        displayed.push(book.id);
    }
}


addBookToLibrary("Great Gatsby", "F. Scott Fitzgerald", "180", "read");
addBookToLibrary("The Hunger Games", "Suzanne Collins", "374", "read");
displayLibrary()


showButton.addEventListener("click", () => {
    console.log('show modal');
    dialog.showModal();
})

closeButton.addEventListener("click", () => {
    console.log('close modal');
    dialog.close();
})

form.addEventListener("submit", (event) => {
    console.log('submit');
    const formData = new FormData(form);

    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = formData.get('read');
    addBookToLibrary(title, author, pages, read);

    displayLibrary();

    event.preventDefault();
    form.reset()
    dialog.close();
})