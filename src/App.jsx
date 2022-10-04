import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import BooksList from './components/BooksList/BooksList';
import Form from './components/Form/Form';

function App() {
  const [reducer, forceUpdate] = useReducer(x => x + 1, 0)
  const [book, setBook] = useState({
    title: '',
    author: '',
    edition: 0
  });
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = () => {
      fetch('http://localhost:9000/api')
        .then(res => res.json())
        .then(res => setBooks(res));
    };

    getBooks();
  }, [reducer])
  

  return (
    <div className='App'>
      <Navbar brand='CRUD App'/>
      <div className='container'>
        <div className='row'>
          <div className="col-7">
            <h2 className='mt-3'>Books List</h2>
            <BooksList book={ book } setBook={ setBook } books={ books } forceUpdate={ forceUpdate }/>
          </div>
          <div className="col-5">
            <h2 className='mt-3'>Book Form</h2>
            <Form book={ book } setBook={ setBook } forceUpdate={ forceUpdate }/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
