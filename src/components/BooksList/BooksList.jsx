import React from 'react';

function BooksList({ book, setBook, books, forceUpdate }) {

    const handleDelete = (id) => {
        const requestInit = {
            method: 'DELETE'
        }

        fetch('http://localhost:9000/api/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res));
        
        forceUpdate();
    }

    const handleUpdate = (id) => {
        let { title, author, edition } = book;

        edition = parseInt(edition, 10);

        // Validate users data
        if (title === '' || author === '' || edition <= 0) { 
            alert('All fields are required.');
            return;
        }

        // Request
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        }

        fetch('http://localhost:9000/api/' + id, requestInit)
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
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Edition</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr key={ book.id }>
                        <th scope='col'>{ book.id }</th>
                        <td>{ book.title }</td>
                        <td>{ book.author }</td>
                        <td>{ book.edition }</td>
                        <td>
                            <button type='button' onClick={ () => handleDelete(book.id)} className='btn btn-outline-danger'>x</button>
                        </td>
                        <td>
                            <button type='button' onClick={ () => handleUpdate(book.id)} className='btn btn-outline-primary'>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default BooksList;