import React, { Component } from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'

class EditReview extends Component{
    constructor(props) {
        super(props)
        this.state = {
            reviewDetails: this.props.reviewDetails,
            bookTitle: this.props.reviewDetails[0].bookTitle,
            recommendedBy: this.props.reviewDetails[0].recommendedBy,
            rating: this.props.reviewDetails[0].rating,
            comments: this.props.reviewDetails[0].comments
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

    updateData = (event) => {

        const review = {
            bookTitle: this.state.bookTitle,
            recommendedBy: this.state.recommendedBy,
            rating: this.state.rating,
            comments: this.state.comments
        }

        event.preventDefault()
        const id = this.state.reviewDetails[0].id
        const body = JSON.stringify(review)

        fetch(`https://gtower.herokuapp.com/reviews/${id}`, {
            method: 'PUT',
            body: body,
            headers: new Headers({
                'content-type': 'application/json'
            })
        })
        .then(review => this.props.refreshReviews())
        .catch(err => console.error(err))
        this.setState({
            bookTitle: '',
            recommendedBy: '',
            rating: 0,
            comments: ''
        })

    }
    
    render(){
        
        return(
            
            <div className='edit-form'>
            <Form>
                <Form.Group widths='equal'>
                <Form.Field control={Input} value={this.state.recommendedBy} onChange={this.handleChange} name='recommendedBy' label='Name' placeholder={this.props.reviewDetails[0].recommendedBy} />
                <Form.Field control={Input} value={this.state.bookTitle} onChange={this.handleChange} name='bookTitle' label='Book Title' placeholder={this.props.reviewDetails[0].bookTitle} />
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
                <Form.Field control={TextArea} name='comments' value={this.state.comments} onChange={this.handleChange} label='Review' placeholder={this.props.reviewDetails[0].comments} />
                <Form.Field control={Button} onClick={(event) => this.updateData(event)}>Submit Change</Form.Field>
            </Form>
        </div>
        )
    }
}

export default EditReview