import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { Layout } from "./Layout";



const Footer = () => {

  return (
    <footer >
      <Layout>
        <div className="row d-flex justify-content-around mt-5">
          <p>Memoro 2020 Copyright ©</p>
        </div>
      </Layout>
    </footer>

  )

};
export default withRouter(Footer);