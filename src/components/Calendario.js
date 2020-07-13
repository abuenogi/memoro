import React, { useState, Fragment, useEffect, useContext } from "react";
import { withRouter } from 'react-router-dom';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';
import { Button } from 'reactstrap';
import Footer from "./Footer";
import NavigationBar from "../container/CNT_NavigationBar";
import useDropdown from '../fuctions/useDropdown';
import { UserContext } from '../context/UserContext';
import { getDataElement, updateDataElement } from '../fuctions/CRUD';


const Calendario = () => {

  const { user_auth } = useContext(UserContext);

  const [eventosResult, setEventosResult] = useState([]);


  useEffect(() => {

    const fetchData = async () => {

      if (user_auth.rol === 'memorenyo') {
        var info_user = user_auth;
        setEventosResult([info_user]);
      } else if (user_auth.rol === 'cuidador') {

        const data = await getDataElement('usuarios', 'cuidador', user_auth.user_id);
        setEventosResult(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      }
      console.log('eventosResult: ', eventosResult);

    };
    fetchData();

  }, [user_auth.user_id]);

  const [usuario_selected, UsuarioDropdown] = useDropdown(eventosResult);

  var obj_contacto = ''
  var data = ''

  if (usuario_selected) {
    obj_contacto = JSON.parse(usuario_selected);
    if (obj_contacto.eventos) {
      data = JSON.parse(obj_contacto.eventos);
    }
    //scheduleData = []
  }


  console.log('usuario_selected =>', obj_contacto)

  const onDataBinding = (e) => {
    var items = e.result;
    debugger

    console.log('items -> ', items)

    if (items.length > 0 || data!=null) {

      let scheduleData = items;
      let data_items = { 'eventos': JSON.stringify(scheduleData) };
      if (user_auth.rol === 'cuidador') {
        updateDataElement('usuarios', obj_contacto.id, data_items);
      } else {
        updateDataElement('usuarios', obj_contacto.user_id, data_items);
      }

    } else {

      let data_items = { 'eventos': '' };
      if (user_auth.rol === 'cuidador') {
        updateDataElement('usuarios', obj_contacto.id, data_items);
      } else {
        updateDataElement('usuarios', obj_contacto.user_id, data_items);
      }
    }
  }


  return (
    <Fragment>
      <NavigationBar />
      <UsuarioDropdown />

      <ScheduleComponent width='100%' height='550px' selectedDate={new Date(2020, 1, 1)} eventSettings={{ dataSource: data }} dataBinding={(e) => { onDataBinding(e) }} cssClass='schedule-cell-dimension' >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
      <Footer />
    </Fragment>
  )


};
export default withRouter(Calendario);