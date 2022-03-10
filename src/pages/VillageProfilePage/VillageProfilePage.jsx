import VillageContent from "../../components/VillageContent/VillageContent"
import NewPostForm from "../../components/NewPostForm/NewPostForm"
import { useParams } from "react-router-dom"
import postsService from "../../services/posts.service"
import PostsList from "../../components/PostsList/PostsList"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"


const VillageProfilePage = () => {

    // const { user } = useContext(AuthContext)

    // const [myPosts, setMyPosts] = useParams()

    // useEffect(() => {
    //     if (user) {
    //         getMyPosts()
    //     }
    // }, [])


    return (
        <>
            <VillageContent />
            <NewPostForm />
            {/* <h5>Mis últimos posts</h5> */}
            {/* <PostsList posts={myPosts} /> */}
        </>
    )
}

export default VillageProfilePage