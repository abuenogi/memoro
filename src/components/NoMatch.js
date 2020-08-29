import React from 'react'
import { withRouter } from 'react-router-dom';
import Imagen from './Imagen';
import memoLost from '../images/memoLost.jpg';

 const NoMatch = () => (
  
        <div className="text-center">
        <h1>Upss... No hemos encontrado esta página </h1>
        <Imagen  src={memoLost} alt="Memo enfadado"  with="120" height="120" />
        </div>

);export default withRouter(NoMatch);