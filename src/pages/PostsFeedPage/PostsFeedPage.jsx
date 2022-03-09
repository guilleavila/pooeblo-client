import { useEffect, useState } from "react"
import PostsList from "../../components/PostsList/PostsList"
import postsService from "../../services/posts.service"

const PostsFeedPage = () => {

    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        getAllPosts()
    }, [])

    const getAllPosts = () => {
        postsService
            .getAllPosts()
            .then(({ data }) => {
                console.log('todos los posts ----', data)
                setAllPosts(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <section>
            <h1>POOEBLOS -- ÚLTIMOS POSTS</h1>
            <PostsList posts={allPosts} />
        </section>
    )
}

export default PostsFeedPage