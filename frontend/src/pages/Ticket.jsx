import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../component/Spinner'
import BackButton from '../component/BackButton'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Ticket() {
    const { ticket, isLoading, isError, message } = useSelector(state => state.ticket)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { ticketId } = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
    }, [dispatch, isError, message, ticketId])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket closed successfully')
        navigate('/tickets')
    }

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        <h3>Something went wrong</h3>
    }

    return (
        <div className='ticket-page'>
            <header className="ticket-header">
                <BackButton url="/tickets" />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>
                    Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
                </h3>
                <h3>
                    Product: {ticket.product}
                </h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>

            {ticket.status !== 'closed' && (
                <button
                    className="btn btn-block btn-danger"
                    onClick={onTicketClose} > Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket
