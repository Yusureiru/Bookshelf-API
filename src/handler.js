import bookshelf from "./bookShelf.js";
import { nanoid } from "nanoid";

const createBooks = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);

  const isFinished = (readPage, pageCount) => {
    if (readPage === pageCount) {
      return true;
    } else if (readPage < pageCount) {
      return false;
    }
  };
  const finished = isFinished(readPage, pageCount);

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (readPage > pageCount) {
    const res = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    res.code(400);
    return res;
  }

  if (!name || name == null) {
    const res = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    res.code(400);
    return res;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  bookshelf.push(newBook);

  const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const res = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    res.code(201);
    return res;
  }
  const res = h.response({
    status: "Error",
    message: "Telah terjadi Error",
  });
  res.code(500);
  return res;
};

const getBooks = (request, h) => {
  const { name, reading, finished } = request.query;
  if (name) {
    const lName = name.toLowerCase();

    const res = h.response({
      status: "success",
      data: {
        books: bookshelf
          .filter((nami) => nami.name === lName)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher,
          })),
      },
    });
    res.code(200);
    return res;
  } else if (reading === "1") {
    const res = h.response({
      status: "success",
      data: {
        books: bookshelf
          .filter((read) => read.reading === true)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher,
          })),
      },
    });
    response.code(200);
    return res;
  } else if (reading === "0") {
    const res = h.response({
      status: "success",
      data: {
        books: bookshelf
          .filter((read) => read.reading === false)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher,
          })),
      },
    });
    res.code(200);
    return res;
  } else if (finished === "1") {
    const res = h.response({
      status: "success",
      data: {
        books: bookshelf
          .filter((finish) => finish.finished === true)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher,
          })),
      },
    });
    res.code(200);
    return res;
  } else if (finished === "0") {
    const res = h.response({
      status: "success",
      data: {
        books: bookshelf
          .filter((finish) => finish.finished === false)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher,
          })),
      },
    });
    res.code(200);
    return res;
  }
  const res = h.response({
    status: "success",
    data: {
      books: bookshelf.map((mapi) => ({
        id: mapi.id,
        name: mapi.name,
        publisher: mapi.publisher,
      })),
    },
  });
  res.code(200);
  return res;
};

const getBooksId = (request, h) => {
  const bookId = request.params.bookId;

  const book = bookshelf.filter((book) => book.id === bookId)[0];
  if (book != undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }
  const res = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  res.code(404);
  return res;
};

const editBooks = (request, h) => {
  const bookId = request.params.bookId;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const res = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    res.code(400);
    return res;
  } else if (readPage > pageCount) {
    const res = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    res.code(400);
    return response;
  }
  const updatedAt = new Date().toISOString();
  const index = bookshelf.findIndex((book) => book.id === bookId);
  if (index != -1) {
    bookshelf[index] = {
      ...bookshelf[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const res = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    res.code(200);
    return res;
  }
  const res = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  res.code(404);
  return res;
};

const deleteBooks = (request, h) => {
  const bookId = request.params.bookId;

  const index = bookshelf.findIndex((book) => book.id === bookId);
  if (index != -1) {
    bookshelf.splice(index, 1);
    const res = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    res.code(200);
    return res;
  }
  const res = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  res.code(404);
  return res;
};

export { createBooks, getBooks, getBooksId, editBooks, deleteBooks };
