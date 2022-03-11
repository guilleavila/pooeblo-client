import { Col, Row } from "react-bootstrap"
import PostCard from "../PostCard/PostCard"

const PostsList = ({ posts }) => {

    return (
        <article>
            <Row>
                {
                    posts?.map(post => {
                        return <Col md={4} key={post._id} > <p>me pinto</p><PostCard {...post} /> </Col>
                    })
                }
            </Row>
        </article>
    )
}

export default PostsList