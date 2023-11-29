import axios from "axios"

const API_URL = "/api/tickets"

const addNote = async (note, ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(
        API_URL + `/${ticketId}/notes`,
        { text: note, },
        config
    )

    return response.data
}

const getNotes = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + `/${ticketId}/notes`, config)

    return response.data
}

const noteService = {
    addNote,
    getNotes
}

export default noteService