import axios from 'axios'

class BookingsService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/bookings` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createBooking = booking => {
        return this.api.post(`/create`, booking)
    }

    getOneBooking = id => {
        return this.api.get(`/${id}`)
    }

    editBooking = (id, bookingInfo) => {
        return this.api.put(`/${id}/edit`, bookingInfo)
    }

    deleteBooking = id => {
        return this.api.delete(`/${id}/delete`)
    }

    getAllMyBookings = () => {
        return this.api.get(`/get-all-my-bookings`)
    }

}

const bookingsService = new BookingsService()

export default bookingsService