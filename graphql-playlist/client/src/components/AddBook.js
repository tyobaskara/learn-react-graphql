import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries';

class AddBook extends Component {
    displayAuthors() {
        const { loading, authors } = this.props.data;

        if (loading) {
            return (<option disabled>Loading Authors..</option>);
        } else {
            return authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>);
            });
        }
    }

    render() {
        return (
            <div>
                <form id="add-book">
                    <div className="field">
                        <label>Book name:</label>
                        <input type="text" />
                    </div>
                    <div className="field">
                        <label>Genre:</label>
                        <input type="text" />
                    </div>
                    <div className="field">
                        <label>Author:</label>
                        <select>
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

export default graphql(getAuthorsQuery)(AddBook);
