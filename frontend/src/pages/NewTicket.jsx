import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../component/Spinner'
import BackButton from "../component/BackButton"

function NewTicket() {
    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.ticket)

    const [name] = useState(user.name)
    const [email] = useState(user.email)

    const [product, setProduct] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            dispatch(reset())
            navigate('/tickets')
        }

        dispatch(reset())
    }, [dispatch, isError, isSuccess, message, navigate])

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createTicket({ product, description }))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url="/tickets" />

            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>

            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input type="text" className="form-control" value={name} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Customer Email</label>
                    <input type="text" className="form-control" value={email} disabled />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select name="product" id="product"
                            value={product} onChange={(e) => setProduct(e.target.value)}>
                            <option value=""></option>
                            <option value="iPhone">iPhone</option>
                            <option value="Macbook">Macbook</option>
                            <option value="iPad">iPad</option>
                            <option value="Apple Watch">Apple Watch</option>
                            <option value="AirPods">AirPods</option>
                            <option value="Apple TV">Apple TV</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description of the issue</label>
                        <textarea
                            name="description" id="description"
                            className="form-control" placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default NewTicket
