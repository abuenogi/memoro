import React from "react";
import { withRouter } from 'react-router-dom';

const style = {
  textAlign: "center",
  fontWeight: "bold",
  marginTop: "50px"
};

// function component
export const Footer = () => (
    <footer style={style}>
      <p>Memoro 2020 Copyright ©</p>
    </footer>
    
);export default withRouter(Footer);


