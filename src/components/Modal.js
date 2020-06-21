import React, {Fragment} from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import {  ModalBody, modalContainer} from 'reactstrap';
import "./Modal.css";

const modalCont = document.querySelector("#modal-root");


export default ({ children, isOpened }) =>
  isOpened
    ? createPortal(
        <modalContainer>
        <div >
          <CSSTransition appear in classNames="modal-transition" unmountOnExit timeout={300}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <ModalBody className="color-modal" >{children}</ModalBody>
              </div>
            </div>
          </CSSTransition>
          </div>
          </modalContainer>
        ,
        modalCont
      )
    : null;


/*
<div className="modal" tabIndex="-1" role="dialog">
          <CSSTransition
            appear
            in
            classNames="modal-transition"
            unmountOnExit
            timeout={300}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title}</h5>
                  <button onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">{children}</div>
              </div>
            </div>
          </CSSTransition>
        </div>
*/