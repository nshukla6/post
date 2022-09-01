import { useSelector } from "react-redux";
import ReactionButtons from "./ReactionButton";
import { Link } from "react-router-dom"
import { allUsers } from "../features/users/userSlice";
import { selectPostById } from "../features/posts/postSlice";


const PostExcerpt = ({ postId }) => {

    const users = useSelector(allUsers);
    const post = useSelector(state => selectPostById(state, postId));

    const getAuthor = () => users.find(user => user.id == postId);
  return (
    <div>
        <article style={{ border: '1px solid black', padding: 10, marginBottom: 10, width: '40rem', borderRadius: 5 }} key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <Link to={`post/${post.id}`}>View Post</Link>
            <p>{getAuthor()?.name || "unknown"}</p>
            <ReactionButtons post={post} />
        </article>
    </div>
  )
}

export default PostExcerpt;