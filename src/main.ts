import { getBooks, API_BASE_URL } from "./api/books";

// Prendiamo cose da cambiare
const table = document.getElementById("books-table-body")!;
const message = document.getElementById("status-message")!;
const count = document.getElementById("book-count")!;
const refreshButton = document.getElementById("refresh-btn")!;

document.getElementById("backend-url")!.textContent = API_BASE_URL;

// Chiediamo libri a backend e aggiungiamo a tabella
async function loadBooks() {
  // qui chiediamo 
  message.className = "status-message loading";
  message.textContent = "Loading books...";
  
  // qui aggiungiamo
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

// carichiamo libri quando viene premuto il tasto refresh
refreshButton.addEventListener("click", loadBooks);

// carichiamo libri quando pagina aperta
loadBooks();
