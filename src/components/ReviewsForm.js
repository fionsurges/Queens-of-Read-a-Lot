import React, { Component } from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'

class ReviewsForms extends Component {
    constructor(props) {
        super(props)

        this.state = {
        bookTitle: '',
        recommendedBy: '',
        rating: 0,
        comments: '',
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

    changeRatingOnState = (event) => {
        const key = event.target.previousSibling.name
        const value = event.target.previousSibling.value
        this.setState({
            [key]: value
        })  
    }

    postData = (event) => {
        event.preventDefault()
        const body = JSON.stringify(this.state)

        fetch('https://gtower.herokuapp.com/reviews', {
            method: 'POST',
            body: body,
            headers: new Headers({
                'content-type': 'application/json'
            })
        })
        .then(response => response.json())
        .then(review => this.props.refreshReviews())
        .catch(err => console.error(err))
        this.setState({
            bookTitle: '',
            recommendedBy: '',
            rating: 0,
            comments: ''
        })
    }
    

    render() {
        return (
        <div className='review-form'>
            <Form>
                <Form.Group widths='equal'>
                <Form.Field control={Input} value={this.state.recommendedBy} onChange={this.handleChange} name='recommendedBy' label='Name' placeholder='Name' />
                <Form.Field control={Input} value={this.state.bookTitle} onChange={this.handleChange} name='bookTitle' label='Book Title' placeholder='Book Title' />
                </Form.Group>
                <Form.Group inline>
                <label>Rating</label>
                <Form.Field
                    control={Radio}
                    name='rating'
                    label='1'
                    value='1'
                    onChange={this.changeRatingOnState}
                />
                <Form.Field
                    control={Radio}
                    name='rating'
                    label='2'
                    value='2'
                    onChange={this.changeRatingOnState}
                />
                <Form.Field
                    control={Radio}
                    name='rating'
                    label='3'
                    value='3'
                    onChange={this.changeRatingOnState}
                />
                <Form.Field
                    control={Radio}
                    name='rating'
                    label='4'
                    value='4'
                    onChange={this.changeRatingOnState}
                />
                <Form.Field
                    control={Radio}
                    name='rating'
                    label='5'
                    value='5'
                    onChange={this.changeRatingOnState}
                />
                </Form.Group>
                <Form.Field control={TextArea} name='comments' value={this.state.comments} onChange={this.handleChange} label='Review' placeholder='Review this book!' />
                <Form.Field control={Button} onClick={this.postData}>Submit</Form.Field>
            </Form>
        </div>
        )
    }
}


export default ReviewsForms

