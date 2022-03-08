import axios from 'axios'

class UploadOneService {

    constructor() {

        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/upload` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    uploadOneImage(imageForm) {
        return this.api.post('/imageOne', imageForm)
    }
}

const uploadOneService = new UploadOneService()

export default uploadOneService