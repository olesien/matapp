import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useGetRestaurant from '../hooks/useGetRestaurant'

const RestaurantPage = () => {
    const { id } = useParams()
    const { data: restaurant } = useGetRestaurant(id)

    return (
        <Container className="py-3">

            {!restaurant && (
                 <h1>Sorry, that restaurant could not be found 😔</h1>
            )}

            {restaurant && (
                <>
                    <h1>{restaurant.name}</h1>
                    <h3>Address</h3>
                    <p>{restaurant.address}, {restaurant.postcode} {restaurant.city}</p>
                    <h3>Description</h3>
                    <p>{restaurant.description}</p>
                    <h3>Cuisine</h3>
                    <ul>
                        {restaurant.cuisine &&
                            restaurant.cuisine.map((cuisine, index) => (
                                <li key={index}>{cuisine}</li>
                            ))
                        }
                    </ul>
                    <h3>Restaurant type</h3>
                    <ul>
                        {restaurant.category &&
                            restaurant.category.map((category, index) => (
                                <li key={index}>{category}</li>
                            ))
                        }
                    </ul>
                    <p>Offer</p>
                    <ul>
                        {restaurant.offer &&
                            restaurant.offer.map((offer, index) => (
                                <li key={index}>{offer}</li>
                            ))
                        }
                    </ul>
                    <h2>Contact details</h2>
                    <h3>Email</h3>
                    <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
                    <h3>Phone</h3>
                    <a href={`tel:${restaurant.tel}`}>{restaurant.tel}</a>
                    <h3>Website</h3>
                    <a href={`https://www.${restaurant.website}`}>{restaurant.website}</a>
                    <h3>Facebook</h3>
                    <a href={`https://www.${restaurant.facebook}`}>{restaurant.facebook}</a>
                    <h3>Instagram</h3>
                    <a href={`https://www.${restaurant.instagram}`}>{restaurant.instagram}</a>
                    <p>
                        <Button>Upload photo</Button>
                    </p>
                </>
            )}
        </Container>
    )
}

export default RestaurantPage