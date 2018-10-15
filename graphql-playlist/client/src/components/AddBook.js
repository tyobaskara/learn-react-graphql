import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries';

class AddBook extends Component {
    state = {
        name: '',
        genre: '',
        authorId: ''
    }

    displayAuthors() {
        const { loading, authors } = this.props.getAuthorsQuery;

        if (loading) {
            return (<option disabled>Loading Authors..</option>);
        } else {
            return authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>);
            });
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        const { name, genre, authorId } = this.state;

        this.props.addBookMutation({
            variables: {
                name, // name: name
                genre, // genre: genre
                authorId // authorId: authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }

    render() {
        return (
            <div>
                <form id="add-book" onSubmit={this.submitForm}>
                    <div className="field">
                        <label>Book name:</label>
                        <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="field">
                        <label>Genre:</label>
                        <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
                    </div>
                    <div className="field">
                        <label>Author:</label>
                        <select onChange={(e) => this.setState({ authorId: e.target.value })}>
                            <option>Select author</option>
                            {this.displayAuthors()}
                        </select>
                    </div>
                    <button>+</button>
                </form>
            </div>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
