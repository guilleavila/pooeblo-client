import axios from 'axios'

class UserService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/user` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getUserDetails = () => {
        return this.api.get(`/`)
    }

    editUser = userInfo => {
        return this.api.put(`/edit`, userInfo)
    }

    editUserImage = img => {
        return this.api.put(`/edit-image`, img)
    }

    deleteUser = id => {
        return this.api.delete(`/${id}/delete`)
    }

    getAllPropertiesOfOneUser = () => {
        return this.api.get(`/properties`)
    }

}

const userService = new UserService()

export default userService