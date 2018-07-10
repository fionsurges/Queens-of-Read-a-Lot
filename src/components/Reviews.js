import React, { Component } from 'react'
import { Card, Icon, Button, Form, Modal } from 'semantic-ui-react'
import ReviewsForm from './ReviewsForm'
import EditReview from './EditReview'


class Reviews extends Component {
    constructor(props){
    super(props)
    this.state = {
        reviews: [],
        currentReview: []
        }
    }

    componentDidMount() {
        this.getReviews()
    }

    getReviews = () => {
        fetch('https://gtower.herokuapp.com/reviews')
            .then(response => response.json())
            .then(results => {
                this.setState({
                    reviews: results.reviews
                })
            })
        }

    deleteData = (event, review) => {
        event.preventDefault()
        const id = event.target.id
        const body = JSON.stringify(review)
        
        fetch(`https://gtower.herokuapp.com/reviews/${id}`, {
            method: 'DELETE',
            body: body,
            headers: new Headers({
                'content-type': 'application/json'
            })
        })
        .then(review => this.getReviews())
        .catch(err => console.error(err))


    }

    prePopulateEditFields = (event) => {
        event.preventDefault()
        const currentReview = this.state.reviews.filter(review => review.id == event.target.id)        
        this.setState({
            currentReview: currentReview
        })
        
    }


    render(){                

        return(
            <div id='reviews'>
                <div id='reviews-header'>
                <h2>Reviews</h2>
                <Modal trigger={<Button>Add a Review!</Button>} basic size='small'>
                    <ReviewsForm refreshReviews={this.getReviews}/>
                </Modal>
                </div>
                <div id='review-cards'>
                    {this.state.reviews.map(review => {
                    return (
                        <Card onChange={this.prePopulateEditFields}>
                            <Card.Content>
                            <Card.Header>{review.bookTitle}</Card.Header>
                                <Card.Meta>
                                    <span className='author'>Recommended by <i>{review.recommendedBy}</i></span>
                                </Card.Meta>
                            <Card.Description><i>'{review.comments}'</i></Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            <a>
                                <Icon name='star'/>
                                Rating: {review.rating}
                            </a>
                            <div id='reviews-buttons'>
                            <Form.Field control={Button} id={review.id} onClick={(event) => this.deleteData(event, review)}>Delete</Form.Field>
                            <Modal trigger={<Button id={review.id} onClick={this.prePopulateEditFields}>Edit</Button>} basic size='small'>
                                <EditReview reviewDetails={this.state.currentReview} refreshReviews={this.getReviews}/>
                            </Modal>
                            </div>
                            </Card.Content>
                        </Card>
                    )
                })}
                </div>
            </div>
        )
    }
}

export default Reviews