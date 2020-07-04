import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { Layout } from "./Layout";
const style = {
  textAlign: "center",
  fontWeight: "bold",
  marginTop: "50px"
};


// function component
const Footer = ({ history }) => {

  function onClickAbout() {
    try {
      history.push('/about');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <footer style={style}>
      <Layout>
        <div className="row d-flex justify-content-around">
          <p>Memoro 2020 Copyright ©</p>
        </div>
      </Layout>
    </footer>

  )

};
export default withRouter(Footer);