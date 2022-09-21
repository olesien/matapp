import React from 'react'
import { Button, Container } from 'react-bootstrap'

const RestaurantPage = () => {
    return (
        <Container className="py-3">
            <h1>Some restaurant name</h1>
            <h3>Address</h3>
            <p>615 Magnolia Blvd</p>
            <h3>City</h3>
            <p>91501, Burbank, CA</p>
            <h3>Description</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa corporis, pariatur adipisci rem voluptatum velit repellat dignissimos iste debitis minus.</p>
            <h3>Cuisine</h3>
            <ul>
                <li>Greek</li>
                <li>Mediterranean</li>
            </ul>
            <h3>Restaurant type</h3>
            <ul>
                <li>Bar</li>
                <li>Restaurant</li>
            </ul>
            <p>Offer</p>
            <ul>
                <li>Á la carte</li>
                <li>After Work</li>
            </ul>
            <h2>Contact details</h2>
            <h3>Email</h3>
            <a href="mailto:info@email.com">Some link</a>
            <h3>Phone</h3>
            <a href="tel:+46123456789">Some link</a>
            <h3>Website</h3>
            <a href="https://google.com" target="_blank">Some link</a>
            <h3>Facebook</h3>
            <a href="https://facebook.com" target="_blank">Some link</a>
            <h3>Instagram</h3>
            <a href="https://instagram.com" target="_blank">Some link</a>
            <p>
                <Button>Upload photo</Button>
            </p>
        </Container>
    )
}

export default RestaurantPage