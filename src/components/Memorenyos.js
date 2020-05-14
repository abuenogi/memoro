import React, { useState, useEffect }  from 'react'
import MemorenyosActions from './MemorenyosActions';
import {BotoneraCreacion} from './BotoneraCreacion';
import { Footer} from "./Footer";
import { Layout} from "./Layout";
import { NavigationBar} from "./NavigationBar";
import { Jumbotron} from "./Jumbotron";
import {db} from '../services/firebase/firebaseConfig';
import { Container, Row, Col, Button, Nav, Navbar} from 'reactstrap';
import {createData, useUpdateData, getData} from '../fuctions/CRUD';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, fas} from '@fortawesome/free-solid-svg-icons'


const Memorenyos = () => {
  
    const [memorenyos, setMemorenyos] = useState([]);
  
    React.useEffect(() => {
      const fetchData = async () => {
        const data = await db.collection("usuarios").get();
        setMemorenyos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      };
      fetchData();
    }, []);
  
   return (
       <>
           <React.Fragment>
               <Layout>
                   <NavigationBar />
                   <Jumbotron />
                   <Container fluid>
                       <div>
                               <h3>Memoreños</h3>
                       </div>
                       <Row>
                           <Col>
                               <table className="table table-borderless">
                                   <tbody>
                                       {memorenyos.map(memorenyo => (
                                           
                                           <tr key={memorenyo.id}>
                                               <td><FontAwesomeIcon icon={fas, faUser} /></td>
                                               <td>{memorenyo.nombre}</td>
                                               <td>
                                                   <MemorenyosActions memorenyo={memorenyo} />
                                               </td>
                                           </tr>
                                       ))}
                                   </tbody>
                               </table>
                           </Col>
                       </Row>
                       <Row className="justify-content-md-center">
                           <Col>
                               <BotoneraCreacion />
                           </Col>
                       </Row>
                   </Container>
               </Layout>
               <Footer />
           </React.Fragment>
       </>
);
}

export default Memorenyos; 