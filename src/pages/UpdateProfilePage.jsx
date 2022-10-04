import { useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert, Image } from 'react-bootstrap'
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
  const [image, setImage] = useState(false);
  const [message, setMessage] = useState(null)
  const {
    currentUser,
    reloadUser,
    setEmail,
    setPassword,
    setPhoto,
    userEmail,
    userPhotoURL,
  } = useAuthContext()

  /**
   * @todo Om tid finns, lägg till validering för filuppladdning
   */

  const handleFileChange = (img) => {
    if (!img.target.files.length) {
      setImage('https://via.placeholder.com/225');
      return;
    }

    setImage(img.target.files[0]);
  };

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

      if (image) {
        await setPhoto(image)
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

                <div className="d-flex justify-content-center my-3">
                  <Image
                    src={userPhotoURL || 'https://via.placeholder.com/225'}
                    fluid
                    roundedCircle
                  />
                </div>

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
                    defaultValue={userEmail}
                  />
                  {errors.email && (
                    <Form.Text className="text-danger">
                      {errors.email.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="image" >
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    {...register("image")}
                    type="file"
                    onChange={handleFileChange}
                  />
                  <Form.Text>
                    {image
                      ? `${image.name} (${Math.round(
                        image.size / 1024
                      )} kB)`
                      : "No photo selected"}
                  </Form.Text>
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
