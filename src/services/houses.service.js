import axios from 'axios'

class HousesService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/houses` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllHouses = () => {
        return this.api.get('/')
    }

    createHouse = house => {
        return this.api.post(`/create`, house)
    }

    getOneHouse = id => {
        return this.api.get(`/${id}`)
    }

    editHouse = (id, houseInfo) => {
        return this.api.put(`/${id}/edit`, houseInfo)
    }

    deleteOneImage = (id, houseImages) => {
        return this.api.put(`/${id}/edit-image`, houseImages)
    }

    uploadImages = (id, houseImages) => {
        return this.api.put(`/${id}/upload-images`, houseImages)
    }

    deleteHouse = id => {
        return this.api.delete(`/${id}/delete`)
    }

    addHouseToFavs = id => {
        return this.api.put(`/${id}/add-to-fav`)
    }

    substractHouseFromFavs = id => {
        return this.api.put(`/${id}/subtract-from-fav`)
    }

    getAllBookingsOfOneHose = id => {
        return this.api.get(`/${id}/get-all-bookings`)
    }

    getAllMyBookingsOfOneHouse = id => {
        return this.api.get(`/${id}/get-all-my-bookings`)
    }

    getSubscriptionOfOneUserForThisHouse = id => {
        return this.api.get(`/${id}/get-subscription`)
    }

}

const housesService = new HousesService()

export default housesService