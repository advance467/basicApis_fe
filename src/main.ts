import { getBooks, API_BASE_URL } from "./api/books";

// 1. Find the parts of the page we want to change
const table = document.getElementById("books-table-body")!;
const message = document.getElementById("status-message")!;
const count = document.getElementById("book-count")!;
const refreshButton = document.getElementById("refresh-btn")!;

document.getElementById("backend-url")!.textContent = API_BASE_URL;

// 2. Ask the backend for the books and show them in the table
async function loadBooks() {
  message.className = "status-message loading";
  message.textContent = "Loading books...";

  try {
    const books = await getBooks();

    table.innerHTML = "";
    for (const book of books) {
      table.innerHTML += `
        <tr>
          <td>${book.id}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.year}</td>
        </tr>`;
    }

    count.textContent = `Total books: ${books.length}`;
    message.className = "status-message hidden";
  } catch (error) {
    message.className = "status-message error";
    message.textContent = "Could not reach the backend. Is the Flask server running?";
  }
}

// 3. Load the books when the button is clicked, and once when the page opens
refreshButton.addEventListener("click", loadBooks);
loadBooks();
