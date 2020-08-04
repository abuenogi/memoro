import React, { useState, Fragment, useEffect, useContext } from "react";
import { withRouter } from 'react-router-dom';
import { Inject, ScheduleComponent, Day, Week, Month, Agenda } from '@syncfusion/ej2-react-schedule';
import { Button } from 'reactstrap';
import Footer from "./Footer";
import NavigationBar from "../container/CNT_NavigationBar";
import useDropdown from '../fuctions/useDropdown';
import { UserContext } from '../context/UserContext';
import { getDataElement, updateDataElement } from '../fuctions/CRUD';


const Calendario = ({ history }) => {


  const { user_auth } = useContext(UserContext);

  const [eventosResult, setEventosResult] = useState([]);


  useEffect(() => {

    const fetchData = async () => {

      if (user_auth.rol === 'memorenyo') {
        var info_user = user_auth;
        setEventosResult([info_user]);
      } else if (user_auth.rol === 'cuidador') {

        const data = await getDataElement('usuarios', 'cuidador', user_auth.id);
        setEventosResult(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      }
      console.log('eventosResult: ', eventosResult);

    };
    fetchData();

  }, [user_auth.id]);

  const [usuario_selected, UsuarioDropdown] = useDropdown(eventosResult);

  var obj_contacto = ''
  var data = ''

  if (usuario_selected) {
    obj_contacto = JSON.parse(usuario_selected);
    if (obj_contacto.eventos) {
      data = JSON.parse(obj_contacto.eventos);
    }

  }


  console.log('usuario_selected =>', obj_contacto)

  const onDataBinding = (e) => {
    var items = e.result;

    debugger

    if (e.result === []) {
      items = data
    }

    console.log('items -> ', items)

    if (items.length > 0) {

      let scheduleData = items;
      let data_items = { 'eventos': JSON.stringify(scheduleData) };
      updateDataElement('usuarios', obj_contacto.id, data_items.eventos);
    } else {
      let data_items = { 'eventos': '' };
      updateDataElement('usuarios', obj_contacto.id, data_items.eventos);
    }
  }


  function onClickVolver() {
    try {
      history.push('/home');
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <Fragment>
      <NavigationBar/>
      <UsuarioDropdown/>

      <ScheduleComponent timezone='Europe/Madrid' currentView='Month' width='100%' height='500px' selectedDate={new Date().toUTCString('UTC+2')} eventSettings={{ dataSource: data }} dataBinding={(e) => { onDataBinding(e) }} cssClass='schedule-cell-dimension' >
        <Inject services={[Day, Week, Month, Agenda]} />
      </ScheduleComponent>
      <Button type="submit" className="btn btn-primary btn-block mt-2 button1" onClick={onClickVolver}> Volver </Button>
      <Footer />
    </Fragment>
  )


};
export default withRouter(Calendario);