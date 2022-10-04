import React from 'react';
import './Form.css';

function Form({book, setBook, forceUpdate}) {
    let { title, author, edition } = book;

    const handleChange = (e) => {
        setBook(
            {
                ...book,
                [e.target.name]: e.target.value
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        edition = parseInt(edition, 10);

        // Validate users data
        if (title === '' || author === '' || edition <= 0) { 
            alert('All fields are required.');
            return;
        }

        // Request
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        }

        fetch('http://localhost:9000/api', requestInit)
            .then(res => res.text())
            .then(res => console.log(res));
        
        // Reset book state
        setBook({
            title: '',
            author: '',
            edition: 0
        });

        forceUpdate();
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className='mb-3'>
                <label htmlFor="title" className='form-label'>Title</label>
                <input onChange={ handleChange } type="text" name='title' id='title' value={ title } className='form-control' />
            </div>
            
            <div className='mb-3'>
                <label htmlFor="author" className='form-label'>Author</label>
                <input onChange={ handleChange } type="text" name='author' id='author' value={ author } className='form-control' />
            </div>
            
            <div className='mb-3'>
                <label htmlFor="edition" className='form-label'>Edition</label>
                <input onChange={ handleChange } type="number" name='edition' id='edition' value={ edition } className='form-control' />
            </div>

            <button type="submit" className='btn btn-primary'>Submit</button>
        </form>
    );
}

export default Form;