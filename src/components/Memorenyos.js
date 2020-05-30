import React, { useState}  from 'react'
import MemorenyosActions from './MemorenyosActions';
import BotoneraCreacion from './BotoneraCreacion';
import  Footer from "./Footer";
import  Layout from "./Layout";
import  NavigationBar from "../container/CNT_NavigationBar";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { getDataElement } from '../fuctions/CRUD';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, fas} from '@fortawesome/free-solid-svg-icons'


const Memorenyos = () => {
  
    const [memorenyos, setMemorenyos] = useState([]);
  
    React.useEffect(() => {
      const fetchData = async () => {
          debugger;
          const data = await getDataElement('usuarios','rol','memorenyo');
          debugger;
          console.log(data);
          
          setMemorenyos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        debugger;
      };
      fetchData();
    }, []);


    console.log ("Los memoreños están escritos de esta forma "+memorenyos);
    console.log ("Los memoreños están escritos de esta forma ", memorenyos);
  
   return (
       <>
           <React.Fragment>
               <Layout>
                   <NavigationBar />
                   <Container fluid>
                       <div>
                               <h4>Listado de memoreños</h4>
                       </div>
                       <Row>
                           <Col className="memoColList">
                               <table className="table table-borderless">
                                   <tbody>
                                       {memorenyos.map(memorenyo => (
                                           <tr key={memorenyo.id}>
                                               <td className="memoIconList"><FontAwesomeIcon icon={fas, faUser} /></td>
                                               <td className="memoNameList">{memorenyo.nombre}</td>
                                               <td className="memoButtonsList">
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

export default withRouter(Memorenyos); 