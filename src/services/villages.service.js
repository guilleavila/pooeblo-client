import axios from 'axios'

class VillagesService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/villages` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllVillages = () => {
        return this.api.get('/')
    }

    getOneVillage = id => {
        return this.api.get(`/findOneVillage/${id}`)
    }

    editVillageInfo = (id, villageInfo) => {                    // ---> sacar del payload el id
        return this.api.put(`/${id}/edit-info`, villageInfo)
    }

    editVillageFeatures = (id, villageFeatures) => {
        return this.api.put(`/${id}/edit-features`, villageFeatures)
    }

    deleteVillage = id => {
        return this.api.delete(`/${id}/delete`)
    }

    followVillage = (village_id) => {
        return this.api.put(`/${village_id}/follow`)
    }

    unfollowVillage = (village_id) => {
        return this.api.put(`/${village_id}/unfollow`)
    }

    getAllHousesOfOneVillage = id => {
        return this.api.get(`/${id}/houses`)
    }

    getAllSubscriptioinsOfOneVillage = id => {
        return this.api.get(`/${id}/subscriptions`)
    }

    getVillagesByName = input => {
        return this.api.get(`/search-village-by-name/${input}`)
    }

    getAllProvinces = input => {
        return this.api.get(`/provinces/${input}`)
    }

    getVillagesByProvince = input => {
        return this.api.get(`/search-villages-by-province/${input}`)
    }

    getVillagesByCoast = () => {
        return this.api.get(`/search-villages-in-the-coast`)
    }

    getVillagesByMountain = () => {
        return this.api.get(`/search-villages-in-the-mountain`)
    }

}

const villagesService = new VillagesService()

export default villagesService