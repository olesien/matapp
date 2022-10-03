import { useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form';

const UpdateProfilePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const {
    currentUser,
    reloadUser,
    setEmail,
    setPassword
  } = useAuthContext()

  const onHandleSubmit = async (data) => {

    setError(null);
    setMessage(null);

    // update user profile
    try {
      // disable update-button while updating is in progress
      setLoading(true)

      // update email *ONLY* if it has changed
      if (data.email !== currentUser.email) {
        await setEmail(data.email)
      }

      // update password *ONLY* if the user has provided a new password to set
      if (data.password) {
        await setPassword(data.password)
      }

      // reload user
      await reloadUser()

      setMessage("Profile successfully updated")
      setLoading(false)

    } catch (e) {
      console.log("Error updating profile", e)
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <Container className="py-3 center-y">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header as="h5">Update Profile</Card.Header>
            <Card.Body>
              {error && (<Alert variant="danger">{error}</Alert>)}
              {message && (<Alert variant="success">{message}</Alert>)}

              <Form onSubmit={handleSubmit(onHandleSubmit)}>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    {...register("email", {
                      pattern: {
                        value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/gm,
                        message: "Invalid email",
                      },
                    })}
                    type="email"
                    defaultValue={currentUser.email}
                  />
                  {errors.email && (
                    <Form.Text className="text-danger">
                      {errors.email.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    {...register("password", {
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      },
                    })}
                    type="password"
                    autoComplete="new-password"
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      {errors.password.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password_confirm">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    {...register("password_confirm", {
                      validate: value =>
                        value === watch("password", "") || "Passwords do not match"
                    })}
                    type="password"
                    autoComplete="new-password"
                  />
                  {errors.password_confirm && (
                    <Form.Text className="text-danger">
                      {errors.password_confirm.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Button disabled={loading} type="submit">Update</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default UpdateProfilePage
