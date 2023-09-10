import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Quill from "react-quill";

import 'react-quill/dist/quill.snow.css';

const PostForm = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <form className = "container">
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