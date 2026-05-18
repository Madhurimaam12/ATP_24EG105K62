/*
Problem Statement: Library Book Management System
-------------------------------------------------
Objective : Create a Book class and use it to manage a collection of books in a library.

Requirements:
  Create a Book class with the following:

  Properties:
      title (string)
      author (string)
      pages (number)
      isAvailable (boolean, default: true)


  Methods:
      borrow() - Marks the book as not available
      returnBook() - Marks the book as available
      getInfo() - Returns a string with book details (e.g., "The Hobbit by J.R.R. Tolkien (310 pages)")
      isLongBook() - Returns true if pages > 300, false otherwise




  1. Create at least 5 book objects using the class:
      Example: "Harry Potter", "1984", "The Hobbit", etc.


  2. Perform the following operations:

      i. Display info of all books
      ii. Borrow 2 books and show their availability status
      iii. Return 1 book and show updated status
      iv. Count how many books are "long books" (more than 300 pages)
      v. List all available books
    */

      class Book {
        title;
        author;
        pages;
        isAvailable;

         constructor(title, author, pages) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.isAvailable = true;
        }   
        borrow() {
            this.isAvailable = false;
        }   
        returnBook() {
            this.isAvailable = true;
        }
        getInfo() {
            return `${this.title} by ${this.author} (${this.pages} pages)`;
        }
        isLongBook() {
            return this.pages > 300;
        }
    }
// Display info of all books
const book1 = new Book("Harry Potter", "J.K. Rowling", 500);
const book2 = new Book("1984", "George Orwell", 328);
const book3 = new Book("The Hobbit", "J.R.R. Tolkien", 310);
const book4 = new Book("To Kill a Mockingbird", "Harper Lee", 281);
const book5 = new Book("The Diary Of a Young Girl", "Anne Frank", 283);
const books = [book1, book2, book3, book4, book5];
let info = books.map(book => book.getInfo());
console.log(info);
// Borrow 2 books and show their availability status
book1.borrow();
book3.borrow();
console.log(`${book1.title} is available: ${book1.isAvailable}`);
console.log(`${book3.title} is available: ${book3.isAvailable}`);
// Return 1 book and show updated status
book1.returnBook();
console.log(`${book1.title} is available: ${book1.isAvailable}`);
// Count how many books are "long books" (more than 300 pages)
const longBooksCount = books.filter(book => book.isLongBook()).length;
console.log(`Number of long books: ${longBooksCount}`);
// List all available books
const availableBooks = books.filter(book => book.isAvailable);
console.log("Available books:");
let availableBooksInfo = availableBooks.map(book => book.getInfo());
console.log(availableBooksInfo);
