const myLibrary = [];
const displayed = [];

const dialog = document.querySelector("dialog");
const showButton = document.getElementById("addbook");
const closeButton = document.getElementById("close");
const form = document.querySelector("form");
const container = document.getElementById("main");
const removeButton = document.getElementById("remove");

// Functions
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID()
}

Book.prototype.isRead = function() {
    if(this.read == "read") {
        return true;
    } else {
        return false;
    }
}

Book.prototype.changeRead = function() {
    if(this.read == "read") {
        this.read = "not read yet";
    } else {
        this.read = "read";
    }
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
        const card = document.createElement('div');
        const cardtext = document.createElement('p');
        const removeButton = document.createElement('button');
        const readButton = document.createElement('button');

        cardtext.textContent = `${book.title} by ${book.author}, ${book.pages} pages`;
        card.id = book.id;
        card.classList.add("book");
        
        removeButton.textContent = "Remove Book";

        const readBool = book.isRead();
        if(readBool) card.style.backgroundColor = 'lightgreen';
        readButton.textContent = readBool ? "Mark as unread" : "Mark as read";

        card.append(cardtext);
        card.appendChild(readButton);
        card.appendChild(removeButton);
        container.append(card);
        displayed.push(book.id);

        // Event Listeners
        removeButton.addEventListener("click", (event) => {
            console.log(event.target.parentElement.id);
            const cardId = event.target.parentElement.id;
            const card = document.getElementById(cardId);
            card.remove();

            displayed.pop(cardId);
            myLibrary.pop(cardId);
        })

        readButton.addEventListener("click", (event) => {
            const cardId = event.target.parentElement.id;
            const myBook = myLibrary.find(book => cardId === book.id);
            console.log(myLibrary.find(book => cardId === book.id));

            myBook.changeRead();
            console.log(myBook.isRead());            
            const readBool = myBook.isRead();
            if(readBool) {
                card.style.backgroundColor = 'lightgreen';
            } else {
                card.style.backgroundColor = 'pink';
            }
            readButton.textContent = readBool ? "Mark as unread" : "Mark as read";
        })
    }
}


// Basic populating library
addBookToLibrary("Great Gatsby", "F. Scott Fitzgerald", "180", "read");
addBookToLibrary("The Hunger Games", "Suzanne Collins", "374", "read");
displayLibrary()


// Event Listeners
showButton.addEventListener("click", () => {
    console.log('show modal');
    dialog.showModal();
})

closeButton.addEventListener("click", () => {
    console.log('close modal');
    dialog.close();
})

form.addEventListener("submit", (event) => {
    console.log('add new book');
    const formData = new FormData(form);

    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = formData.get('read');
    addBookToLibrary(title, author, pages, read);

    event.preventDefault();
    form.reset()
    dialog.close();

    displayLibrary();
})
