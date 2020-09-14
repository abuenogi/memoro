import React from "react";
import { withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";
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

  <Nav.Item className="navBarMemoLower" id="divListMemo">
        <FontAwesomeIcon id="iconBarUser" icon={(fas, faUsers)} 
        onClick={() => onClickBarMemo('/memorenyos', 'divListMemo')}/> <br/>Listado
    </Nav.Item>

    <Nav.Item className="navBarMemoLower" id="divFormMemo">
        <FontAwesomeIcon id="iconBarUser" icon={(fas, faUser)} 
        onClick={() => onClickBarMemo('/memorenyosForm', 'divFormMemo')}/> <br/>Detalle
    </Nav.Item>
    <Nav.Item className="navBarMemoLower" id="divContactsMemo">
        <FontAwesomeIcon id="iconBarPhone" icon={(fas, faPhoneAlt)} 
        onClick={() => onClickBarMemo('/memoContacts', 'divContactsMemo')}/> <br/>Contactos
    </Nav.Item>
    {/*
    <Nav.Item className="navBarMemoLower" id="divCalendarMemo">
        <FontAwesomeIcon id="iconBarCalendar" icon={(fas, faCalendarDay)} 
        onClick={() => onClickBarMemo('/calendario', 'divCalendarMemo')}/> <br/>Calendario
    </Nav.Item>
  */}
  </Nav>
);
export default withRouter(NavigationBarMemoLower);
