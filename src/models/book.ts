/**
 * Model representing a Book returned by the Flask backend API.
 * Matches the schema: id, title, author, year
 */
export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}
