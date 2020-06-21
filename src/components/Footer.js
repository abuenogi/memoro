import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';

const style = {
  textAlign: "center",
  fontWeight: "bold",
  marginTop: "50px"
};


// function component
const Footer = ({history}) => {

  function onClickAbout() {
    try {
      history.push('/about');
    } catch (error) {
      console.log(error);
    }
  }

    return (
      <footer style={style}>
        <Fragment>
          <p>Memoro 2020 Copyright ©</p>
          <p className="enlace text-center" onClick={onClickAbout} >About</p>
        </Fragment>
      </footer>

    )

  };
  export default withRouter(Footer);