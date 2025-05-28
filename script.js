const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`
    }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    newBook.id = crypto.randomUUID()
    myLibrary.push(newBook);
    // viewLibrary();
}

addBookToLibrary('Flowers for Algernon', 'Daniel Keyes', '311', 'read');
addBookToLibrary('A Man Called Ove', 'Fredrik Backman', '368', 'read');
addBookToLibrary('Normal People', 'Sally Rooney', '350', 'not read');


function viewLibrary() {
    const container = document.querySelector('#library-container');
    
    container.replaceChildren(); // Clear library on reload

    for (let book of myLibrary) {
        let card = document.createElement('div');
        card.classList.add('book-card');
        card.setAttribute('data-id', book.id);

        let title = document.createElement('p');
        let author = document.createElement('p');
        let pages = document.createElement('p');
        let read = document.createElement('p');

        title.textContent = `${book.title}`;
        author.textContent = `${book.author}`;
        pages.textContent = `${book.pages} pages`;
        read.textContent = `${book.read}`;

        let remove = document.createElement('button');
        remove.classList.add('remove-button');
        remove.textContent = 'Remove';
        remove.setAttribute('data-id', book.id);

        remove.addEventListener('click', function() {
            const index = myLibrary.findIndex(b => b.id === book.id);
            if (index !== -1) {
                myLibrary.splice(index, 1); // remove from array
                viewLibrary(); 
            }

            // The following code does not work becasue it only removes the DOM element, not the actual data from myLibrary.
            // const targetID = remove.dataset.id;
            // const target = document.querySelector(`[data-id=${targetID}]`);
            // target.remove()
            // viewLibrary();
            
        });

        card.append(title, author, pages, read, remove);
        container.appendChild(card);
    }

}

viewLibrary();


const newBtn = document.querySelector('.new-book');
const dialog = document.querySelector("dialog");
const addBtn = document.querySelector('.add-book');

newBtn.addEventListener('click', function (e) {
    e.preventDefault();

    dialog.showModal();

});

addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    dialog.close();
    const newTitle = document.querySelector("#title").value.trim();
    const newAuthor = document.querySelector("#author").value.trim();
    const newPages = document.querySelector("#pages").value;
    const newRead = document.querySelector("#read").value;

    addBookToLibrary(newTitle, newAuthor, newPages, newRead);
    viewLibrary();

    document.getElementById("book-form").reset();
    
});

// The following code needs to be placed inside the viewLibrary() function, otherwise the event listener is only added once to the buttons, and after viewing the library the new books' remove buttons don't work successfully.
// let removeBtns = document.querySelectorAll('.remove-button');

// removeBtns.forEach(
//     btn => {
//         btn.addEventListener('click', function() {
//             const targetID = btn.dataset.id;
//             const target = document.querySelector(`[data-id=${targetID}]`);
//             target.remove();

//             viewLibrary();
//         });
//     }
// );

Book.prototype.readStatus = function () {
    let curr = this.read;
    if (curr === 'read') {
        this.read = 'not read';
    }
    else {
        this.read = 'read';
    }
};

