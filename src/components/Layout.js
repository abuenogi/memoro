import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

 const Layout = props => (
    <Container>
        {props.children}
    </Container>
);export default withRouter(Layout);
