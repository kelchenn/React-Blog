import React from "react";

function Welcome() {
    return React.createElement(
        "h1",
        { className: "welcome" }, 
        React.createElement(
            "a",
            { href: "https://reactjs.org/"},
            "Welcome!"
        )
    );
};

export default Welcome;