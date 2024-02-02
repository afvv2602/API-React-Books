const express = require('express');
const {addBook,getAllBooks,getBook,updateBook,deleteBook} = require('../controllers/bookController');

const router = express.Router();

router.post('/book',addBook);
router.get('/books',getAllBooks);
router.get('/books/:id',getBook);
router.put('/books/:id',updateBook);
router.delete('/books/:id',deleteBook);

module.exports = {
    routes : router
}