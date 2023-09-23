import React from "react";

const Message = ({ type }) => {
    // type has value of saved, updated, or deleted
    const messages = {
        saved: "Post has been saved!",
        updated: "Post has been updated!",
        deleted: "Post has been deleted!"
    };

    return (
        <div className = {`App-message ${ type }`}>
            <p className = "container">
                <strong>{ messages[type] }</strong>
            </p>
        </div>
    );
};

export default Message;