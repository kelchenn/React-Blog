import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";

import PostForm from "./PostForm";
import UserContext from "../context/UserContext";

const EditPostWrapper = ({ updatePost, posts }) => {
    const { user } = useContext(UserContext);
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
            {showPost ? 
                ( user.isAuthenticated ? 
                    (<PostForm updatePost = { updatePost } post = { postId }/>
                    ) : (<Navigate to = "/login"/>)
                ) : (<Navigate to = "/"/>
            )}
        </div>
    );
    
    
};

export default EditPostWrapper;