import React, { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import Quill from "react-quill";

import 'react-quill/dist/quill.snow.css';

const PostForm = ({ post: propsPost, addNewPost, updatePost }) => {
    const [saved, setSaved] = useState(false);
    const [post, setPost] = useState({ ...propsPost });

    const handlePostForm = (event) => {
        event.preventDefault();
        if (post.title) {
            console.log(post);
            console.log("updatePOst: " , updatePost);
            if (updatePost) {
                updatePost(post);
            } else {
                addNewPost(post);
            }
            setSaved(true);
        } else {
            alert("Title required!");
        }
    };

    const prevPostRef = useRef();
    useEffect(() => {
        prevPostRef.current = post;
    }, [post]);
    const prevPost = prevPostRef.current;

    // clear the editor if we are doing something else
    const quillRef = React.useRef();
    useEffect(() => {
        if (prevPost && quillRef.current) {
            if (propsPost.id !== prevPost.id) {
                setPost({ ...propsPost });
                quillRef.current.getEditor().setContents(``);
            }
        }
    }, [prevPost, propsPost]);

    if (saved === true) {
        return <Navigate to="/" />;
    }

    return (
        <form className = "container" onSubmit = { handlePostForm }>
            <h1>Add a new post</h1>
            <p>
                <label htmlFor = "form-title">Title:</label>
                <br />
                <input
                    defaultValue = { post.title }
                    id = "form-title"
                    value = { post.title }
                    onChange = {(event) => setPost({ ...post, title: event.target.value})}
                />
            </p>
            <p>
                <label htmlFor="form-content">Content:</label>
            </p>
            <Quill
                // issue: currently not showing the post.content when editing
                ref={quillRef}
                defaultValue = { post.content }
                onChange = {(content, delta, source, editor) => { 
                    setPost({ ...post, content: editor.getContents()});
                }}
            />
            <p>
                <button type = "submit">Save</button>
            </p>
        </form>
    );
}

export default PostForm;