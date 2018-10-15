import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries';

// components
import BookDetails from './BookDetails';

class BookList extends Component {
    state = {
        selected: null
    }

    displayBooks(){
        const { loading, books } = this.props.data;

        if(loading) {
            return ( <div>Loading books...</div> );
        } else {
            return  books.map(book => {
                return (
                    <li key={book.id} onClick={(e) => {this.setState({ selected: book.id })}}>{book.name}</li>
                )
            });
        }
    }

    render() {
        return (
            <div>
                <ul id="book-list">
                    { this.displayBooks() }
                </ul>
                <BookDetails bookId={this.state.selected}/>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
