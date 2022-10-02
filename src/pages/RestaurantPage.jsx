import React from 'react'
import { Button, Container, Row, Col, Card, Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useGetRestaurant from '../hooks/useGetRestaurant'

const RestaurantPage = () => {
    const { id } = useParams()
    const { data: restaurant, loading } = useGetRestaurant(id)

    return (
        <Container className="py-3 center-y">

            {loading && <p>Loading...</p>}

            {!loading && !restaurant && (
                <h1>Sorry, that restaurant could not be found 😔</h1>
            )}

            {!loading && restaurant && (
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card>
                            <Card.Header as="h5">{restaurant.name}</Card.Header>
                            <Card.Body>
                                <div className="d-flex justify-content-center my-3">
                                    <Image
                                        src='https://via.placeholder.com/225'
                                        fluid
                                    />
                                </div>
                                <h5>Address</h5>
                                <p>{restaurant.address}, {restaurant.postcode} {restaurant.city}</p>
                                <h5>Description</h5>
                                <p>{restaurant.description}</p>
                                <h5>Cuisine</h5>
                                <p>{restaurant.cuisine}</p>
                                <h5>Category</h5>
                                <p>{restaurant.category}</p>
                                <h5>Offer</h5>
                                <p>{restaurant.offer}</p>
                                <h4>Contact details</h4>
                                <h5>Email</h5>
                                <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
                                <h5>Phone</h5>
                                <a href={`tel:${restaurant.tel}`}>{restaurant.tel}</a>
                                <h5>Website</h5>
                                <a href={`https://www.${restaurant.website}`}>{restaurant.website}</a>
                                <h5>Facebook</h5>
                                <a href={`https://www.${restaurant.facebook}`}>{restaurant.facebook}</a>
                                <h5>Instagram</h5>
                                <a href={`https://www.${restaurant.instagram}`}>{restaurant.instagram}</a>
                                <div className='mt-3'>
                                    <Button>Upload photo</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default RestaurantPage