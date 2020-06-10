import React, { useEffect } from "react";
import { createPortal, withRouter  } from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

export const Portal = ({ children }) => {
    const modalRoot = document.getElementById("modal-root");
    const el = document.createElement("div");

    useEffect(() => {
        modalRoot.appendChild(el);
    }, []);
    useEffect(() => {
        return () => modalRoot.removeChild(el);
    });
    return createPortal(children, el);
};

