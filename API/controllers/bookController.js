'use strict'

const db = require('../db');
const Book = require('../models/book');
const { collection, addDoc,getDocs,getDoc,doc,updateDoc,deleteDoc,where } = require('firebase/firestore');

const addBook = async (req, res, next) => {
    try {
        const data = req.body;
        await addDoc(collection(db, 'books'), data);
        res.send('Record saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllBooks = async (req,res,next) => {
    try {
        const bookquery = await getDocs(collection(db,'books'));
        const bookList = bookquery.docs.map(doc => doc.data());
        if (bookList.empty){
            res.status(404).send('No book record found'); 
        }else{
            res.send(bookList); 
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBook = async (req,res,next) => {
    try {
        const id = req.params.id;
        const book = await getDoc(doc(db, 'books', id));
        if (!book.exists()) { 
            res.status(404).send('Book with the given ID not found');
        } else {
            res.send(book.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBookDocumentId = async (bookId) => {
    const bookList = await getDocs(collection(db,'books'));
    let bookDocumentId = null;
    bookList.forEach(doc => {
    if (doc.data().id === bookId) {
      bookDocumentId = doc.id;
    }
  });
  return bookDocumentId; 
}

const updateBook = async (req, res, next) => {
    try {
        const bookId = req.params.id; 
        const updatedData = req.body;
        const bookDocumentId = await getBookDocumentId(bookId);
        if (!bookDocumentId) {
            res.status(404).send('Book with the given ID not found');
            return;
        }
        await updateDoc(doc(db, 'books', bookDocumentId), updatedData);
        res.send('Book record updated successfully!');
    } catch (error) {
        res.status(400).send(error.message);
    }
};


const deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.id; 
        const bookDocumentId = await getBookDocumentId(bookId);
        if (!bookDocumentId) {
            res.status(404).send('Book with the given ID not found');
            return;
        }
        await deleteDoc(doc(db, 'books', bookDocumentId));
        res.send("Book deleted successfully!");
    } catch (error) {
        res.status(400).send(error.message);
    }
};


module.exports = {
    addBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook
}
