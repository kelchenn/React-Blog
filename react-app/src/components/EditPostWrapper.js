import React, { useEffect, useState, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";

import PostForm from "./PostForm";
import Posts from "./Posts";

const EditPostWrapper = ({ updatePost, posts }) => {
    const showPost = useRef(false)
    const [postId, setPostId] = useState({});
    const { postSlug } = useParams();

    console.log(postSlug);
    console.log(posts);

    useEffect(() => {
        // find the corresponding post using the url param
        const post = posts.find(item => item.slug === postSlug);

        if (post) {
            showPost.current = true;
            setPostId(post);
        }
    }, [postSlug]);

    return (
        <div>
            {showPost ? (<PostForm updatePost = { updatePost } post = { postId }/>) : (<Navigate to = "/"/>)}
        </div>
    );
    
    
};

export default EditPostWrapper;