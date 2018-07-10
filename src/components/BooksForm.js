import React, { Component } from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'

class BooksForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
        title: '',
        imageUrl: '',
        author: '',
        genre: '',
        year: 0
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        const key = event.target.name
        const value = event.target.value
        this.setState({
            [key]: value
        })
    }

    postData = (event) => {
        event.preventDefault()
        const body = JSON.stringify(this.state)

        fetch('https://gtower.herokuapp.com/books', {
            method: 'POST',
            body: body,
            headers: new Headers({
                'content-type': 'application/json'
            })
        })
        .then(response => response.json())
        .then(review => this.props.refreshBooks())
        .catch(err => console.error(err))
        this.setState({
            title: '',
            imageUrl: '',
            author: '',
            genre: '',
            year: 0
        })
    }



    render() {
        console.log(this.state);
        
        return (
        <aside id='side-bar'>
            <Form>
                <Form.Group widths='equal'>
                <Form.Field control={Input} value={this.state.title} onChange={this.handleChange} name='title' label='Book Title' placeholder='Book Title' />
                <Form.Field control={Input} value={this.state.author} onChange={this.handleChange} name='author' label='Author' placeholder='Author' />
                <Form.Field control={Input} value={this.state.genre} onChange={this.handleChange} name='genre' label='Genre' placeholder='Genre' />
                <Form.Field control={Input} value={this.state.year} onChange={this.handleChange} name='year' label='Year Published' placeholder='Year Published' />
                <Form.Field control={Input} value={this.state.imageUrl} onChange={this.handleChange} name='imageUrl' label='imageUrl' placeholder='imageURL' />
                </Form.Group>
                <Form.Field control={Button} onClick={this.postData}>Submit</Form.Field>
            </Form>
        </aside>
        );
    }
};


export default BooksForm
