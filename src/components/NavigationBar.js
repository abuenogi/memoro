import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { UserContext } from '../context/UserContext';

const NavigationBar = ({ cerrarSesion }) => {

  const { user_auth } = useContext(UserContext);

  useEffect(() => {

    if (user_auth.rol === 'memorenyo') {

      document.querySelector("#basic-navbar-nav > div > div:nth-child(2)").style.display = 'none';
    }

  }, [user_auth]);

  const onClose = () => {

    confirmAlert({
      title: 'Cerrar sesión',
      message: '¿Quiere cerrar sesión?',
      buttons: [
        {
          label: 'No',
        },
        {
          label: 'Si',
          onClick: () => {
            cerrarSesion()
          }
        }
      ]
    });
  }

  return (
    <Navbar expand="lg" className="cuadro_menu">
      <Navbar.Brand href="/home">
        <img
          src="/logo192.png"
          width="60"
          height="60"
          className="d-inline-block align-top"
          alt="Logo de Memoro"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link className="item_menu" href="/miperfil">Perfil</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link className="item_menu" href="/memorenyos">Memoreños</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link className="item_menu" onClick={onClose}  >Desconectar</Nav.Link></Nav.Item>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default withRouter(NavigationBar);