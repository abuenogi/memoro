import React, {Fragment}  from 'react'
import { withRouter } from 'react-router-dom';
import { Container , Row, Col, Navbar } from 'reactstrap';
import  Messaging from '../components/Messaging';

const Calendario = () => {
    return (

        <Fragment>
          <Container className="center-column">
            <Row>
              <Col>
                <Messaging />
              </Col>
            </Row>
          </Container>
        </Fragment>
      );


    };
    export default withRouter(Calendario);