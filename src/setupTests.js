import React from "react";
/**React router library */
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
/**React testing */
import { render } from "@testing-library/react";
// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import "@testing-library/jest-dom/extend-expect";

/* HISTORY */
export const history = createMemoryHistory();
/* REACT ROUTER */
export const renderWithReactRouter = component => {
    return {
        ...render(<Router history={history}>{component}</Router>),
        // adding `history` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        history,
    };
};