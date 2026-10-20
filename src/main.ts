import { getBooks, API_BASE_URL } from "./api/books";
import type { Book } from "./models/book";

// Grab DOM elements from index.html
const tableBody = document.getElementById("books-table-body") as HTMLTableSectionElement;
const statusMessage = document.getElementById("status-message") as HTMLDivElement;
const bookCount = document.getElementById("book-count") as HTMLSpanElement;
const refreshBtn = document.getElementById("refresh-btn") as HTMLButtonElement;
const backendUrlSpan = document.getElementById("backend-url") as HTMLSpanElement;

// Display the backend URL dynamically in the top badge
if (backendUrlSpan) {
  backendUrlSpan.innerText = API_BASE_URL;
}

/**
 * Escapes special characters to safely render text inside HTML
 */
function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

/**
 * Shows a status or error banner above the table
 */
function showStatus(message: string, type: "loading" | "error" | "empty") {
  statusMessage.className = `status-message ${type}`;
  statusMessage.innerHTML = message;
  statusMessage.classList.remove("hidden");
}

function hideStatus() {
  statusMessage.className = "status-message hidden";
  statusMessage.innerHTML = "";
}

/**
 * Renders the list of books into the HTML table
 */
function renderBooks(books: Book[]) {
  if (books.length === 0) {
    showStatus("No books found in the library database.", "empty");
    tableBody.innerHTML = "";
    bookCount.innerText = "Total books: 0";
    return;
  }

  hideStatus();

  // Generate HTML table rows from data
  tableBody.innerHTML = books
    .map(
      (book) => `
      <tr>
        <td><strong>#${book.id}</strong></td>
        <td>${escapeHtml(book.title)}</td>
        <td>${escapeHtml(book.author)}</td>
        <td><span class="badge-year">${book.year}</span></td>
      </tr>
    `
    )
    .join("");

  bookCount.innerText = `Total books: ${books.length}`;
}

/**
 * Main Controller: Fetches data from API and updates UI
 */
async function loadBooks() {
  showStatus(`⏳ Connecting to backend API (${API_BASE_URL}/books)...`, "loading");
  refreshBtn.disabled = true;

  try {
    const books = await getBooks();
    renderBooks(books);
  } catch (error) {
    tableBody.innerHTML = "";
    bookCount.innerText = "Total books: 0";
    showStatus(
      `<strong>⚠️ Connection Error:</strong> Unable to reach the backend.<br/>
       Make sure your Python Flask server is running (<code>python app.py</code>) on port 8000.`,
      "error"
    );
    console.error("Fetch error:", error);
  } finally {
    refreshBtn.disabled = false;
  }
}

// Event Listeners
refreshBtn.addEventListener("click", loadBooks);

// Initial fetch on page load
loadBooks();
