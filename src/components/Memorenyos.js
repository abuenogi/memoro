import React, { useState, useContext , useEffect} from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, fas } from "@fortawesome/free-solid-svg-icons";

import MemorenyosActions from "./MemorenyosActions";
import BotoneraCreacion from "./BotoneraCreacion";
import Footer from "./Footer";
import Layout from "./Layout";
import NavigationBar from "../container/CNT_NavigationBar";

import { UserContext } from "../context/UserContext";
import { getDataElement }from '../functions/CRUD';



const Memorenyos = () => {
  const [memorenyos, setMemorenyos] = useState([]);
  const { user_auth } = useContext(UserContext);

  useEffect(() => {
    if (user_auth.id) {
      const fetchData = async () => {
        const data = await getDataElement("usuarios", "rol", "memorenyo");
        const allMemorenyos = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const ownMemorenyos = allMemorenyos.filter(
          (memorenyo) => memorenyo.cuidador === user_auth.id
        );
        setMemorenyos(ownMemorenyos);
      };
      fetchData();
    }
  }, [user_auth]);

  return (
    <>
      <React.Fragment>
        <Layout>
          <NavigationBar />
          <Container fluid>
            <div>
              <h3 className="text-center mb-4 mt-4">Listado de memoreños</h3>
            </div>
            <Row>
              <Col className="memoColList">
                <table className="table table-borderless">
                  <tbody>
                    {memorenyos.map((memorenyo) => (
                      <tr key={memorenyo.id}>
                        <td className="memoIconList">
                          <FontAwesomeIcon icon={(fas, faUser)} />
                        </td>
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
};

export default withRouter(Memorenyos);
