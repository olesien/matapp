import React, { useRef, useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form';

const ForgotPasswordPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const emailRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(false)
	const { resetPassword } = useAuthContext()

	const onHandleSubmit = async (data) => {
		setError(null)
		setMessage(null)

		// try to send the password reset link to the given email
		try {
			setLoading(true)

			// send email
			await resetPassword(data.email)

			// show success message
			setMessage("Please check your spam folder.")

			reset()

		} catch (err) {
			setError(err.message)
			setLoading(false)

		} finally {
			setLoading(false)
		}
	}

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Reset password</Card.Title>

							{error && (<Alert variant="danger">{error}</Alert>)}
							{message && (<Alert variant="success">{message}</Alert>)}

							<p>Enter your email address to receive a password reset link.</p>

							<Form onSubmit={handleSubmit(onHandleSubmit)} noValidate>

								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										{...register("email", {
											required: "Provide an email",
											pattern: {
												value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/gm,
												message: "Invalid email",
											},
										})}
										type="email"
									/>
									{errors.email && (
										<Form.Text className="text-danger">
											{errors.email.message}
										</Form.Text>
									)}
								</Form.Group>

								<Button disabled={loading} type="submit">Get link</Button>
							</Form>

						</Card.Body>
					</Card>

					<div className="text-center mt-3">
						<Link to="/login">Log In</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default ForgotPasswordPage
