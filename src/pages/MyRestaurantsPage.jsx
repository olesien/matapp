import { Container, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CreateRestaurantForm from '../components/CreateRestaurantForm'
import useGetRestaurants from '../hooks/useGetRestaurants'

const MyRestaurantsPage = () => {
	const restaurants = useGetRestaurants()

	return (
		<Container className="py-3">
			<h1>Your restaurants</h1>
			<div className="list">
				{restaurants &&
					restaurants.length > 0 &&
					restaurants.map((restaurant) => (
						<Card style={{ width: "18rem", margin: "1rem" }} key={restaurant.id}>
							<Card.Header>Distance</Card.Header>
							<Card.Img variant="top" src={restaurant.url} />
							<Card.Body>
								<Card.Title>{restaurant.name}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">{restaurant.cuisine} {restaurant.category}</Card.Subtitle>
								<Card.Text>{restaurant.address}, {restaurant.postcode} {restaurant.city}</Card.Text>
								<Card.Text><Card.Link>{restaurant.website}</Card.Link></Card.Text>
								<Card.Text><Card.Link>{restaurant.tel}</Card.Link></Card.Text>
								<Card.Text><Button variant='primary' as={Link} to={`/my-restaurants/${restaurant.id}`}>Read more</Button></Card.Text>
							</Card.Body>
						</Card>
					))}
			</div>
			<h2>Create a new restaurant</h2>
			<CreateRestaurantForm />
		</Container>
	)
}

export default MyRestaurantsPage
