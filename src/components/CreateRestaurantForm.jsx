import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const CreateRestaurantForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { currentUser } = useAuthContext()

    const onCreateRestaurant = async (data) => {
        // make firestore doc, plz
        await addDoc(collection(db, 'restaurants'), {
            name: data.name,
            uid: currentUser.uid,
        })

        toast.success("Restaurant created")
        reset()
    }

    return (
        <Form onSubmit={handleSubmit(onCreateRestaurant)} noValidate>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    {...register("name", {
                        required: "A restaurant must have a name",
                        minLength: {
                            value: 1,
                            message: "Restaurant name must be at least 1 character long",
                        }
                    })}
                    placeholder="Burger Queen"
                    type="text"
                />
                {errors.title && <div className="invalid">{errors.title.message}</div>}
            </Form.Group>

            <Button variant="success" type="submit">Create</Button>
        </Form>
    )
}

export default CreateRestaurantForm