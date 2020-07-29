import React, { useState}  from 'react'
import MemorenyosActions from './MemorenyosActions';
import BotoneraCreacion from './BotoneraCreacion';
import  Footer from "./Footer";
import  Layout from "./Layout";
import  NavigationBar from "./CNT_NavigationBar";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { getDataElement } from '../fuctions/CRUD';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, fas} from '@fortawesome/free-solid-svg-icons'
import MemoContacts from '../components/MemoContacts';


const CNT_MemoContacts = () => {
    const location = useLocation();
    var memorenyo = location.memorenyo;
    console.log('En CNT_MemoContacts memoreño vale: ',memorenyo)

   return (
       <MemoContacts memorenyo={memorenyo}/>       
    );
}

export default withRouter(CNT_MemoContacts); 