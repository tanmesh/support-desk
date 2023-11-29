import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../component/Spinner'
import BackButton from '../component/BackButton'
import NoteItem from '../component/NoteItem'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, reset as notesReset, addNote } from '../features/notes/noteSlice'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root')

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')

    const { ticket, isLoading, isError, message } = useSelector(state => state.ticket)
    const { notes, isLoading: notesIsLoading } = useSelector(state => state.notes)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { ticketId } = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
    }, [dispatch, isError, message, ticketId])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket closed successfully')
        navigate('/tickets')
    }


    // Open / close Modal
    const openModal = () => { setModalIsOpen(true) }
    const closeModal = () => { setModalIsOpen(false) }

    const onNoteSubmit = (e) => {
        e.preventDefault()

        dispatch(addNote({noteText, ticketId}))

        closeModal()
    }

    if (isLoading || notesIsLoading) {
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
                    Product: {ticket.prod}
                </h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>

            {ticket.status !== 'closed' && (
                <button
                    className="btn"
                    onClick={openModal}>
                    <FaPlus />Add Note
                </button>
            )}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
                style={customStyles} contentLabel='Add Note'>
                <h2>Add Note</h2>
                <button className="btn-close" onClick={closeModal}>X</button>
                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea name="noteText" id="noteText"
                            className='form-control' placeholder='Note text'
                            value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
                    </div>
                    <div className="formGroup">
                        <button className="btn" type="submit">Submit</button>
                    </div>

                </form>
            </Modal>

            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}

            {ticket.status !== 'closed' && (
                <button
                    className="btn btn-block btn-danger"
                    onClick={onTicketClose} > Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket
