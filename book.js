class Book {
    title;
    author;
    category;
    isAvailable;
    constructor(title, author, category, isAvailable = true) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.isAvailable = isAvailable;
    }
    getTitle() {
        return this.title;
    }
    getAuthor() {
        return this.author;
    }
    getCategory() {
        return this.category;
    }
    getAvailability() {
        return this.isAvailable;
    }
    setAvailability(value) {
        this.isAvailable = value;
    }
    displayInfo() {
        return `
            <h3>${this.title}</h3>
            <p><strong>Author:</strong> ${this.author}</p>
            <p><strong>Category:</strong> ${this.category}</p>
        `;
    }
}
class ReferenceBook extends Book {
    locationCode;
    constructor(title, author, category, locationCode) {
        super(title, author, category);
        this.locationCode = locationCode;
    }
    displayInfo() {
        return `
            <h3>${this.getTitle()}</h3>
            <p><strong>Author:</strong> ${this.getAuthor()}</p>
            <p><strong>Category:</strong> ${this.getCategory()}</p>
            <p><strong>Location:</strong> ${this.locationCode}</p>
        `;
    }
}
class Library {
    books = [];
    addBook(book) {
        this.books.push(book);
    }
    removeBook(title) {
        this.books = this.books.filter(book => book.getTitle() !== title);
    }
    searchBooks(searchText) {
        const text = searchText.toLowerCase();
        return this.books.filter(book => book.getTitle().toLowerCase().includes(text) ||
            book.getAuthor().toLowerCase().includes(text));
    }
    filterByCategory(category) {
        if (category === "all") {
            return this.books;
        }
        return this.books.filter(book => book.getCategory() === category);
    }
    toggleAvailability(title) {
        const book = this.books.find(book => book.getTitle() === title);
        if (book) {
            book.setAvailability(!book.getAvailability());
        }
    }
    getBooks() {
        return this.books;
    }
}
const library = new Library();
library.addBook(new Book("Clean Code", "Robert C. Martin", "Programming"));
library.addBook(new Book("A Brief History of Time", "Stephen Hawking", "Science"));
library.addBook(new Book("Sapiens", "Yuval Noah Harari", "History"));
library.addBook(new ReferenceBook("JavaScript Guide", "David Flanagan", "Programming", "R-101"));
const booksContainer = document.getElementById("booksContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
function displayBooks(books) {
    booksContainer.innerHTML = "";
    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        const availabilityClass = book.getAvailability()
            ? "available"
            : "unavailable";
        const availabilityText = book.getAvailability()
            ? "Available"
            : "Not Available";
        card.innerHTML = `
            ${book.displayInfo()}
            <p class="${availabilityClass}">
                ${availabilityText}
            </p>
            <button>
                Change Availability
            </button>
        `;
        const button = card.querySelector("button");
        button?.addEventListener("click", () => {
            library.toggleAvailability(book.getTitle());
            displayBooks(getFilteredBooks());
        });
        booksContainer.appendChild(card);
    });
}
function getFilteredBooks() {
    const searchText = searchInput.value;
    const category = categoryFilter.value;
    let books = library.searchBooks(searchText);
    if (category !== "all") {
        books = books.filter(book => book.getCategory() === category);
    }
    return books;
}
searchInput.addEventListener("input", () => {
    displayBooks(getFilteredBooks());
});
categoryFilter.addEventListener("change", () => {
    displayBooks(getFilteredBooks());
});
displayBooks(library.getBooks());
export {};
