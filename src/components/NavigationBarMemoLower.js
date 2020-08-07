import React from "react";
import { withRouter } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faCalendarDay, faPhoneAlt, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";

const NavigationBarMemoLower = ({ onClickBarMemo }) => (
  <Nav justify variant="tabs" defaultActiveKey="/memorenyosForm">

   {/* 
   Con apariencia Bonita
   <Nav.Item>
      <Nav.Link
        eventKey="memorenyosList"
        href="/memorenyosForm"
        onSelect="{handleClick}"
      >
        <FontAwesomeIcon icon={(fas, faUser)} />
      </Nav.Link>
    </Nav.Item>
  */}

  <Nav.Item className="navBarMemoLower">
        <FontAwesomeIcon id="iconBarUser" icon={(fas, faUsers)} 
        onClick={() => onClickBarMemo('/memorenyos')}/> <br/>Listado
    </Nav.Item>

    <Nav.Item className="navBarMemoLower">
        <FontAwesomeIcon id="iconBarUser" icon={(fas, faUser)} 
        onClick={() => onClickBarMemo('/memorenyosForm')}/> <br/>Detalle
    </Nav.Item>
    <Nav.Item className="navBarMemoLower">
        <FontAwesomeIcon id="iconBarPhone" icon={(fas, faPhoneAlt)} 
        onClick={() => onClickBarMemo('/memoContacts')}/> <br/>Contactos
    </Nav.Item>
    <Nav.Item className="navBarMemoLower">
        <FontAwesomeIcon id="iconBarCalendar" icon={(fas, faCalendarDay)} 
        onClick={() => onClickBarMemo('/calendario')}/> <br/>Calendario
    </Nav.Item>
  </Nav>
);
export default withRouter(NavigationBarMemoLower);
