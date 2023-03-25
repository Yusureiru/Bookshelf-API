import {
  createBooks,
  getBooks,
  getBooksId,
  editBooks,
  deleteBooks,
} from "./handler.js";

const routes = [
  {
    method: "GET",
    path: "/",
    handler: () => {
      return "Welcome Page";
    },
  },
  {
    method: "*",
    path: "/",
    handler: () => {
      return "Forbidden Access Method";
    },
  },
  {
    method: "POST",
    path: "/books",
    handler: createBooks,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBooksId,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBooks,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBooks,
  },
];
export default routes;
