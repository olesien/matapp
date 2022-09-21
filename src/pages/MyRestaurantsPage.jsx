import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

const MyRestaurantsPage = () => {

	return (
		<Container className="py-3">
			<h1 className="display-1">My Restaurants</h1>
			<p>Map of restaurants</p>
			<p>List of restaurants</p>
			<Button>Add a restaurant</Button>
		</Container>
	)
}

export default MyRestaurantsPage
