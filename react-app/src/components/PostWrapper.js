import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Post from "./Post";
import NotFound from "./NotFound";

const PostWrapper = ({ posts }) => {
    const [showPost, setShowPost] = useState(false);
    const [postId, setPostId] = useState({});
    const { id } = useParams();

    useEffect(() => {
        // find the corresponding post using the url param
        const post = posts.find(item => item.slug === id);

        if (post) {
            setShowPost(true);
            setPostId(post);
        }
    }, []);

    return (
        <div>
            {showPost ? (<Post post = { postId }/>) : (<NotFound/>)}
        </div>
    );
};

export default PostWrapper;