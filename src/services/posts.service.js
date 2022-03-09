import axios from 'axios'

class PostsService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/posts` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createPost = post => {
        return this.api.post(`/create`, post)
    }

    getAllPosts = () => {
        return this.api.get(`/`)
    }

    getAllPostOfOneVillage = villageId => {
        return this.api.get(`/get-villagge-posts/${villageId}`)
    }

    getMyFollowedVillagesPosts = () => {
        return this.api.get(`/get-followed-villages-posts`)
    }

    getOnePost = id => {
        return this.api.get(`/${id}`)
    }

    editPost = (id, postContent) => {
        return this.api.put(`/${id}/edit`, postContent)
    }

    deletePost = id => {
        return this.api.delete(`/${id}/delete`)
    }

}

const postsService = new PostsService()

export default postsService