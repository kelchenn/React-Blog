import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Quill from "react-quill";

import 'react-quill/dist/quill.snow.css';

const PostForm = ({ addNewPost }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [saved, setSaved] = useState(false);

    const handlePostForm = (event) => {
        event.preventDefault();
        if (title) {
            const post = {
                title: title,
                content: content,
            };
            addNewPost(post);
            setSaved(true);
            console.log(post);
        } else {
            alert("Title required!");
        }
    };

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
                    id = "form-title"
                    value = { title }
                    onChange = {event => setTitle(event.target.value)}
                />
            </p>
            <Quill
                onChange={(content, delta, source, editor) => { 
                    
                setContent(editor.getContents()); 
                }}
            />
            <p>
                <button type = "submit">Save</button>
            </p>
        </form>
    );
}

export default PostForm;