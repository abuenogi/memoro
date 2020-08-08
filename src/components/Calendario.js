import React, { useState, Fragment, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
  Agenda,
  ViewsDirective,
  ViewDirective
} from "@syncfusion/ej2-react-schedule";
import { Button } from "reactstrap";
import Footer from "./Footer";
import NavigationBar from "../container/CNT_NavigationBar";
import useDropdown from "../fuctions/useDropdown";
import { UserContext } from "../context/UserContext";
import { getDataElement, updateDataElement } from "../fuctions/CRUD";
// import { L10n } from "@syncfusion/ej2-base";


const Calendario = ({ history }) => {
  const { user_auth } = useContext(UserContext);

  const [eventosResult, setEventosResult] = useState([]);
  const [objContacto, setObjetoContacto] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (user_auth.rol === "memorenyo") {
        setEventosResult([user_auth]);
      } else if (user_auth.rol === "cuidador") {
        const data = await getDataElement("usuarios", "cuidador", user_auth.id);
        const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setEventosResult(users);
      }
      console.log("eventosResult: ", eventosResult);
    };
    fetchData();
  }, [user_auth.id, setEventosResult]);

  const [usuario_selected, UsuarioDropdown] = useDropdown(eventosResult);

  useEffect(() => {
    if (usuario_selected) {
      setObjetoContacto(JSON.parse(usuario_selected));
    }
  }, [usuario_selected]);

  useEffect(() => {
    debugger
    if (objContacto?.eventos) {
      setData(JSON.parse(objContacto.eventos));
    }
  }, [objContacto]);

  const onDataBinding = (e) => {
    var items = e.result;

    if (Array.isArray(e.result) && e.result.length === 0) {
      items = data || JSON.parse(objContacto?.eventos);
    }

    if (items.length > 0) {
      let scheduleData = items;
      let data_items = { eventos: JSON.stringify(scheduleData) };
      updateDataElement("usuarios", objContacto.id, data_items);
    } else {
      let data_items = { eventos: "" };
      updateDataElement("usuarios", objContacto.id, data_items);
    }
  };

  const onClickVolver = () => {
    try {
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <NavigationBar />
      <UsuarioDropdown />

      <ScheduleComponent
        locale="es"
        timezone="Europe/Madrid"
        currentView="Month"
        width="100%"
        height="500px"
        selectedDate={new Date().toUTCString("UTC+2")}
        eventSettings={{ dataSource: data }}
        dataBinding={(e) => {
          onDataBinding(e);
        }}
        cssClass="schedule-cell-dimension"
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month, Agenda]} />
      </ScheduleComponent>
      <Button
        type="submit"
        className="btn btn-primary btn-block mt-2 button1"
        onClick={onClickVolver}
      >
        {" "}
        Volver{" "}
      </Button>
      <Footer />
    </Fragment>
  );
};
export default withRouter(Calendario);
