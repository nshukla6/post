import React from "react";
import { useSelector } from "react-redux";
import { getPostsStatus, selectPostsIds } from "../features/posts/postSlice";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
    const orderedPostsIds = useSelector(selectPostsIds);
    const status = useSelector(getPostsStatus);

    // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    if(status === 'loading'){
        return <h2>Loading...</h2>
    }
    
    
    const renderedPosts = orderedPostsIds.map(postId => (
        <PostExcerpt key={postId} postId={postId} />
    ))

    return (
        <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
export default PostsList;