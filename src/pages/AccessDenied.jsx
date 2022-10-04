import { Container } from "react-bootstrap"
import { Link } from 'react-router-dom'

const AccessDeniedPage = () => {
  return (
    <Container className="py-3">
      <div>You need to <Link to="/login">sign in</Link> to access this page</div>
    </Container>
  )
}

export default AccessDeniedPage