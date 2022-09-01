import { useSelector } from 'react-redux'


import ReactionButtons from "../components/ReactionButton";
import { selectPostById } from "../features/posts/postSlice"

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SinglePostPage = () => {
    const { postId } = useParams()

    // const posts = useSelector(selectAllPosts)
    const users = useSelector((store) => store.users.users)

    const post = useSelector(store => selectPostById(store, postId))

    const getAuthor = (post) => {
        return  users.find(user => user.id == post.userId);
     }

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className="postCredit">
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <p>{getAuthor(post)?.name || "unknown"}</p>
            </div>
            <ReactionButtons post={post} />
        </article>
    )
}

export default SinglePostPage