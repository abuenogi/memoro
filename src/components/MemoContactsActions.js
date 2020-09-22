import React , { Fragment, useState, useEffect, useContext } from 'react'
import { withRouter,useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, fas } from '@fortawesome/free-solid-svg-icons'
import { confirmAlert } from 'react-confirm-alert';
import { deleteData, deleteDataWhen} from "../functions/CRUD";
import {UserContext} from '../context/UserContext';

const MemoContactsActions = ({contacto,id}) => {

  const {memorenyoSelected, setMemorenyoSelected} = useContext(UserContext);

  const history = useHistory();
  const onUpdate =  () => {
     
    history.push({
      pathname: '/memoContactsForm',
      contacto: contacto,
      id: id
    });

  }

  //Delete objet
  const onDelete = () => {
    console.log("Borrar contacto " , contacto);
    confirmAlert({
      title: 'Borrar contacto',
      message: '¿Realmente quiere eliminar los datos del contacto? ',
      buttons: [
        {
          label: 'No',
          onClick: () => {}
          
        },
        {
          label: 'Si',
          onClick:  () => {
            //Tengo que borrar el contacto del array
            deleteDataWhen(contacto.telefono, 'contactos')
           // setMemorenyoSelected(memorenyoSelected.id)
            //window.location.reload(false);
            //history.push('/memoContacts');
          
          }
        }
      ]
    });
    
  }

  return (
    <>

      <a className="btn text-primary" onClick={() => { onUpdate(contacto) }}>
        <FontAwesomeIcon icon={fas, faEdit} />
      </a>
      <a className="btn text-danger" onClick={() => { onDelete(contacto) }}>
        <FontAwesomeIcon icon={fas, faTrashAlt} />
      </a>
    </>
  );
}

export default withRouter(MemoContactsActions);