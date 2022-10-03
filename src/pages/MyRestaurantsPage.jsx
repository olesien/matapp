import { Container, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { collection, query, where } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const MyRestaurantsPage = () => {
	const { currentUser } = useAuthContext()
	
	const queryRef = query(
		collection(db, 'restaurants'),
		where('createdBy', '==', currentUser.uid)
	)

	/**
	 * @todo Om tid finns, lägg till paginering
	 */
	const { data: restaurants, isLoading } = useFirestoreQueryData(['restaurants', { createdBy: currentUser.uid }], queryRef, {
		idField: 'id',
		subscribe: true,
	})

	return (
		<Container className="py-3">
			<h1>Your restaurants</h1>
			<div className="list">

				{isLoading && <p>Loading...</p>}

				{!isLoading && !restaurants && (
					<h1>Sorry, that restaurant could not be found 😔</h1>
				)}

				{!isLoading && restaurants &&
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
		</Container >
	)
}

export default MyRestaurantsPage
