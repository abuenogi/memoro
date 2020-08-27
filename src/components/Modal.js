import React  from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import {  ModalBody} from 'reactstrap';


const modalCont = document.querySelector("#modal-root");


export default ({ children, isOpened }) =>
  isOpened
    ? createPortal(
          <div >
            <CSSTransition appear in classNames="modal-transition" unmountOnExit timeout={300}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <ModalBody className="color-modal" >{children}</ModalBody>
                </div>
              </div>
            </CSSTransition>
          </div>
        ,
        modalCont
      )
    : null;


