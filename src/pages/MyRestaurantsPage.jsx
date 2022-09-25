import { Container, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CreateRestaurantForm from '../components/CreateRestaurantForm'

const MyRestaurantsPage = () => {
	/**
	 * @todo: Fråga Eric om useGetRestaurants
	 */
	const restaurants = [
		{
			"id": "sw5gFR2rr52Ki0ZSfuvP",
			"description": "Test description",
			"createdBy": "WNqPbkY4BnOAocyUW2VUwnXZsLe2",
			"type_of_establishment": "café",
			"offer": [
				""
			],
			"position": {
				"latitude": 33.772,
				"longitude": -116.214
			},
			"name": "Test name",
			"url": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
			"offers": "lunch",
			"cuisine": [
				""
			]
		},
		{
			"id": "template_restaurant",
			"place": "Malmö",
			"description": "A restaurant",
			"name": "Best Restaurant",
			"cuisine": [
				""
			],
			"offer": [
				""
			],
			"offers": "lunch",
			"type_of_establishment": "restaurant",
			"address": "Gatan 5, 123 45",
			"url": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
			"position": {
				"latitude": 23.772,
				"longitude": -117.214
			}
		},
		{
			"id": "template_resturant2",
			"name": "Worst Restaurant",
			"url": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
			"offer": [
				""
			],
			"description": "Not a restaurant",
			"address": "GATAN 6, 12365",
			"cuisine": [
				""
			],
			"position": {
				"latitude": 74.772,
				"longitude": -116.214
			},
			"type_of_establishment": "restaurant",
			"offers": "dinner",
			"place": "Shanghai"
		},
		{
			"id": "ufm0yPjjeAHkzvCIulJD",
			"email": "info@examplerestaurant.com",
			"photoURL": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102",
			"offers": "lunch",
			"city": "Malmö",
			"instagram": "instagram.com/examplerestaurant",
			"cuisine": [
				"Italian",
				"Mediterranean"
			],
			"tel": "+46123456789",
			"category": [
				"Bar",
				"Restaurant"
			],
			"facebook": "facebook.com/examplerestaurant",
			"offer": [
				"Lunch",
				"Dinner"
			],
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet varius est, in fringilla metus.",
			"postcode": 21114,
			"location": {
				"latitude": 16,
				"longitude": 132
			},
			"name": "Example Restaurant",
			"address": "Drottninggatan 4B",
			"type_of_establishment": "restaurant",
			"position": {
				"latitude": 16,
				"longitude": 132
			},
			"website": "examplerestaurant.com",
			"url": "https://firebasestorage.googleapis.com/v0/b/fed21-matguiden.appspot.com/o/restaurants%2F1663942025-london-stock.jpg?alt=media&token=bc832727-0b00-41a2-ac98-4425bbd87102"
		}
	]

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
