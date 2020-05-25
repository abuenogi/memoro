import React, { useContext } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import NavigationBarMemoLower from '../components/NavigationBarMemoLower';

const CNT_NavigationBarMemoLower = ({ memorenyo }) => {

    const user_auth = useContext(UserContext);
    const history = useHistory();
    console.log ('Memorenyo en CNT_NavigationBarMemoLower vale ', memorenyo);

    /* NO SE USA
    function handleClick (e) {
        history.push({
            pathname: '/memoContacts',
            memorenyo: memorenyo
          });
      }
      */

      function onClickBarMemo (pathname) {
        //MEJORA: Es mejor opción en cuanto a seguirdad guardar el memoreno en un contexto 
        //(puede usuarse el userContext)
        console.log ('pathname en CNT_NavigationBarMemoLower vale ', pathname);
        history.push({
            pathname: pathname,
            memorenyo: memorenyo
          });
      }


    return (
        <NavigationBarMemoLower onClickBarMemo={onClickBarMemo}/>
    )

};
export default withRouter(CNT_NavigationBarMemoLower);