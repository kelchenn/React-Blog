import React from "react";
import Divider from './Divider';

function Footer() {
    return React.createElement(
        "footer",
        { className: "entry-footer" },
        Divider(),
        React.createElement("p", {}, "Goodbye")
    );
};

export default Footer;