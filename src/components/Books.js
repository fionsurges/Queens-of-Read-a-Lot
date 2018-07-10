import React, { Component } from 'react'
import { Card, Icon, Image, Button, Modal, } from 'semantic-ui-react'
import BooksForm from './BooksForm'

class Books extends Component {
    constructor(props){
        super(props)
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        this.getBooks()
    }

    getBooks = () => {
        fetch('https://gtower.herokuapp.com/books')
            .then(response => response.json())
            .then(res => {
                this.setState({
                    books: res.books
                })
            })
        }

    render() {
        
        return (
            <div id='books' >
                <div id='books-header'>
                    <h2>Suggested Books</h2>
                    <Modal trigger={<Button>Add a Book!</Button>} basic size='small'>
                        <BooksForm refreshBooks={this.getBooks}/>
                    </Modal>
                </div>
                <div id='book-cards'>
                    {this.state.books.map(book => {
                        return (
                            <div id='book-card'>
                                <Card>
                                    <Image 
                                        fluid
                                        src={book.imageUrl} 
                                        label={{ as: 'a', color: '', content: `${book.title}`, icon: 'book', ribbon: true }}
                                    />
                                    <Card.Content>
                                    <Card.Description>{book.author}</Card.Description>
                                        <Card.Meta>
                                            <span className='author'>{book.genre}</span>
                                        </Card.Meta>
                                    </Card.Content>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Books