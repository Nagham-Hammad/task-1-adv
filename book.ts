class Book {
    private title: string;
    private author: string;
    private category: string;
    private isAvailable: boolean;

    constructor(
        title: string,
        author: string,
        category: string,
        isAvailable: boolean = true
    ) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.isAvailable = isAvailable;
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getCategory(): string {
        return this.category;
    }

    getAvailability(): boolean {
        return this.isAvailable;
    }

    setAvailability(value: boolean): void {
        this.isAvailable = value;
    }

    displayInfo(): string {
        return `
            <h3>${this.title}</h3>
            <p><strong>Author:</strong> ${this.author}</p>
            <p><strong>Category:</strong> ${this.category}</p>
        `;
    }
}


class ReferenceBook extends Book {
    private locationCode: string;

    constructor(
        title: string,
        author: string,
        category: string,
        locationCode: string
    ) {
        super(title, author, category);
        this.locationCode = locationCode;
    }

    displayInfo(): string {
        return `
            <h3>${this.getTitle()}</h3>
            <p><strong>Author:</strong> ${this.getAuthor()}</p>
            <p><strong>Category:</strong> ${this.getCategory()}</p>
            <p><strong>Location:</strong> ${this.locationCode}</p>
        `;
    }
}


class Library {
    private books: Book[] = [];

    addBook(book: Book): void {
        this.books.push(book);
    }

    removeBook(title: string): void {
        this.books = this.books.filter(
            book => book.getTitle() !== title
        );
    }

    searchBooks(searchText: string): Book[] {
        const text = searchText.toLowerCase();

        return this.books.filter(book =>
            book.getTitle().toLowerCase().includes(text) ||
            book.getAuthor().toLowerCase().includes(text)
        );
    }

    filterByCategory(category: string): Book[] {
        if (category === "all") {
            return this.books;
        }

        return this.books.filter(
            book => book.getCategory() === category
        );
    }

    toggleAvailability(title: string): void {
        const book = this.books.find(
            book => book.getTitle() === title
        );

        if (book) {
            book.setAvailability(!book.getAvailability());
        }
    }

    getBooks(): Book[] {
        return this.books;
    }
}


const library = new Library();

library.addBook(
    new Book(
        "Clean Code",
        "Robert C. Martin",
        "Programming"
    )
);

library.addBook(
    new Book(
        "A Brief History of Time",
        "Stephen Hawking",
        "Science"
    )
);

library.addBook(
    new Book(
        "Sapiens",
        "Yuval Noah Harari",
        "History"
    )
);

library.addBook(
    new ReferenceBook(
        "JavaScript Guide",
        "David Flanagan",
        "Programming",
        "R-101"
    )
);

const booksContainer = document.getElementById(
    "booksContainer"
) as HTMLDivElement;

const searchInput = document.getElementById(
    "searchInput"
) as HTMLInputElement;

const categoryFilter = document.getElementById(
    "categoryFilter"
) as HTMLSelectElement;


function displayBooks(books: Book[]): void {
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


function getFilteredBooks(): Book[] {
    const searchText = searchInput.value;
    const category = categoryFilter.value;

    let books = library.searchBooks(searchText);

    if (category !== "all") {
        books = books.filter(
            book => book.getCategory() === category
        );
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
export{};