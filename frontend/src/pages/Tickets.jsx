import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getTickets, reset } from "../features/tickets/ticketSlice"
import { useEffect } from "react"
import { toast } from "react-toastify"
import Spinner from "../component/Spinner"
import BackButton from "../component/BackButton"
import TicketItem from "../component/TicketItem"

function Tickets() {
    const { tickets, isLoading, isSuccess } = useSelector(state => state.ticket)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url="/" />
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map((ticket) => (
                    <TicketItem key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </>
    )
}

export default Tickets
